// import { Alert, Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import styles from './styles'
// import { AppButton, AppLoader, BackHeader } from '../../../components'
// import LinearGradient from 'react-native-linear-gradient'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { HP, appImages, colors, responseValidator, size } from '../../../shared/exporter'
// import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// import { createPlatformPayPaymentMethod, isPlatformPaySupported } from '@stripe/stripe-react-native'
// import { useDispatch, useSelector } from 'react-redux';
// import { app } from '../../../shared/api'
// import * as types from '../../../redux/actions/types';

// const BoostProfileDetail = ({ route }) => {

//     const packageDetail = route.params?.package
//     const dispatch = useDispatch(null);
//     const { userInfo } = useSelector(state => state?.auth);
//     const { userProfile } = useSelector(state => state?.settings);
//     const { top } = useSafeAreaInsets()
//     const [subscribed, setSubscribed] = useState(false)
//     const animatedValue = useSharedValue(0)
//     const [loader, setLoader] = useState(false)

//     const animatedBoostIconContainerStyle = useAnimatedStyle(() => {
//         return {
//             transform: [{ translateY: -animatedValue.value }]
//         }
//     })

//     // const callSubscriptionApiForPlatformPay = async (paymentMethodId) => {
//     //     try {
//     //         setLoader(true)
//     //         const formData = new FormData()
//     //         formData.append('payment[stripe_price_id]', packageDetail?.price_id)
//     //         formData.append('payment[payment_method_id]', paymentMethodId)
//     //         console.log('formmmmm', formData)
//     //         const res = await app.createSubscriptionWithPlatformPay(formData)
//     //         console.log('resssss', res?.data)
//     //         if (res.status == 200) {
//     //             dispatch({
//     //                 type: types.GET_PROFILE_SUCCESS,
//     //                 payload: userProfile?.user ? { ...userProfile.user, is_subscribed: true } : { is_subscribed: true },
//     //             })
//     //             setSubscribed(true)
//     //             animatedValue.value = withTiming(HP(10), { duration: 1000 })
//     //         } else {
//     //             Alert.alert('Error', res?.data?.message || 'Something went wrong!');
//     //         }
//     //     } catch (error) {
//     //         console.log('callSubscriptionApiForPlatformPay error ', error)
//     //         let msg = responseValidator(error?.response?.status, error?.response?.data);
//     //         Alert.alert('Error', msg || 'Something went wrong!');
//     //     } finally {
//     //         setLoader(false)
//     //     }
//     // }
//     // const callSubscriptionApiForCard = async () => {
//     //     try {
//     //         setLoader(true)
//     //         const formData = new FormData()
//     //         formData.append('payment[stripe_price_id]', packageDetail?.price_id)
//     //         console.log('formmmmm', formData)
//     //         const res = await app.createSubscriptionWithCard(formData)
//     //         console.log('resssss', res?.data)
//     //         if (res.status == 200) {
//     //             dispatch({
//     //                 type: types.GET_PROFILE_SUCCESS,
//     //                 payload: userProfile?.user ? { ...userProfile.user, is_subscribed: true } : { is_subscribed: true },
//     //             })
//     //             setSubscribed(true)
//     //             animatedValue.value = withTiming(HP(10), { duration: 1000 })
//     //         } else {
//     //             Alert.alert('Error', res?.data?.message || 'Something went wrong!');
//     //         }
//     //     } catch (error) {
//     //         console.log('callSubscriptionApiForCard error ', error)
//     //         let msg = responseValidator(error?.response?.status, error?.response?.data);
//     //         Alert.alert('Error', msg || 'Something went wrong!');
//     //     } finally {
//     //         setLoader(false)
//     //     }
//     // }

//     // const pay = async () => {
//     //     console.log('userInfo?.user?.payment_method', userInfo?.user?.payment_method)
//     //     // if (['apple_pay', 'google_wallet'].includes(userInfo?.user?.payment_method)) {
//     //     if (['apple_pay', 'google_wallet'].includes(userInfo?.user?.payment_method) && Platform.OS != 'android') {
//     //         if (await isPlatformPaySupported({ googlePay: { testEnv: true } })) {
//     //             const { error, paymentMethod } = await createPlatformPayPaymentMethod(
//     //                 {
//     //                     applePay: {
//     //                         cartItems: [
//     //                             {
//     //                                 label: `${packageDetail?.name} Subscription`?.toString().toUpperCase(),
//     //                                 amount: Number(packageDetail?.price_amount / 100 || '00.00').toFixed(2),
//     //                                 paymentType: 'Immediate',
//     //                             },
//     //                         ],
//     //                         merchantCountryCode: 'US',
//     //                         currencyCode: 'USD',
//     //                         //   requiredShippingAddressFields: [
//     //                         //     PlatformPay.ContactField.PostalAddress,
//     //                         //   ],
//     //                         //   requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
//     //                     },
//     //                     googlePay: {
//     //                         testEnv: true,
//     //                         merchantName: 'My merchant name',
//     //                         merchantCountryCode: 'US',
//     //                         currencyCode: 'USD',
//     //                         // billingAddressConfig: {
//     //                         //     format: PlatformPay.BillingAddressFormat.Full,
//     //                         //     isPhoneNumberRequired: true,
//     //                         //     isRequired: true,
//     //                         // },
//     //                     },
//     //                 }
//     //             );
//     //             if (error) {
//     //                 // handle error
//     //                 console.log('Error ', error)
//     //                 if (error.code != 'Canceled')
//     //                     Alert.alert(
//     //                         'Error',
//     //                         error.message || 'Something went wrong!'
//     //                     );
//     //             } else if (paymentMethod) {
//     //                 await new Promise(res => setTimeout(res, 2000))
//     //                 callSubscriptionApiForPlatformPay(paymentMethod?.id)
//     //             }
//     //         } else {
//     //             Alert.alert('Error', 'Apple Pay does not supported on your device!')
//     //         }
//     //     } else {
//     //         callSubscriptionApiForCard()
//     //     }
//     // }

//     return (
//         <View style={[styles.rootContainer, { alignItems: 'center' }]}>
//             <LinearGradient
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 colors={['#FD4E4E', '#9F51DC']}
//                 style={styles.packageDetailTopContainer}
//             >
//                 <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
//                 <BackHeader tintColor={colors.white} containerStyle={{ marginTop: top }} />
//                 <View style={styles.packageDetailTitleContainer}>
//                     <Text style={styles.packageDetailTitle}>
//                         {`$${packageDetail?.price_amount / 100}/${packageDetail?.name}`}
//                     </Text>
//                     <Text style={[styles.packageDetailSubtitle, subscribed && { opacity: 1 }]}>
//                         Subscribed
//                     </Text>
//                 </View>
//             </LinearGradient>
//             <View style={styles.packageDetailBottomContainer} >
//                 <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.packageDetailH5} >{subscribed ? 'Congratulations!' : 'Boost your profile!'}</Animated.Text>
//                 <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.packageDetailSmallTxt} >
//                     {subscribed ?
//                         'Your account is now subscribed to account booster. This will attract more potential clients.' :
//                         'Boosting your account might attract more attention and client.'
//                     }
//                 </Animated.Text>
//                 {!subscribed &&
//                     <Animated.View entering={FadeIn} exiting={FadeOut} >
//                         <Text style={[styles.packageDetailSmallTxt, { marginTop: HP(8) }]} >Are you sure you want to boost your profile?</Text>
//                         <AppButton
//                             width={'100%'}
//                             borderColor={colors.p2}
//                             title="Proceed to payment"
//                             textStyle={{ fontSize: size.tiny }}
//                             // onPress={pay}
//                             marginVertical={HP(3)}
//                         />
//                     </Animated.View>
//                 }
//             </View>
//             <Animated.View style={[styles.boostIconContainer, animatedBoostIconContainerStyle]}>
//                 <Image source={appImages.boost} style={styles.boostIcon} resizeMode='contain' />
//             </Animated.View>
//             <AppLoader loading={loader} />
//         </View>
//     )
// }

// export default BoostProfileDetail