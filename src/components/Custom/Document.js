import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WP, appIcons, colors, family, size } from '../../shared/exporter'
import { Image } from 'react-native'

const Document = ({ data,onPress }) => {
    return (
        <Pressable style={styles.container} onPress={onPress} >
            <Image
                source={appIcons.pdf}
                style={styles.icon}
                resizeMode='contain'
            />
            <View>
                <Text style={styles.h1} >{data?.name}</Text>
                <Text style={styles.size} >{data?.size}</Text>
            </View>
        </Pressable>
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
        marginRight:WP(2)
    }
})