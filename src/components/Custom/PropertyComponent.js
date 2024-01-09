import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { WP, appIcons, appImages, colors, family, property_image, size } from '../../shared/exporter'

const PropertyComponent = ({ item, myProperty = false }) => {

    const navigation = useNavigation()

    console.log('item?.images?.[0]?.url', item?.images?.[0]?.url)

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.itemContainer}
            onPress={() => {
                if (myProperty)
                    navigation.navigate('PotentialBuyers', { item })
                else
                    navigation.navigate('PropertyDetail', { propertyData: item })
            }}
        >
            <Image
                source={{ uri: item?.images?.[0]?.url || property_image }}
                // source={{ uri: property_image }}
                style={styles.imgStyle}
            />
            <View style={{ paddingVertical: 5 }}>
                <View style={styles.innerRow}>
                    <Text numberOfLines={1} style={styles.nameTxtStyle}>
                        {item?.title}
                    </Text>
                    {myProperty &&
                        <View style={styles.txtContainer}>
                            <Text style={styles.newTxtStyle}>{5}</Text>
                        </View>
                    }
                </View>
                <View style={styles.simpleRow}>
                    <Text style={styles.smallTxtStyle}>
                        {`${item?.currency_type} ${item?.price || 0} ${item?.property_type != 'vacant_land' ? '| ' : ''}`}
                    </Text>
                    {item?.property_type != 'vacant_land' &&
                        <>
                            <Image
                                resizeMode="contain"
                                source={appIcons.bedIcon}
                                style={styles.bedIconStyle}
                            />
                            <Text style={styles.smallTxtStyle}>{item?.bed_rooms || 0}</Text>
                            <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
                            <Text resizeMode="contain" style={styles.smallTxtStyle}>
                                {item?.bath_rooms || 0}
                            </Text>
                        </>
                    }
                </View>
                {myProperty ?
                    <View style={[styles.simpleRow, { paddingTop: 2 }]}>
                        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                            return (
                                index < 4 && (
                                    <Image
                                        source={appImages.personPh}
                                        style={styles.personImgStyle(index)}
                                    />
                                )
                            );
                        })}
                        {[1, 2, 3, 4, 5, 6, 7].length > 4 && (
                            <View style={styles.countContainer}>
                                <Text style={styles.countTxtStyle}>
                                    +{[1, 2, 3, 4, 5, 6]?.length - 4}
                                </Text>
                            </View>
                        )}
                    </View> :
                    <>
                        <View style={[styles.simpleRow, { paddingTop: 0 }]}>
                            <Image source={appIcons.heartIcon} style={styles.heartIconStyle} />
                            <Text style={styles.heartTxtStyle}>100% match</Text>
                        </View>
                        <Text style={styles.timeTxtStyle}>Last active: 1 day ago</Text>
                    </>
                }
            </View>
        </TouchableOpacity>
    )
}

export default PropertyComponent

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
    },
    innerRow: {
        width: WP(63),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameTxtStyle: {
        width: WP(55),
        color: colors.b1,
        fontSize: size.large,
        fontFamily: family.Gilroy_SemiBold,
        textTransform: 'capitalize'
    },
    txtContainer: {
        width: 14,
        height: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.r1,
    },
    newTxtStyle: {
        left: 0.3,
        color: colors.white,
        fontSize: size.xxxtiny,
        fontFamily: family.Gilroy_Bold,
    },
    simpleRow: {
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
    },
    smallTxtStyle: {
        color: colors.g23,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
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
    heartIconStyle: {
        width: 13,
        height: 11,
        marginRight: 5,
    },
    heartTxtStyle: {
        color: colors.r2,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
    timeTxtStyle: {
        color: colors.g17,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
})