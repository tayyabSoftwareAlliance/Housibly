import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages } from '../../../shared/exporter';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useNavigation } from '@react-navigation/native'
import { ChatPopupModal } from '../../../components/Modal/ChatPopupModal';

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

const renderItem = (item, index, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PersonChat')}>
      <Image
        source={item?.user?.image}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.chatTitle} numberOfLines={1}>{item?.user?.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>{item?.lastMessage}</Text>
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

  const navigation = useNavigation()
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)

  const closeRow = (map, key) => {
    map && map[key] && map[key].closeRow();
  };

  const onDeleteButtonPress = (data, rowMap) => {
    closeRow(rowMap, data?.index);
    setDeleteModal(true)
    setSelectedChat(data?.item)
  }

  return (
    <>
      <SwipeListView
        useFlatList
        data={AllChatsData}
        disableRightSwipe={true}
        renderItem={({ item, index }) => renderItem(item, index, navigation)}
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
      />
      <ChatPopupModal
        image={selectedChat?.user?.image}
        title={selectedChat?.user?.name}
        subtitle={'Delete conversation?'}
        buttontitle={'Delete'}
        show={deleteModal}
        onPressHide={() => setDeleteModal(false)}
        buttonLoader={false}
        onButtonPress={() => { }}
      />
    </>
  );
};

export default AllChats