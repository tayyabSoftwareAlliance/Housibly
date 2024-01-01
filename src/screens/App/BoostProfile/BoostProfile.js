import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { appIcons, colors } from '../../../shared/exporter'
import styles from './styles'
import { SafeAreaView } from 'react-native'
import { BackHeader } from '../../../components'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableOpacity } from 'react-native'

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

const BoostProfile = ({navigation}) => {

    const [packages, setPackages] = useState(packages_data)

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
                {packages.map((item, index) => (
                    <TouchableOpacity onPress={() => {
                        setPackages(prev => prev.map((it, ind) => {
                        if (ind == index)
                            it.selected = true
                        else
                            it.selected = false
                        return { ...it }

                    }))
                    navigation.navigate('BoostProfileDetail',{package:item})
                    }} >
                        <LinearGradient
                            key={index}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={item.selected ? ['#FD4E4E', '#9F51DC'] : ['#DEDEDE', '#DEDEDE']}
                            style={styles.btnCon}
                        >
                            <Text style={styles.btnTxt}>
                                {`$${item.price}/${item.duration}`}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
                <Text style={styles.footerTxt} >
                    Access to all features. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat. Velit officia consequat.
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default BoostProfile