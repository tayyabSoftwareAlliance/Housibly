import React, { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { AppHeader, AppLoader, BackHeader } from '../../../../components';
import styles from './styles';
import { appImages, colors } from '../../../../shared/exporter';
import { ChatPopupModal } from '../../../../components/Modal/ChatPopupModal';

const renderItem = (item, index, onPress) => {
  return (
    <View style={styles.blockedUserContainer} >
      <Image
        source={appImages.avatar}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.name}>Ruben Bergson</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => onPress(item)}>
          <Text style={styles.btnTxtStyle}>Unblock</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const BlockedList = () => {

  const [unblockModal, setUnblockModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [loader, setLoader] = useState(false)
  const [unblockLoader, setUnblockLoader] = useState(false)

  const onUnblockBtnPress = (item) => {
    setUnblockModal(true)
    setSelectedUser(item)
  }

  const unblockUser = () => {

  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Blocked List'} />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={({ item, index }) => renderItem(item, index, onUnblockBtnPress)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
      <ChatPopupModal
        image={selectedUser?.avatar}
        title={selectedUser?.full_name}
        subtitle={'Unblock this user?'}
        buttontitle={'Unblock'}
        show={unblockModal}
        onPressHide={() => setUnblockModal(false)}
        buttonLoader={unblockLoader}
        onButtonPress={unblockUser}
        buttonStyle={{backgroundColor:colors.p1}}
      />
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default BlockedList;
