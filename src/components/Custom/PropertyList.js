import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { DeletePropertyModal } from '../Modal/DeletePropertyModal'
import { useNavigation } from '@react-navigation/native'
import { PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, colors, family, property_image, size } from '../../shared/exporter'
import PropertyComponent from './PropertyComponent'

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
                renderItem={({ item }) => <PropertyComponent item={item} myProperty />}
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
            <DeletePropertyModal
                item={item}
                show={showModal}
                onPressHide={() => setShowModal(false)}
            />
        </>
    )
}

export default PropertyList

const styles = StyleSheet.create({
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