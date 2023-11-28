import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  AddressCard,
  BackHeader,
  FilterInput,
} from '../../../../components';
import { GOOGLE_MAP_KEY, colors, family, size, spacing } from '../../../../shared/exporter';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { set_address_request } from '../../../../redux/actions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAddress = ({ navigation,route }) => {
  const { address } = useSelector(state => state?.appReducer);
  const dispatch = useDispatch(null);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Enter Address'} />
      </View>
      <View style={styles.contentContainer}>
        <Divider style={{ marginBottom: 5 }} color={colors.g13} />
        <GooglePlacesAutocomplete
          placeholder='Search'
          onFail={(error) => console.log('errr', error)}
          fetchDetails
          onPress={async (data, details = null) => {
            // 'details' is provided when fetchDetails = true
            const addressObj = {
              address: details?.formatted_address,
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
            }
            await AsyncStorage.setItem('address', JSON.stringify(addressObj))
            navigation.goBack()
          }}
          query={{
            key: GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
              // backgroundColor:'red'
            },
            listView: {
              position: 'absolute',
              left: 0,
              top: 50,
              zIndex: 1,
              backgroundColor: colors.white,
              elevation: 5,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            },
            textInput: {
              color: colors.b1
            },
          }}
        />
        <Divider color={colors.g13} />
        <Text style={styles.h1}>People who searched this address</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={() => {
              return (
                <View>
                  <AddressCard />
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;
