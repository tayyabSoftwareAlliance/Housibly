import React, {useState} from 'react';
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
import {Icon} from 'react-native-elements';
import {Spacer, AppHeader, BackHeader} from '../../../../components';
import {
  WP,
  colors,
  appIcons,
  platformOrientedCode,
  appLogos,
} from '../../../../shared/exporter';
import styles from './styles';

const SupportChat = ({navigation}) => {
  const [fresh, setFresh] = useState(true);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('SupportChat')}>
        <View style={styles.rowContainer}>
          <Image source={appLogos.supportLogo} style={styles.imgStyle} />
          <View>
            <Text style={styles.nameTxtStyle}>Harold Von</Text>
            <Text style={styles.dateTxtStyle}>Jan 12, 2022 | 9:00am</Text>
          </View>
        </View>
        <Text style={styles.infoTxtStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          pretium sem sit amet venenatis commodo. Nullam aliquam lacus nisl,
          varius luctus mauris hendrerit ut. Etiam eros lectus, commodo nec nisl
          in, aliquet congue quam. Morbi condimentum lectus id urna gravida, at
          facilisis lectus consectetur. Nam viverra augue est.
        </Text>
      </TouchableOpacity>
    );
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
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.noRecordsView}>
          <Text style={styles.noRecords}>
            {isLoading ? '' : 'No messages found'}
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
            {visibility ? (
              <ActivityIndicator
                animating
                size={'small'}
                color={colors.p1}
                style={{left: 3}}
              />
            ) : (
              <Icon
                name={'send'}
                type={'ionicons'}
                size={22}
                color={colors.g16}
              />
            )}
          </View>
          <Image
            resizeMode="contain"
            source={appIcons.galleryIcon}
            style={[styles.iconStyle, {marginRight: 7}]}
          />
          <Image
            resizeMode="contain"
            source={appIcons.cameraIcon}
            style={[styles.iconStyle, {marginLeft: 7}]}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SupportChat;
