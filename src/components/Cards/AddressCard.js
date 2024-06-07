import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, family, size } from '../../shared/exporter';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AddressCard = ({ item }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('PersonChat',
          {
            recipient_id: item?.id,
            avatar: item?.avatar,
            full_name: item?.full_name,
            from: 'not_chats'
          })
      }}>
      <View style={styles.imgBox}>
        <Image
          style={styles.imgStyle}
          source={{ uri: item?.avatar }}
        />
      </View>
      <View>
        <Text style={styles.h1}>{item?.full_name || 'N/A'}</Text>
        <Text style={styles.h2}>
          Budget:
          <Text style={{ color: colors.gr1 }}> {`$${item?.budget?.min || 0} to ${item?.budget?.max ? '$' + item.budget.max : 'Any'}`}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  imgBox: {
    height: 68,
    width: 68,
    borderRadius: 15,
    marginRight: 10,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
    backgroundColor: colors.g14
  },
  h1: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.large,
    color: colors.b1,
    marginVertical: 5,
  },
  h2: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
    color: colors.g23,
  },
});
