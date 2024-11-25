// import { useIsFocused } from '@react-navigation/core';
// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Alert,
//   Platform,
// } from 'react-native';
// import { AppButton, AppHeader, AppLoader, BackHeader, Spacer } from '../../../../components';
// import {
//   appIcons,
//   checkConnected,
//   colors,
//   networkText,
//   responseValidator,
//   WP,
// } from '../../../../shared/exporter';
// import styles from './styles';
// import { app } from '../../../../shared/api';
// import { useDispatch, useSelector } from 'react-redux';
// import { update_user_setting_request } from '../../../../redux/actions/auth-actions/auth-action';

// const PayMethod = ({ navigation }) => {

//   const dispatch = useDispatch()
//   const { userInfo } = useSelector(state => state?.auth);
//   const [method, setMethod] = useState('credit_card');
//   const [loader, setLoader] = useState(false);
//   const [currentCard, setcurrentCard] = useState(null);
//   const isFocus = useIsFocused(null);

//   //Get Default Card
//   const getDefaultCard = async () => {
//     try {
//       setLoader(true)
//       const isConnected = await checkConnected();
//       if (isConnected) {
//         const res = await app.getDefaultCard()
//         if (res.status == 200) {
//           setcurrentCard(res.data)
//         }
//       } else {
//         Alert.alert('Error', networkText);
//       }
//     } catch (error) {
//       console.log('getDefaultCard error ', error)
//       let msg = responseValidator(error?.response?.status, error?.response?.data);
//       Alert.alert('Error', msg || 'Something went wrong!');
//     } finally {
//       setLoader(false)
//     }
//   };

//   useEffect(() => {
//     isFocus && getDefaultCard()
//   }, [isFocus])

//   useEffect(() => {
//     setMethod(userInfo?.user?.payment_method || 'credit_card')
//   }, [userInfo])

//   return (
//     <SafeAreaView style={styles.rootContainer}>
//       <AppHeader subtitle={'Payment Method'} />
//       <BackHeader
//         // isBox={true}
//         title={'Payment Method'}
//       // boxIcon={
//       //   <Icon name={'plus'} type={'entypo'} size={22} color={colors.white} />
//       // }
//       />
//       <Spacer androidVal={WP('5.5')} iOSVal={WP('5.5')} />
//       <View style={styles.contentContainer}>
//         <Text style={styles.descTxtStyle}>
//           Please setup your paymant method to get better delivery service
//         </Text>
//         <Text style={styles.payTxtStyle}>Payment Methods</Text>
//         <TouchableOpacity
//           activeOpacity={0.7}
//           style={styles.itemContainer}
//           onPress={() => {
//             if (method == 'credit_card') return
//             setMethod('credit_card')
//             setLoader(true)
//             const formData = new FormData()
//             formData.append('user_setting[payment_method]', 'credit_card')
//             const onFailure = (msg) => {
//               setMethod(method)
//               Alert.alert('Error', msg || 'Something went wrong!')
//             }
//             const onFinally = () => {
//               setLoader(false)
//             }
//             dispatch(update_user_setting_request(formData, onFailure, onFinally))
//           }}
//         >
//           <View style={styles.innerRow}>
//             <Image
//               resizeMode="contain"
//               source={appIcons.cards}
//               style={styles.iconStyle}
//             />
//             <View>
//               <Text style={styles.titleTxtStyle}>Credit Card</Text>
//               <Text style={styles.valTxtStyle}>
//                 {currentCard?.card?.last4
//                   ? `**** **** **** ${currentCard?.card?.last4} ${currentCard?.card?.brand}`
//                   : 'No card selected'}
//               </Text>
//             </View>
//           </View>
//           <Image
//             resizeMode="contain"
//             // source={method == 'credit_card' ? appIcons.checked : appIcons.unchecked}
//             source={method == 'credit_card' || Platform.OS == 'android' ? appIcons.checked : appIcons.unchecked}
//             style={styles.iconStyle}
//           />
//         </TouchableOpacity>
//         {Platform.OS == 'ios' ?
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.itemContainer}
//             onPress={() => {
//               if (method == 'apple_pay') return
//               setMethod('apple_pay')
//               setLoader(true)
//               const formData = new FormData()
//               formData.append('user_setting[payment_method]', 'apple_pay')
//               const onFailure = (msg) => {
//                 setMethod(method)
//                 Alert.alert('Error', msg || 'Something went wrong!')
//               }
//               const onFinally = () => {
//                 setLoader(false)
//               }
//               dispatch(update_user_setting_request(formData, onFailure, onFinally))
//             }}
//           >
//             <View style={styles.innerRow}>
//               <Image
//                 resizeMode="contain"
//                 source={appIcons.apple}
//                 style={styles.iconStyle}
//               />
//               <View>
//                 <Text style={styles.titleTxtStyle}>Apple Pay</Text>
//                 <Text style={styles.valTxtStyle}>{userInfo?.user?.email || 'myemail.com'}</Text>
//               </View>
//             </View>
//             <Image
//               resizeMode="contain"
//               source={method != 'credit_card' ? appIcons.checked : appIcons.unchecked}
//               style={styles.iconStyle}
//             />
//           </TouchableOpacity> :
//           // null
//           <TouchableOpacity
//             activeOpacity={0.7}
//             style={styles.itemContainer}
//             onPress={() => {
//               if (method == 'google_wallet') return
//               setMethod('google_wallet')
//               setLoader(true)
//               const formData = new FormData()
//               formData.append('user_setting[payment_method]', 'google_wallet')
//               const onFailure = (msg) => {
//                 setMethod(method)
//                 Alert.alert('Error', msg || 'Something went wrong!')
//               }
//               const onFinally = () => {
//                 setLoader(false)
//               }
//               dispatch(update_user_setting_request(formData, onFailure, onFinally))
//             }}            >
//             <View style={styles.innerRow}>
//               <Image
//                 resizeMode="contain"
//                 source={appIcons.cards}
//                 style={styles.iconStyle}
//               />
//               <View>
//                 <Text style={styles.titleTxtStyle}>Google Wallet</Text>
//                 <Text style={styles.valTxtStyle}>{userInfo?.user?.email || 'myemail.com'}</Text>
//               </View>
//             </View>
//             <Image
//               resizeMode="contain"
//               source={method != 'credit_card' ? appIcons.checked : appIcons.unchecked}
//               style={styles.iconStyle}
//             />
//           </TouchableOpacity>
//         }
//       </View>
//       {method == 'credit_card' && (
//         <View style={styles.bottomView}>
//           <AppButton
//             title="Continue"
//             borderColor={colors.white}
//             shadowColor={colors.white}
//             onPress={() => navigation.navigate('AllCards')}
//           />
//         </View>
//       )}
//       <AppLoader loading={loader} />
//     </SafeAreaView>
//   );
// };

// export default PayMethod;
