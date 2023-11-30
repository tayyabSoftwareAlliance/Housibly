import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Menu, MenuItem } from 'react-native-material-menu';
import { WP, appIcons, colors, family, platformOrientedCode, scrWidth, size } from '../../shared/exporter';
import { Icon } from 'react-native-elements';

const FilterComponent = ({ list = [], selected = {}, setSelected }) => {

    const [show, setShow] = useState(false)

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.typeRow}
                onPress={() => setShow(true)}>
                <Image source={selected?.source} style={styles.homeIconStyle} />
                <Text style={styles.homeTxtStyle}>{selected?.value}</Text>
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
                {list.map((item, index) => (
                    <>
                        <MenuItem
                            onPress={() => setSelected(item)}>
                            <View style={styles.menuItemRow}>
                                {item?.source &&
                                    <Image
                                        resizeMode="contain"
                                        source={item.source}
                                        style={styles.modelIconStyle}
                                    />
                                }
                                <Text style={styles.menuTxtStyle}>{item?.value}</Text>
                            </View>
                        </MenuItem>
                        <View style={styles.dividerView} />
                    </>
                ))}
            </Menu>
        </>
    )
}

export default FilterComponent

const styles = StyleSheet.create({
    typeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: WP('5'),
        paddingHorizontal: WP('4'),
    },
    homeIconStyle: {
        width: 14,
        height: 14,
        tintColor:colors.bl1
    },
    homeTxtStyle: {
        marginLeft: 7,
        color: colors.g2,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
    },
    menuStyle: {
        marginTop: 5,
        marginLeft: -5,
        borderRadius: 8,
        width: scrWidth / 2.2,
        paddingBottom:5
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