import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HP, WP, appImages, colors, family, size } from '../../shared/exporter'
import StarRating from 'react-native-star-rating';

const Review = ({ data, short, containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]} >
            <Image style={styles.image} source={{ uri: data?.user?.avatar }} />
            <View style={{ width: WP(73) }} >
                <View style={{flexDirection:'row',alignItems:'center'}} >
                    <Text style={[styles.title,!short && {maxWidth:WP(65)-80}]} numberOfLines={1} >{data?.user?.full_name || 'N/A'}</Text>
                    {!short &&
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={data?.rating || 0}
                            fullStarColor={'#FFC107'}
                            emptyStarColor={'#ccc'}
                            // selectedStar={(rating) => { }}
                            starSize={20}
                            containerStyle={{marginLeft:WP(3)}}
                        />
                    }
                </View>
                <Text style={styles.body} numberOfLines={short && 2} >{data?.description || 'N/A'}</Text>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 16
    },
    image: {
        width: WP(15),
        height: WP(15),
        borderRadius: 10,
        marginRight: WP(3),
        backgroundColor: colors.g14
    },
    title: {
        color: colors.b1,
        fontSize: size.small,
        fontFamily: family.Gilroy_Medium,
        maxWidth:WP(65)
    },
    body: {
        color: colors.g11,
        fontSize: size.xsmall,
        fontFamily: family.Gilroy_Regular,
    }
})