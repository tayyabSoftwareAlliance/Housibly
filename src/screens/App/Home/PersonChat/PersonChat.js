import React, {useRef, useState, useLayoutEffect} from 'react';
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
import {useIsFocused} from '@react-navigation/core';
import {ChatHeader, Spacer} from '../../../../components';
import {
  appIcons,
  appImages,
  colors,
  platformOrientedCode,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';
import {chat} from '../../../../shared/utilities/constant';

const PersonChat = ({navigation}) => {
  const isFocus = useIsFocused();
  const [fresh, setFresh] = useState(true);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [allMessages, setAllMessages] = useState(chat);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [isFocus]);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.msgContainer}>
        {item.viewType === 'sender' ? (
          // Sender Bubble
          <View style={styles.senderBubble}>
            <View style={styles.senderBubbleStyles}>
              <Text style={styles.senderMsgStyles}>{item.message}</Text>
            </View>
          </View>
        ) : (
          // Receiver Bubble
          <View style={styles.receiverBubble}>
            <View style={{width: '70%'}}>
              <View style={styles.receiverBubbleStyles}>
                <Text style={styles.receiverMsgStyles}>{item.message}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const onSend = () => {};

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ChatHeader
        onPressIcon={() => {
          // navigation.navigate('Profile');
        }}
        rightIcon
      />
      <Spacer androidVal={WP('2')} iOSVal={WP('2')} />
      {allMessages?.length > 0 ? (
        <FlatList
          inverted
          data={allMessages}
          extraData={fresh}
          renderItem={renderItem}
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
        <View style={styles.noRecordsView}>
          <Text style={styles.noRecords}>
            {isLoading ? '' : 'No events found'}
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

export default PersonChat;
