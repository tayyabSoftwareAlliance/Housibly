import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Modal from 'react-native-modal'
import { HP, WP, appIcons, colors, family, size } from '../../shared/exporter'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MapGuideModal = ({ type, show, onPressHide }) => {

    const scrollRef = useRef()

    return (
        <Modal isVisible={show}>
            <View style={styles.modalContainer}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >
                    <View style={styles.cardContainer} >
                        <View style={styles.upperContainer} >
                            <Image
                                source={appIcons.handHold}
                                style={styles.handIcon}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={styles.lowerContainer} >
                            <Text style={styles.heading} >Step 1</Text>
                            <Text style={styles.body}>
                                {
                                    type == 'polygon' ?
                                        'Hold the node to change the shape of the polygon.' :
                                        'Hold the notch to resize the circle.'
                                }
                            </Text>
                            <View style={styles.lowerBottomConter} >
                                <View style={styles.linesContainer} >
                                    <View style={styles.focusedLine} />
                                    <View style={styles.line} />
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}} >
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (type == 'polygon')
                                                AsyncStorage.setItem('DONT_SHOW_MAP_POLYGON_GUIDE', 'true')
                                            else
                                                AsyncStorage.setItem('DONT_SHOW_MAP_CIRCLE_GUIDE', 'true')
                                            onPressHide()
                                        }}
                                        style={[styles.btn,{marginRight:WP(1)}]} >
                                        <Text style={styles.btnTxt} >Don't Show</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => scrollRef.current?.scrollToEnd()} style={styles.btn} >
                                        <Text style={styles.btnTxt} >NEXT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardContainer} >
                        <View style={styles.upperContainer} >
                            <Image
                                source={appIcons.handDrag}
                                style={styles.handIcon}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={styles.lowerContainer} >
                            <Text style={styles.heading} >Step 2</Text>
                            <Text style={styles.body}>
                                {
                                    type == 'polygon' ?
                                        'Drag the node to expand the border of the polygon.' :
                                        'Drag the notch to resize the circle.'
                                }
                            </Text>
                            <View style={styles.lowerBottomConter} >
                                <View style={styles.linesContainer} >
                                    <View style={styles.line} />
                                    <View style={styles.focusedLine} />
                                </View>
                                <TouchableOpacity
                                    onPress={onPressHide}
                                    style={styles.btn} >
                                    <Text style={styles.btnTxt} >DONE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

export default MapGuideModal

const styles = StyleSheet.create({
    modalContainer: {
        width: WP(90),
        borderRadius: 8,
        backgroundColor: 'white',
    },
    cardContainer: {
        width: WP(90)
    },
    upperContainer: {
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: HP(3),
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    lowerContainer: {
        padding: WP(4),
        paddingVertical: HP(3)
    },
    handIcon: {
        height: WP(40),
        width: WP(40)
    },
    heading: {
        fontFamily: family.Gilroy_Bold,
        color: colors.b1,
        fontSize: size.h4
    },
    body: {
        fontFamily: family.Gilroy_Regular,
        color: colors.g3,
        fontSize: size.small,
        marginTop: HP(1)
    },
    lowerBottomConter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: HP(3)
    },
    linesContainer: {
        flexDirection: 'row'
    },
    line: {
        height: 5,
        width: WP(4),
        backgroundColor: colors.bl3,
        marginLeft: 2,
        borderRadius: 3
    },
    focusedLine: {
        height: 5,
        width: WP(7),
        backgroundColor: colors.bl1,
        marginLeft: 2,
        borderRadius: 3
    },
    btn: {
        backgroundColor: colors.bl1,
        padding: WP(2),
        paddingHorizontal: WP(4),
        borderRadius: WP(5)
    },
    btnTxt: {
        color: colors.white,
        fontFamily: family.Gilroy_Regular,
        fontSize: size.small,
    }
})