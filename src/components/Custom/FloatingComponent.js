import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
const { colors, size, WP, family } = require("../../shared/exporter");

const FloatingComponent = ({
    title,
    onPress,
    icon,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.buttonStyle}>
            {icon && <Image source={icon} style={[styles.imgStyle]} />}
            <Text numberOfLines={1} style={styles.buttonTextStyle}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default FloatingComponent

const styles = StyleSheet.create({
    buttonStyle: {
            width: WP(20),
            borderRadius: WP(5),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.p2,
            shadowColor: colors.p1,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            elevation: 10,
            padding:WP(2),
            paddingHorizontal:WP(3),
            marginHorizontal:WP(1)
    },
    imgStyle:{
        width:WP(7),
        height:WP(7),
        marginBottom:WP(1)
    },
    buttonTextStyle: {
            color: colors.white,
            fontSize: WP(1.8),
            fontFamily: family.Gilroy_Medium,
    },
})