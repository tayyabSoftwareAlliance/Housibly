import { StyleSheet } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { colors } from '../../shared/exporter'
import { TouchableOpacity } from 'react-native'

const CheckBox = ({
    checked,
    onPress,
    style
}) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.box, style, checked && styles.checked]} >
            {checked &&
                <Icon
                    type="material"
                    name="check"
                    color={colors.white}
                    size={15}
                />
            }
        </TouchableOpacity>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    box: {
        width: 25,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: colors.bl1,
        borderRadius: 5,
        backgroundColor: colors.bl3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checked: {
        backgroundColor: colors.bl1
    }
})