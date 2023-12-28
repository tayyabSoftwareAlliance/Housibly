import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WP, appIcons, colors, family, size } from '../../shared/exporter'
import { Image } from 'react-native'

const Document = ({ data }) => {
    return (
        <View style={styles.container} >
            <Image
                source={appIcons.pdf}
                style={styles.icon}
                resizeMode='contain'
            />
            <View>
                <Text style={styles.h1} >{data?.name}</Text>
                <Text style={styles.size} >{`${data?.size}mb`}</Text>
            </View>
        </View>
    )
}

export default Document

const styles = StyleSheet.create({
    container: {
        padding: WP(3),
        backgroundColor: colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    h1: {
        color: colors.b1,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
    },
    size: {
        color: colors.b1,
        fontSize: size.xxsmall,
        fontFamily: family.Gilroy_Medium,
    },
    icon: {
        width: WP(10),
        height: WP(10),
    }
})