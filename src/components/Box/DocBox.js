import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  appIcons,
  colors,
  commonStyles,
  family,
  size,
  WP,
} from '../../shared/exporter';

export const DocBox = ({docArray, onPressDoc}) => {
  return (
    <View style={styles.container}>
      <View style={commonStyles.aiRow}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={docArray}
          renderItem={({item, index}) => {
            return (
              <View style={styles.imgCon}>
                <Image source={appIcons.pdf} style={styles.imgStyle} />
                <Text numberOfLines={2} style={styles.title}>
                  {item?.name}
                </Text>

                <TouchableOpacity
                  style={styles.iconCon}
                  onPress={() => onPressDoc(index)}>
                  <Image style={styles.iconStyle} source={appIcons.cross} />
                </TouchableOpacity>
              </View>
            );
          }}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  title: {
    fontFamily: family.Gilroy_Bold,
    fontSize: size.tiny,
    color: colors.b6,
    textAlign: 'center',
    width: '80%',
  },

  imgCon: {
    height: WP('40'),
    width: WP('40'),
    margin: 5,
    borderRadius: 25,
    backgroundColor: colors.g39,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  imgStyle: {
    height: 74,
    width: 56,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  iconStyle: {
    height: 10,
    width: 10,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  iconCon: {
    backgroundColor: colors.r5,
    height: 30,
    width: 30,
    alignItems: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    position: 'absolute',
    top: -5,
    right: -10,
  },
});
