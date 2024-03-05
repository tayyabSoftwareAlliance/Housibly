import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { WP, colors, family, size } from '../../shared/exporter';
import CheckBox from '../Custom/CheckBox';
import { TouchableOpacity } from 'react-native';

export const CheckBoxInput = ({
    checked,
    inputs,
    title,
    subtitle,
    marginRight,
    marginLeft,
    marginBottom,
    marginTop,
    source,
    tintColor,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={[styles.container, { justifyContent: !inputs && 'space-between' }]} onPress={onPress}>
            <View style={styles.aiRow}>
                <View style={[styles.headStyle]}>
                    {source && (
                        <Image
                            source={source}
                            resizeMode='contain'
                            style={{
                                height: 30,
                                width: 30,
                                marginRight: marginRight || WP('3.85'),
                                marginLeft: marginLeft,
                                marginBottom: marginBottom,
                                marginTop: marginTop,
                                tintColor: tintColor,
                            }}
                        />
                    )}
                    <Text style={[styles.h1]}>{title || 'Price'}</Text>
                    {subtitle && <Text style={styles.subStyle}>{subtitle}</Text>}
                </View>
            </View>
            <CheckBox
                checked={checked}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
    },
    subStyle: {
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
        color: colors.g19,
    },
    aiRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    h1: {
        color: colors.b1,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
    },
    rowTextStyle: {
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Medium,
        color: colors.b1,
        textDecorationLine: 'underline',
    },
    btnCon: {
        backgroundColor: colors.white,
        shadowRadius: 12,
        borderRadius: 12,
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: colors.g29,
        marginVertical: 0,
    },
    btnStyle: {
        width: '40%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    dropdownStyle: {
        marginVertical: -15,
        width: '20%',
        backgroundColor: colors.white,
    },
    rowStyle: {
        borderBottomWidth: 0,
        height: 45,
    },
    inputStyle: {
        height: 20,
        width: '40%',
        borderLeftWidth: 1,
        borderLeftColor: colors.p2,
        color: colors.g19,
        padding: 0,
    },
    simpleInputStyle: {
        height: 50,
        color: colors.g19,
        padding: 0,
        textAlign: 'right',
    },
    to: {
        paddingHorizontal: 10,
        color: colors.g19,
        fontFamily: family.Gilroy_Medium,
        fontSize: size.xsmall,
    },
    aiRow1: {
        flexDirection: 'row',
        height: '100%',
        width: '50%',
        alignItems: 'center',
    },
});
