import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages } from '../../../shared/exporter';
import styles from './styles';
import { SwipeListView } from 'react-native-swipe-list-view';

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

const renderItem = ({ item, index }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('PotentialBuyers', { item })}>
      <Image
        source={item?.user?.image }
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.chatTitle} numberOfLines={1}>{item?.user?.name}</Text>
        <Text style={styles.chatMessage} numberOfLines={1}>{item?.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );
};

const renderHiddenItem = (data, rowMap) => {
  return (
    <View style={styles.backBtnsContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backRightBtn}
        onPress={() => {
          closeRow(rowMap, data?.index);
          handleDelete(data);
        }}>
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

const AllMessages = () => {

  const closeRow = (map, key) => {
    map && map[key] && map[key].closeRow();
  };

  return (
    <SwipeListView
      useFlatList
      data={AllChatsData}
      disableRightSwipe={true}
      renderItem={renderItem}
      renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
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
      contentContainerStyle={{paddingTop:WP(3)}}
      ListFooterComponent={<View />}
      ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
    />
  );
};

export default AllMessages