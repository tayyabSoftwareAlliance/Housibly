import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Spacer, AppHeader, BackHeader, AppLoader } from '../../../../components';
import {
  WP,
  colors,
  appIcons,
  platformOrientedCode,
  appLogos,
  responseValidator,
} from '../../../../shared/exporter';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native'
import { app } from '../../../../shared/api';
import { useSelector } from 'react-redux';
import moment from 'moment';

const renderItem = (item, userData) => {
  return (
    <View style={styles.itemContainer} >
      <View style={styles.rowContainer}>
        <Image source={item.user_id == userData?.userInfo?.user?.id ? { uri: userData.userInfo.user.avatar } : appLogos.supportLogo} style={styles.imgStyle} />
        <View>
          <Text style={styles.nameTxtStyle}>{item.user_id == userData?.userInfo?.user?.id ? (userData.userInfo.user.full_name || 'N/A') : 'Housibly'}</Text>
          <Text style={styles.dateTxtStyle}>{moment(item.created_at).format('LLL')}</Text>
        </View>
      </View>
      <Text style={styles.infoTxtStyle}>
        {item?.body || 'N/A'}
      </Text>
      {item.image &&
        <View style={styles.msgImageContainer} >
          <Image source={{ uri: item.image }} style={styles.msgImage} />
        </View>
      }
    </View>
  );
};

const SupportChat = ({ navigation, route }) => {
  const conversation_id = route.params?.conversation_id
  const userData = useSelector(state => state?.auth)
  const [fresh, setFresh] = useState(true);
  const [message, setMessage] = useState('');
  const [sendLoader, setSendLoader] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false)
  const isFocused = useIsFocused()

  const fetchData = async () => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('support_conversation_id', conversation_id)
      const res = await app.getSupportMessages(formData)
      if (res?.status == 200) {
        setData(res.data?.messages || [])
      }
    } catch (error) {
      console.log('fetchData SupportChat error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    isFocused && fetchData()
  }, [isFocused])

  const onSend = async () => {
    if (message.trim() == '') return
    const msg = {
      user_id: userData?.userInfo?.user?.id,
      body: message.trim(),
      created_at: new Date()
    }
    setData(previousMessages => ([msg, ...previousMessages]))
    try {
      setSendLoader(true)
      const formData = new FormData()
      formData.append('message[body]', message.trim())
      formData.append('support_conversation_id', conversation_id)
      setMessage('')
      const res = await app.createSupportMessage(formData);
    } catch (error) {
      console.log('onSend SupportChat error ', error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setSendLoader(false)
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Support'} />
      <BackHeader title={'Support'} />
      <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
      {data?.length > 0 ? (
        <FlatList
          inverted
          data={data}
          extraData={fresh}
          renderItem={({ item }) => renderItem(item, userData)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.noRecordsView}>
          <Text style={styles.noRecords}>
            {loader ? '' : 'No Messages Found Yet!'}
          </Text>
        </View>
      )}
      <KeyboardAvoidingView
        behavior={platformOrientedCode('height', 'padding')}>
        <View style={styles.inputView}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={'Type here...'}
              value={message}
              ellipsizeMode="tail"
              multiline
              maxHeight={75}
              onChangeText={text => setMessage(text)}
              placeholderTextColor={colors.g40}
              style={styles.inputStyles}
            />
            {sendLoader ? (
              <ActivityIndicator
                animating
                size={'small'}
                color={colors.p1}
                style={{ left: 3 }}
              />
            ) : (
              <Icon
                name={'send'}
                type={'ionicons'}
                size={22}
                color={colors.g16}
                onPress={() => onSend()}
              />
            )}
          </View>
          {/* <Image
            resizeMode="contain"
            source={appIcons.galleryIcon}
            style={[styles.iconStyle, {marginRight: 7}]}
          />
          <Image
            resizeMode="contain"
            source={appIcons.cameraIcon}
            style={[styles.iconStyle, {marginLeft: 7}]}
          /> */}
        </View>
      </KeyboardAvoidingView>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default SupportChat;
