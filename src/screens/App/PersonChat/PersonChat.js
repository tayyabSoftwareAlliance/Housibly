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
  family,
  handleCameraPermission,
  platformOrientedCode,
  responseValidator,
  size,
  WP,
} from '../../../shared/exporter';
import styles from './styles';
import { chat } from '../../../shared/utilities/constant';
import { app } from '../../../shared/api';
import { useIsFocused } from '@react-navigation/native'
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import CacheImage from 'react-native-image-cache-wrapper';
import useChannel from '../../../shared/utilities/useChannel';
import Modal from 'react-native-modal';
import { ChatPopupModal } from '../../../components/Modal/ChatPopupModal';

const OptionsModal = ({ isVisible, onPressHide, onPressBlock }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onPressHide}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      backdropOpacity={0}
    >
      <View style={{ flex: 1 }} >
        <View style={styles.optionsModalContentContainer} >
          <TouchableOpacity
            onPress={() => {
              onPressHide()
              onPressBlock()
            }}
          >
            <Text style={styles.optionsModalTxt} >Block User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

let interval;
const image_options = {
  width: 300,
  height: 400,
  multiple: false,
  mediaType: 'photo',
};

const renderItem = (item, index, userId) => {

  return (
    <View style={styles.msgContainer}>
      {item.user_id == userId ? (
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
          {/* <View style={{ width: '70%' }}> */}
          <View style={styles.receiverBubbleStyles}>
            {item.image && <Image source={{ uri: item.image }} style={styles.personImgStyle} />}
            {item.body && <Text style={styles.receiverMsgStyles}>{item.body}</Text>}
          </View>
          {/* </View> */}
        </View>
      )}
    </View>
  )
}

const PersonChat = ({ navigation, route }) => {
  const params = route.params
  const [conversationId, setConversationId] = useState(params?.conversation_id);
  const [fresh, setFresh] = useState(true);
  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [loader, setLoader] = useState(true)
  const [sendLoader, setSendLoader] = useState(false)
  const [createConversationLoader, setCreateConversationLoader] = useState(false)
  const [useEffectRecallFlag, setUseEffectRecallFlag] = useState(false)
  const [optionsModal, setOptionsModal] = useState(false)
  const [blockModal, setBlockModal] = useState(false)
  const [blockLoader, setBlockLoader] = useState(false)
  const isFocused = useIsFocused()
  const userData = useSelector(state => state.auth)
  const userId = userData?.userInfo?.user?.id
  const { createChannel, removeChannel } = useChannel()
  console.log('userId', userId)
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [isFocused]);

  const getAllMessages = async () => {
    try {
      setLoader(true)
      const formData = new FormData()
      formData.append('conversation_id', conversationId)
      const res = await app.getAllMessages(formData);
      console.log('res.data?.messages', JSON.stringify(res.data?.messages, null, 2))
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
      formData.append('conversation_id', conversationId)
      const res = await app.readMessages(formData);
      if (res?.status == 200) {
        // console.log('resssss read message', res?.data)
      }
    } catch (error) {
      console.log(error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    }
  }

  const checkIsConversationCreated = async () => {
    try {
      setCreateConversationLoader(true)
      const formData = new FormData()
      formData.append('conversation[recipient_id]', params?.recipient_id)
      const res = await app.checkIsConversationCreated(formData);
      if (res?.status == 200) {
        setConversationId(res.data?.id)
        setUseEffectRecallFlag(prev => !prev)
      }
    } catch (error) {
      console.log('checkIsConversationCreated', error)
    } finally {
      setCreateConversationLoader(false)
    }
  }

  const firstCall = async () => {
    if (isFocused) {
      if (params?.from == 'not_chats' && !conversationId) {
        await checkIsConversationCreated()
      } else {
        getAllMessages()
        callReadMessages()
        // interval = setInterval(() => getAllMessages(), 5000)
      }
    } else {
      // interval && clearInterval(interval)
    }
  }

  useEffect(() => {
    firstCall()
    // return () => interval && clearInterval(interval)
  }, [isFocused, useEffectRecallFlag])

  const createConversation = async () => {
    setCreateConversationLoader(true)
    try {
      const formData = new FormData()
      formData.append('conversation[recipient_id]', params?.recipient_id)
      const res = await app.createConversation(formData);
      if (res?.status == 200) {
        setConversationId(res.data?.id)
        return res.data?.id
      }
    } catch (error) {
      console.log('', error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    }
  }

  const onSend = async (image) => {
    let formConversationId = conversationId
    if (!conversationId) {
      formConversationId = await createConversation()
    }
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
      body: image ? '' : message,
      image: image?.uri
    }
    setAllMessages(previousMessages => ([msg, ...previousMessages]))
    setMessage('')
    try {
      setSendLoader(true)
      const formData = new FormData()
      formData.append('conversation_id', formConversationId)
      image && formData.append('message[image]', image)
      msg.body && formData.append('message[body]', msg.body)
      // console.log('formmmm', formData)
      const res = await app.sendMessage(formData);
      // console.log('resresresres', res?.data)
      setUseEffectRecallFlag(prev => !prev)
      // if (res?.status == 200) {
      // }
    } catch (error) {
      console.log(error);
      // let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setSendLoader(false)
      setCreateConversationLoader(false)
    }
  }

  const openGallery = () => {
    setTimeout(() => {
      ImagePicker.openPicker(image_options).then(image => {
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

  const blockUser = () => {

  }

  useEffect(() => {
    createChannel({
      connected: () => {
        console.log('connected')
      },
      received: (e) => {
        console.log('received', e)
        console.log('e?.messages?.user_id', e?.messages?.user_id)
        if (e?.messages?.id && e.messages.conversation_id == params?.conversation_id && e.messages.user_id != userId) {
          const msg = {
            id: e.messages.id,
            body: e.messages.message,
            image: e.messages.image,
            conversation_id: e.messages.conversation_id,
            user_id: e.messages.user_id,
            created_at: e.messages.created_at,
            updated_at: e.messages.updated_at,
          }
          setAllMessages(previousMessages => ([msg, ...previousMessages].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))))
          callReadMessages()
        }
      },
      disconnected: () => {
        console.log('disconnected')
      }
    })
    return removeChannel
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ChatHeader
        onPressIcon={() => setOptionsModal(true)}
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
                  source={{ uri: params?.avatar }}
                  style={styles.personImgStyle}
                />
                <Text style={styles.nameTxtStyle}>{params?.full_name}</Text>
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
                onPress={() => onSend()}
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
      <AppLoader loading={createConversationLoader} />
      <OptionsModal isVisible={optionsModal} onPressHide={() => setOptionsModal(false)} onPressBlock={() => setBlockModal(true)} />
      <ChatPopupModal
        image={params?.avatar}
        title={params?.full_name}
        subtitle={'Block user?'}
        buttontitle={'Block'}
        show={blockModal}
        onPressHide={() => setBlockModal(false)}
        buttonLoader={blockLoader}
        onButtonPress={blockUser}
        buttonStyle={{backgroundColor:colors.b1}}
      />
    </SafeAreaView>
  );
};

export default PersonChat;
