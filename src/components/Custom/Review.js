import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HP, WP, appImages, colors, family, size } from '../../shared/exporter'

const Review = ({ data, short,containerStyle }) => {
    return (
        <View style={[styles.container,containerStyle]} >
            <Image style={styles.image} source={appImages.avatar} />
            <View style={{width:WP(73)}} >
                <Text style={styles.title} >{data.title}</Text>
                <Text style={styles.body} numberOfLines={short && 2} >{data.review}</Text>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop:16
    },
    image: {
        width: WP(15),
        height: WP(15),
        borderRadius: 10,
        marginRight: WP(3)
    },
    title:{
        color: colors.b1,
        fontSize: size.small,
        fontFamily: family.Gilroy_Medium,
    },
    body:{
        color: colors.g11,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Regular,
    }
})