import { Alert, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { AppButton, BackHeader } from '../../../components'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HP, appImages, colors, size } from '../../../shared/exporter'
import Animated, { Easing, FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { confirmPlatformPayPayment, isPlatformPaySupported } from '@stripe/stripe-react-native'

const BoostProfileDetail = ({ route }) => {

    const packageDetail = route.params?.package
    const { top } = useSafeAreaInsets()
    const [subscribed, setSubscribed] = useState(false)
    const animatedValue = useSharedValue(0)

    const animatedBoostIconContainerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: -animatedValue.value }]
        }
    })

    const pay = async () => {
        if (await isPlatformPaySupported({ googlePay: { testEnv: true } })) {
            const clientSecret = "pi_3OolgXIJekvJVXYP0SOpGQzn_secret_bSEXR2jhidkk4Kgf7DXDCmqkz"
            const { error } = await confirmPlatformPayPayment(
                clientSecret,
                {
                    applePay: {
                        cartItems: [
                            {
                                label: `${packageDetail?.name} Subscription`?.toString().toUpperCase(),
                                amount: Number(packageDetail?.price || '00.00').toFixed(2),
                                paymentType: 'Immediate',
                            },
                        ],
                        merchantCountryCode: 'US',
                        currencyCode: 'USD',
                        //   requiredShippingAddressFields: [
                        //     PlatformPay.ContactField.PostalAddress,
                        //   ],
                        //   requiredBillingContactFields: [PlatformPay.ContactField.PhoneNumber],
                    },
                    googlePay: {
                        testEnv: true,
                        merchantName: 'My merchant name',
                        merchantCountryCode: 'US',
                        currencyCode: 'USD',
                        // billingAddressConfig: {
                        //     format: PlatformPay.BillingAddressFormat.Full,
                        //     isPhoneNumberRequired: true,
                        //     isRequired: true,
                        // },
                    },
                }
            );
            if (error) {
                // handle error
                console.log('Error ', error)
                console.log('Error response ', error?.response)
            } else {
                Alert.alert('Success', 'Check the logs for payment intent details.');
                setSubscribed(true)
                animatedValue.value = withTiming(HP(10), { duration: 1000 })

            }
        } else {
            Alert.alert('Error', 'Apple Pay does not supported on your device!')
        }
    }

    return (
        <View style={[styles.rootContainer, { alignItems: 'center' }]}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#FD4E4E', '#9F51DC']}
                style={styles.packageDetailTopContainer}
            >
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
                <BackHeader tintColor={colors.white} containerStyle={{ marginTop: top }} />
                <View style={styles.packageDetailTitleContainer}>
                    <Text style={styles.packageDetailTitle}>
                        {`$${packageDetail?.price}/${packageDetail?.name}`}
                    </Text>
                    <Text style={[styles.packageDetailSubtitle, subscribed && { opacity: 1 }]}>
                        Subscribed
                    </Text>
                </View>
            </LinearGradient>
            <View style={styles.packageDetailBottomContainer} >
                <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.packageDetailH5} >{subscribed ? 'Congratulations!' : 'Boost your profile!'}</Animated.Text>
                <Animated.Text entering={FadeIn} exiting={FadeOut} style={styles.packageDetailSmallTxt} >
                    {subscribed ?
                        'Your account is now subscribed to account booster. This will attract more potential clients.' :
                        'Boosting your account might attract more attention and client.'
                    }
                </Animated.Text>
                {!subscribed &&
                    <Animated.View entering={FadeIn} exiting={FadeOut} >
                        <Text style={[styles.packageDetailSmallTxt, { marginTop: HP(8) }]} >Are you sure you want to boost your profile?</Text>
                        <AppButton
                            width={'100%'}
                            borderColor={colors.p2}
                            title="Proceed to payment"
                            textStyle={{ fontSize: size.tiny }}
                            onPress={pay}
                            marginVertical={HP(3)}
                        />
                    </Animated.View>
                }
            </View>
            <Animated.View style={[styles.boostIconContainer, animatedBoostIconContainerStyle]}>
                <Image source={appImages.boost} style={styles.boostIcon} resizeMode='contain' />
            </Animated.View>
        </View>
    )
}

export default BoostProfileDetail