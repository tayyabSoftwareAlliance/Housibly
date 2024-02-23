import React, { useState } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StatusBar, Alert, TextInput } from 'react-native';
import { AppButton, AppHeader, AppLoader, BackHeader } from '../../../../components';
import { appIcons, colors, HP, responseValidator, WP } from '../../../../shared/exporter';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { logoutRequset } from '../../../../redux/actions';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { CommonActions } from '@react-navigation/routers';
import { auth } from '../../../../shared/api';
import Modal from 'react-native-modal';

const DeleteModal = ({ isVisible, onPressHide, onConfirm }) => {
  const [text, setText] = useState('')
  return (
    <Modal onBackdropPress={onPressHide} isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.h2Style}>{'Confirmation'}</Text>
        <Text style={[styles.txtStyle, { marginVertical: HP(2), width: WP(55) }]}>Please enter the word “DELETE” before we delete your account.</Text>
        <TextInput value={text} onChangeText={(e) => setText(e)} autoFocus style={styles.modalInputStyle} />
        <View style={styles.modalBtnsContainer} >
          <TouchableOpacity style={{padding:WP(5),paddingVertical:WP(1)}} onPress={onPressHide}>
            <Text style={styles.modalBtnTxtStyle}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:WP(5),paddingVertical:WP(1)}} onPress={() => text.trim().toLowerCase() == 'delete' && onConfirm()}>
            <Text style={styles.modalBtnTxtStyle}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const DeleteAccount = ({ navigation }) => {
  const dispatch = useDispatch(null);
  const [modal, setModal] = useState(false)
  const [loader, setLoader] = useState(false)

  const deleteAccount = async () => {
    try {
      setModal(false)
      await new Promise(res => setTimeout(res, 1000))
      setLoader(true)
      const res = await auth.deleteAccount();
      if (res?.status == 200) {
        setLoader(false)
        Alert.alert('Success', 'Account deleted successfully!')
        await new Promise(res => setTimeout(res, 1000))
        dispatch(
          logoutRequset(null, () => {
            GoogleSignin.signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: 'Auth' }],
              }),
            );
          }),
        );
      } else
        Alert.alert('Error', res?.data?.message || 'Something went wrong!')
    } catch (error) {
      console.log('deleteAccount error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg)
    } finally {
      setLoader(false)
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <AppHeader subtitle={'Delete Account'} />
      <BackHeader title={'Delete Account'} />
      <View style={styles.contentContainer} >
        <Text style={styles.h2Style} >Delete Your Account?</Text>
        <Text style={styles.txtStyle}>Deleting your account will remove all of your account’s data, contacts, and other information. Are you sure you want to proceed?</Text>
        <AppButton
          bgColor={colors.r3}
          borderColor={colors.r3}
          shadowColor={colors.white}
          title={'Delete Account'}
          onPress={() => setModal(true)}
          textColor={colors.r1}
        />
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()} >
          <Text style={styles.cancelBtnTxt}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal isVisible={modal} onPressHide={() => setModal(false)} onConfirm={deleteAccount} />
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default DeleteAccount;
