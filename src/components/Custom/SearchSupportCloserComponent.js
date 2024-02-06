import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { WP, appIcons, appImages, colors, family, property_image, size } from '../../shared/exporter'

const SearchSupportCloserComponent = ({ item }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.itemContainer}
            onPress={() => navigation.navigate('SupportCloserDetail',{id:item?.id})}>
            <Image
                source={{ uri: item?.avatar }}
                style={styles.imgStyle}
            />
            <View style={{ paddingVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Text numberOfLines={1} style={styles.nameTxtStyle}>
                        {item?.full_name || 'N/A'}
                    </Text>
                    <View style={styles.simpleRow}>
                        <Image source={appIcons.starIcon} style={styles.starIconStyle} />
                        <Text style={styles.ratingTxtStyle}>{item?.average_rating ? Number(item.average_rating).toFixed(1) : 0}</Text>
                    </View>
                </View>
                {/* <Text style={[styles.smallTxtStyle, { fontFamily: family.Gilroy_SemiBold, paddingTop: WP(1) }]}>{item?.company || 'N/A'}</Text> */}
                <Text style={[styles.smallTxtStyle, { textTransform: 'capitalize' }]}>{item?.professions?.map(item => item?.title)?.join(', ') || 'N/A'}</Text>
            </View>
        </TouchableOpacity >
    )
}

export default SearchSupportCloserComponent

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: WP(2),
        paddingHorizontal: WP(4),
        backgroundColor: colors.white,
    },
    imgStyle: {
        borderRadius: 15,
        width: WP(26),
        height: WP(25),
        marginRight: WP(2.5),
        backgroundColor:colors.g14
    },
    nameTxtStyle: {
        width: WP(57),
        color: colors.b1,
        fontSize: size.large,
        fontFamily: family.Gilroy_SemiBold,
        textTransform: 'capitalize',
    },
    simpleRow: {
        paddingTop: WP(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallTxtStyle: {
        color: colors.g23,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
        paddingTop: WP(2),
    },
    bedIconStyle: {
        width: 14,
        height: 9,
        marginRight: 3,
    },
    bathIconStyle: {
        width: 11,
        height: 11,
        marginLeft: 8,
        marginRight: 4,
    },
    personImgStyle: index => {
        return {
            borderRadius: 5,
            borderWidth: 1.5,
            width: WP('6.15'),
            height: WP('6.15'),
            borderColor: colors.white,
            left: index === 0 ? 0 : -5 * index,
        };
    },
    countContainer: {
        left: -20,
        borderRadius: 5,
        borderWidth: 1.5,
        width: WP('6.15'),
        height: WP('6.15'),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: colors.white,
        backgroundColor: colors.g25,
    },
    countTxtStyle: {
        color: colors.b1,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginBottom: 9,
    },
    btnTxtStyle: {
        color: colors.white,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
    starIconStyle: {
        width: 13,
        height: 11,
        marginRight: 5,
    },
    ratingTxtStyle: {
        color: colors.g19,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
    timeTxtStyle: {
        color: colors.g17,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
})