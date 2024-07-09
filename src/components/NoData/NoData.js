import { Text, View } from 'react-native'
import React from 'react'
import { colors, family, HP, size } from '../../shared/exporter'

const NoData = ({ flex1 }) => {
    return (
        <View style={[{ height: HP(45), justifyContent: 'center', alignItems: 'center' }, flex1 && { flex: 1 }]} >
            <Text style={{ color: colors.g17, fontSize: size.normal, fontFamily: family.Gilroy_Medium }} >No Properties Found Yet!</Text>
        </View>
    )
}

export default NoData