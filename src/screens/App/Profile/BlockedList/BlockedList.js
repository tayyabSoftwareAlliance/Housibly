import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { AppHeader, AppLoader, BackHeader } from '../../../../components';
import styles from './styles';
import { appImages, colors, responseValidator } from '../../../../shared/exporter';
import { ChatPopupModal } from '../../../../components/Modal/ChatPopupModal';
import { app } from '../../../../shared/api';

const renderItem = (item, index, onPress) => {
  return (
    <View style={styles.blockedUserContainer} >
      <Image
        source={{ uri: item.avatar }}
        style={styles.imgStyle}
      />
      <View>
        <Text style={styles.name}>{item.full_name}</Text>
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
  const [blockedList, setBlockedList] = useState([])

  const onUnblockBtnPress = (item) => {
    setUnblockModal(true)
    setSelectedUser(item)
  }

  const unblockUser = async () => {
    try {
      setUnblockLoader(true)
      const formData = new FormData()
      formData.append('user_id', selectedUser?.user_id)
      formData.append('is_blocked', false)
      const res = await app.blockUnblockUser(formData)
      if (res?.status == 200) {
        setUnblockModal(false)
        setBlockedList(prev => prev.filter(item => item.user_id != selectedUser?.user_id))
        Alert.alert('Success','User Unblocked Successfully!')
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setUnblockLoader(false)
    }
  }

  const getBlockedList = async () => {
    try {
      setLoader(true)
      const res = await app.getBlockedUsers();
      if (res?.status == 200) {
        setBlockedList(res.data?.blocked_users || [])
      }
    } catch (error) {
      console.log(error.response);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getBlockedList()
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <BackHeader title={'Blocked List'} />
      {blockedList.length > 0 ?
        <FlatList
          data={blockedList}
          keyExtractor={(item) => item.conversation_id}
          renderItem={({ item, index }) => renderItem(item, index, onUnblockBtnPress)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        /> :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Text style={styles.noData} >No Blocked User Found!</Text>
        </View>
      }
      <ChatPopupModal
        image={selectedUser?.avatar}
        title={selectedUser?.full_name}
        subtitle={'Unblock this user?'}
        buttontitle={'Unblock'}
        show={unblockModal}
        onPressHide={() => setUnblockModal(false)}
        buttonLoader={unblockLoader}
        onButtonPress={unblockUser}
        buttonStyle={{ backgroundColor: colors.p1 }}
      />
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default BlockedList;
