import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, colors, family, responseValidator } from '../../../shared/exporter';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native'
import { ChatPopupModal } from '../../../components/Modal/ChatPopupModal';
import { useIsFocused } from '@react-navigation/native'
import { app } from '../../../shared/api';
import { AppLoader } from '../../../components';
import CacheImage from 'react-native-image-cache-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { delete_chat, get_all_chats } from '../../../redux/actions/chat-actions/chat-actions';

const AllChatsData = [
  {
    id: 1,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 2,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 3,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 4,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 5,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 6,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 7,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  },
  {
    id: 8,
    user: {
      name: 'Aspen Franci',
      image: appImages.avatar
    },
    lastMessage: 'Hey! How are you? What brought you to that how ufr rfr'
  }
]

const renderItem = (item, index, userId, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PersonChat',
        {
          conversation_id: item?.id,
          recipient_id: userId == item?.recipient_id ? item?.sender_id : item?.recipient_id,
          avatar: item?.avatar,
          full_name: item?.full_name,
          is_blocked: item?.is_blocked
        }
      )}
    >
      <CacheImage
        source={{ uri: item?.avatar }}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.chatTitle} numberOfLines={1}>{item?.full_name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>{item?.message}</Text>

        {item?.unread_message ?
          <View style={styles.badge} >
            <Text style={styles.badgeTxt}>{item.unread_message}</Text>
          </View> : null
        }
      </View>
    </TouchableOpacity>
  );
};

const renderHiddenItem = (data, rowMap, onDeleteButtonPress) => {
  return (
    <View style={styles.backBtnsContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backRightBtn}
        onPress={() => onDeleteButtonPress(data, rowMap)}>
        <Image
          resizeMode="contain"
          source={appIcons.delIcon}
          style={styles.iconStyle}
        />
        <Text style={styles.btnTxtStyle}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const AllChats = () => {

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const isFocused = useIsFocused()
  const userData = useSelector(state => state?.auth)
  const { delete_loader, all_chats } = useSelector(state => state?.chat)
  const [loader, setLoader] = useState(false)
  const userId = userData?.userInfo?.user?.id

  const closeRow = (map, key) => {
    map && map[key] && map[key].closeRow();
  };

  const onDeleteButtonPress = (data, rowMap) => {
    closeRow(rowMap, data?.index);
    setDeleteModal(true)
    setSelectedChat(data?.item)
  }

  useEffect(() => {
    let interval;
    const onFinally = () => {
      setLoader(false)
    }
    if (isFocused) {
      setLoader(true)
      dispatch(get_all_chats(onFinally))
      interval = setInterval(() => dispatch(get_all_chats()), 10000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isFocused])

  return (
    <>
      {all_chats.length > 0 ?
        <SwipeListView
          useFlatList
          data={all_chats}
          disableRightSwipe={true}
          renderItem={({ item, index }) => renderItem(item, index, userId, navigation)}
          renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap, onDeleteButtonPress)}
          leftOpenValue={180}
          rightOpenValue={-180}
          // previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          closeOnScroll
          onRowOpen={(rowKey, rowMap) => {
            let key = rowKey;
            if (key === rowKey) return;
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 2000);
          }}
          // closeOnRowPress
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: WP(3) }}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
        /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={{ color: colors.g19, fontFamily: family.Gilroy_Medium }} >No Conversations Found Yet!</Text>
        </View>
      }
      <ChatPopupModal
        image={selectedChat?.avatar}
        title={selectedChat?.full_name}
        subtitle={'Delete conversation?'}
        buttontitle={'Delete'}
        show={deleteModal}
        onPressHide={() => setDeleteModal(false)}
        buttonLoader={delete_loader}
        onButtonPress={() => dispatch(delete_chat(selectedChat?.id, () => setDeleteModal(false)))}
      />
      <AppLoader loading={!all_chats.length > 0 && loader} />
    </>
  );
};

export default AllChats