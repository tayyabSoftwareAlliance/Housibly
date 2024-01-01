import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { DeleteModal } from '../Modal/DeleteModal'
import { useNavigation } from '@react-navigation/native'
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, colors, family, property_image, size } from '../../shared/exporter'

const PropertyList = ({ data = [], scrollEnabled = true }) => {

    const [item, setItem] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation()

    const closeRow = (map, key) => {
        map && map[key] && map[key].closeRow();
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const handleDelete = data => {
        setItem(data?.item);
        setTimeout(() => {
            setShowModal(true);
        }, 300);
    };
    const onEdit = (data, rowMap) => {
        closeRow(rowMap, data?.index)
        navigation.navigate('AddPropertyDetails', { propertyData: data?.item, from: 'edit' });
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.itemContainer}
                onPress={() => navigation.navigate('PotentialBuyers', { item })}>
                <Image
                    source={{ uri: item?.images?.[0]?.url || property_image }}
                    style={styles.imgStyle}
                />
                <View style={{ paddingVertical: 5 }}>
                    <View style={styles.innerRow}>
                        <Text numberOfLines={1} style={styles.nameTxtStyle}>
                            {item?.title}
                        </Text>
                        <View style={styles.txtContainer}>
                            <Text style={styles.newTxtStyle}>{data.length}</Text>
                        </View>
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
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderHiddenItem = (data, rowMap) => {
        return (
            <View style={styles.backBtnsContainer}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
                    onPress={() => onEdit(data, rowMap)}>
                    <Image
                        resizeMode="contain"
                        source={appIcons.editIcon}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.editBtnTxtStyle}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.backLeftBtn, styles.backLeftBtnRight]}
                    onPress={() => closeRow(rowMap, data?.index)}>
                    <Image
                        resizeMode="contain"
                        source={appIcons.markedIcon}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.btnTxtStyle}>Mark as Sold</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => onEdit(data, rowMap)}>
                    <Image
                        resizeMode="contain"
                        source={appIcons.editIcon}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.editBtnTxtStyle}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => {
                        closeRow(rowMap, data?.index);
                        handleDelete(data);
                    }}>
                    <Image
                        resizeMode="contain"
                        source={appIcons.delIcon}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.btnTxtStyle}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            <SwipeListView
                useFlatList
                data={data}
                scrollEnabled={scrollEnabled}
                // data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                // disableLeftSwipe={true}
                // disableRightSwipe={true}
                renderItem={renderItem}
                renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
                leftOpenValue={180}
                rightOpenValue={-180}
                // previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                closeOnScroll
                onRowDidOpen={onRowDidOpen}
                onRowOpen={(rowKey, rowMap) => {
                    let key = rowKey;
                    if (key === rowKey) return;
                    setTimeout(() => {
                        rowMap[rowKey].closeRow();
                    }, 2000);
                }}
                // closeOnRowPress
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }}
            />
            <DeleteModal
                item={item}
                show={showModal}
                onPressHide={() => setShowModal(false)}
            />
        </>
    )
}

export default PropertyList

const styles = StyleSheet.create({
    itemContainer: {
        paddingTop: WP('1'),
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: WP('2'),
        justifyContent: 'center',
        paddingHorizontal: WP('12'),
        backgroundColor: colors.white,
    },
    imgStyle: {
        borderRadius: 15,
        width: WP('26.3'),
        height: WP('24.1'),
        marginRight: WP('2.5'),
    },
    innerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameTxtStyle: {
        width: '78%',
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
    backTextWhite: {
        color: '#FFF',
    },
    backBtnsContainer: {
        flex: 1,
        paddingLeft: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backLeftBtn: {
        top: 0,
        bottom: 0,
        width: 85,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
    },
    backLeftBtnLeft: {
        left: 0,
        backgroundColor: colors.g26,
    },
    backLeftBtnRight: {
        left: 85,
        width: 90,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: colors.s5,
    },
    backRightBtn: {
        top: 0,
        bottom: 0,
        width: 85,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
    },
    backRightBtnLeft: {
        right: 85,
        width: 90,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        backgroundColor: colors.g26,
    },
    backRightBtnRight: {
        right: 0,
        backgroundColor: colors.r1,
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginBottom: 9,
    },
    editBtnTxtStyle: {
        color: colors.b4,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
    btnTxtStyle: {
        color: colors.white,
        fontSize: size.tiny,
        fontFamily: family.Gilroy_Medium,
    },
});