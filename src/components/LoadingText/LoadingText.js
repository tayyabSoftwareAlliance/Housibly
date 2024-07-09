import { Text, View } from 'react-native'
import React from 'react'
import { colors, family, HP, size } from '../../shared/exporter'

const LoadingText = ({flex1}) => {
    return (
        <View style={[{ height: HP(45),justifyContent: 'center', alignItems: 'center' },flex1 && {flex:1}]} >
            <Text style={{ color: colors.g17, fontSize: size.normal, fontFamily: family.Gilroy_Medium }} >Loading...</Text>
        </View>
    )
}

export default LoadingText