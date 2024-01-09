import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useNavigation } from '@react-navigation/native'
import { WP, appIcons, colors, family, size } from '../../shared/exporter'
import PropertyComponent from './PropertyComponent'
import SupportCloserComponent from './SupportCloserComponent'
import { RemoveBookmarkModal } from '../Modal/RemoveBookmarkModal'

const BookmarksList = ({ data = [], scrollEnabled = true }) => {

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

    const renderHiddenItem = (data, rowMap) => {
        return (
            <View style={styles.backBtnsContainer}>
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
                    <Text style={styles.btnTxtStyle}>Remove</Text>
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
                disableRightSwipe={true}
                renderItem={({ item }) => item.type == 'support_closer' ? <SupportCloserComponent item={item} /> : <PropertyComponent item={item} />}
                renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
                leftOpenValue={180}
                rightOpenValue={-180}
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
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />
            <RemoveBookmarkModal
                item={item}
                show={showModal}
                onPressHide={() => setShowModal(false)}
            />
        </>
    )
}

export default BookmarksList

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
    }
});