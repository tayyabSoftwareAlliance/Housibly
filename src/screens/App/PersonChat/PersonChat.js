import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
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
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppLoader, ChatHeader, Spacer } from '../../../components';
import {
  appIcons,
  appImages,
  colors,
  handleCameraPermission,
  platformOrientedCode,
  responseValidator,
  WP,
} from '../../../shared/exporter';
import styles from './styles';
import { chat } from '../../../shared/utilities/constant';
import { app } from '../../../shared/api';
import { useIsFocused } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';

const image_options = {
  width: 300,
  height: 400,
  multiple: false,
  mediaType: 'photo',
};

const renderItem = (item, index, userId) => {

  return (
    <View style={styles.msgContainer}>
      {item.user_id === userId ? (
        // Sender Bubble
        <View style={styles.senderBubble}>
          <View style={styles.senderBubbleStyles}>
            {item.image && <Image source={{ uri: item.image }} style={styles.personImgStyle} />}
            {item.body && <Text style={styles.senderMsgStyles}>{item.body}</Text>}
          </View>
        </View>
      ) : (
        // Receiver Bubble
        <View style={styles.receiverBubble}>
          <View style={{ width: '70%' }}>
            <View style={styles.receiverBubbleStyles}>
              {item.image && <Image source={{ uri: item.image }} style={styles.personImgStyle} />}
              {item.body && <Text style={styles.receiverMsgStyles}>{item.body}</Text>}
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const PersonChat = ({ navigation, route }) => {
  const params = route.params
  const [fresh, setFresh] = useState(true);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [loader, setLoader] = useState(true)
  const [sendLoader, setSendLoader] = useState(false)
  const isFocused = useIsFocused()
  const userData = useSelector(state => state.auth);
  const userId = userData?.userInfo?.user?.id
  console.log('params',params)
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [isFocused]);

  const getAllMessages = async () => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('conversation_id', params?.conversation_id)
      const res = await app.getAllMessages(formData);
      if (res?.status == 200) {
        setAllMessages(res.data?.messages || [])
      }
    } catch (error) {
      console.log(error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setLoader(false)
    }
  }

  const callReadMessages = async () => {
    try {
      const formData = new FormData()
      formData.append('conversation_id', params?.conversation_id)
      const res = await app.readMessages(formData);
      if (res?.status == 200) {
        console.log('resssss read message',res?.data)
      }
    } catch (error) {
      console.log(error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    }
  }

  useEffect(() => {
    let interval;
    if (isFocused) {
      getAllMessages()
      callReadMessages()
      interval = setInterval(() => getAllMessages(), 5000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isFocused])

  const onSend = async (image) => {
    console.log('imageimage', image)
    if (image) {
      image = {
        uri: image.path,
        type: image.mime,
        name: image?.fileName || 'image'
      }
    }
    if (!message && !image) return
    const msg = {
      user_id: userId,
      body: message,
      image: image?.uri
    }
    setAllMessages(previousMessages => ([msg, ...previousMessages]))
    setMessage('')
    try {
      setSendLoader(true)
      const formData = new FormData()
      formData.append('conversation_id', params?.conversation_id)
      msg.body && formData.append('message[body]', msg.body)
      image && formData.append('message[image]', image)
      console.log('formmmm', formData)
      const res = await app.sendMessage(formData);
      console.log('resresresres', res?.data)
      // if (res?.status == 200) {
      // }
    } catch (error) {
      console.log(error);
      // let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setSendLoader(false)
    }
  }

  const openGallery = () => {
    setTimeout(() => {
      ImagePicker.openPicker(image_options).then(image => {
        console.log('imageeeee', image)
        onSend(image)
      });
    }, 400);
  };

  //Camra Handlers
  const openCamera = async () => {
    if (await handleCameraPermission()) {
      setTimeout(() => {
        ImagePicker.openCamera(image_options).then(image => {
          console.log('imageeee', image)
          onSend(image)
        }).catch(error => console.log('error ', error))
      }, 400);
    }
  };
  // console.log('allMessages', JSON.stringify(allMessages, null, 2))

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ChatHeader
        onPressIcon={() => {
          // navigation.navigate('Profile');
        }}
        rightIcon
        avatar={params?.avatar}
        name={params?.full_name}
      />
      <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
      {allMessages?.length > 0 ? (
        <FlatList
          inverted
          data={allMessages}
          extraData={fresh}
          renderItem={({ item, index }) => renderItem(item, index, userId)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => {
            return (
              <View style={styles.personView}>
                <Image
                  resizeMode="contain"
                  source={appImages.person3}
                  style={styles.personImgStyle}
                />
                <Text style={styles.nameTxtStyle}>Aspen Franci</Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: colors.g19 }} >No Messages Found Yet!</Text>
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
            {visibility ? (
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
                onPress={onSend}
              />
            )}
          </View>
          <TouchableOpacity onPress={openGallery} >
            <Image
              resizeMode="contain"
              source={appIcons.galleryIcon}
              style={[styles.iconStyle, { marginRight: 7 }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openCamera}>
            <Image
              resizeMode="contain"
              source={appIcons.cameraIcon}
              style={[styles.iconStyle, { marginLeft: 7 }]}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {/* <AppLoader loading={sendLoader} /> */}
    </SafeAreaView>
  );
};

export default PersonChat;
