import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Menu, MenuItem } from 'react-native-material-menu';
import { WP, appIcons, colors, family, platformOrientedCode, scrWidth, size } from '../../shared/exporter';
import { Icon } from 'react-native-elements';

const ReviewsFilterComponent = ({ selected = {}, setSelected }) => {

    const [show, setShow] = useState(false)

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.typeRow}
                onPress={() => setShow(true)}>
                <Image source={appIcons.starIcon} style={styles.homeIconStyle} resizeMode='contain' />
                <Text style={styles.homeTxtStyle}>{selected || 'All'}</Text>
                <Icon
                    type={'feather'}
                    name={show ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={colors.g2}
                    style={{ marginLeft: 5 }}
                />
            </TouchableOpacity>
            <Menu
                visible={show}
                style={styles.menuStyle}
                onRequestClose={() => setShow(false)}>
                <MenuItem
                    onPress={() => {
                        setSelected(0)
                        setShow(false)
                    }}
                    style={selected == 0 && { backgroundColor: colors.g1 }}
                >
                    <View style={styles.menuItemRow}>
                        <Text style={styles.menuTxtStyle}>All</Text>
                    </View>
                </MenuItem>
                {[5, 4, 3, 2, 1].map((item, index) => (
                    <MenuItem
                        onPress={() => {
                            setSelected(item)
                            setShow(false)
                        }}
                        style={selected == item && { backgroundColor: colors.g1 }}
                    >
                        <View style={styles.menuItemRow}>
                            {Array(item).fill(0).map(() => (
                                <Image source={appIcons.starIcon} style={styles.homeIconStyle} resizeMode='contain' />
                            ))}
                        </View>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default ReviewsFilterComponent

const styles = StyleSheet.create({
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    homeIconStyle: {
        width: 14,
        height: 14,
    },
    homeTxtStyle: {
        marginLeft: 7,
        color: colors.g2,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
    },
    menuStyle: {
        marginTop: 20,
        marginLeft: -5,
        borderRadius: 8,
        width: scrWidth / 2.2,
        paddingBottom: 5
    },
    menuItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: platformOrientedCode(WP('2'), WP('4.5')),
    },
    modelIconStyle: {
        width: 15,
        height: 14,
        marginRight: WP('3'),
    },
    menuTxtStyle: {
        color: colors.b1,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Regular,
    },
})