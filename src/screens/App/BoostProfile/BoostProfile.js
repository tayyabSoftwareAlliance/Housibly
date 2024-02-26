import { Alert, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { appIcons, appImages, colors, responseValidator } from '../../../shared/exporter'
import styles from './styles'
import { SafeAreaView } from 'react-native'
import { AppLoader, BackHeader } from '../../../components'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { app } from '../../../shared/api'

const packages_data = [
    {
        price: 2.99,
        duration: '1month',
        selected: true
    },
    {
        price: 5.99,
        duration: '1quarter',
        selected: false
    },
    {
        price: 7.99,
        duration: '1year',
        selected: false
    },
]

const BoostProfile = ({ navigation }) => {

    const [packages, setPackages] = useState([])
    const [loader, setLoader] = useState(false)
    const isFocused = useIsFocused()

    const fetchData = async () => {
        try {
            setLoader(true)
            const res = await app.getPackages()
            if (res?.status == 200) {
                console.log('resssss', res.data)
                setPackages(res.data || [])
            }
        } catch (error) {
            console.log('error', error)
            let msg = responseValidator(error?.response?.status, error?.response?.data);
            Alert.alert('Error', msg || 'Something went wrong!');
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        isFocused && fetchData()
    }, [isFocused])

    return (
        <SafeAreaView style={styles.rootContainer}>
            <StatusBar
                translucent={false}
                backgroundColor={colors.white}
                barStyle={'dark-content'}
            />
            <BackHeader />
            <View style={styles.contentContainer} >
                <View style={styles.startIconCon}>
                    <Image style={styles.iconStyle} source={appIcons.starWithLinesIcon} resizeMode={'contain'} />
                </View>
                <Text style={styles.title} >
                    Boost your profile!
                </Text>
                <Text style={styles.subtitle}>
                    To get more clients easily, you can boost your account and get noticed by potential buyers.
                </Text>
                {packages.slice(0,3).map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate('BoostProfileDetail', { package: item })} >
                        <LinearGradient
                            key={index}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={index == 0 ? ['#FD4E4E', '#9F51DC'] : ['#DEDEDE', '#DEDEDE']}
                            style={styles.btnCon}
                        >
                            <Text style={styles.btnTxt}>
                                {`$${item.price}/${item.name}`}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
                <View style={styles.boostIconContainer}>
                <Image source={appImages.boost} style={styles.boostIcon} resizeMode='contain' />
                </View>
            </View>
            <AppLoader loading={loader} />
        </SafeAreaView>
    )
}

export default BoostProfile