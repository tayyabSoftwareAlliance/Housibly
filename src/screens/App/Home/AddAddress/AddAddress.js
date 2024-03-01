import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  AddressCard,
  AppLoader,
  BackHeader,
  FilterInput,
} from '../../../../components';
import { GOOGLE_MAP_KEY, WP, colors, family, responseValidator, size, spacing } from '../../../../shared/exporter';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_user_location_request } from '../../../../redux/actions/auth-actions/auth-action';
import { app } from '../../../../shared/api';
import { create_dream_address } from '../../../../redux/actions/app-actions/app-actions';

let page = 1;

const AddAddress = ({ navigation, route }) => {

  const { address } = useSelector(state => state?.appReducer)
  const from = route.params?.from
  const dispatch = useDispatch(null)
  const [loader, setLoader] = useState(false)
  const [users, setUsers] = useState([])
  const [count, setCount] = useState(0)
  const [locationObj, setLocationObj] = useState(null)
  const [refreshLoader, setRefreshLoader] = useState(false)

  const fetchData = async (locationObj, from) => {
    if (loader || refreshLoader || !locationObj) return
    if (from == 'refresh') {
      page = 1
      setRefreshLoader(true)
    } else
      setLoader(true)
    try {
      const res = await app.getPeopleWhoSearchedThisLocation(locationObj?.latitude, locationObj?.longitude, page)
      if (res?.status == 200) {
        if (page == 1)
          setCount(res.data?.total_user_count || 0)
        if (page == 1)
          setUsers(res.data?.users || [])
        else if (res.data?.users?.length > 0)
          setUsers(prev => [...prev, ...res.data?.users])
        page++
      }
    } catch (error) {
      console.log('AddAdress fetchData error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      from == 'refresh' ? setRefreshLoader(false) : setLoader(false)
    }
  }

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
            const locationObj = {
              address: details?.formatted_address,
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
            }
            if (from == 'create_property') {
              await AsyncStorage.setItem('address', JSON.stringify(locationObj))
              navigation.goBack()
            } else if (from == 'home') {
              setLoader(true)
              const onSuccess = () => {
                setLoader(false)
                setTimeout(() => navigation.goBack(), 1000)
              }
              dispatch(set_user_location_request(locationObj, onSuccess))
            } else if (from == 'enter_address') {
              setLocationObj(locationObj)
              fetchData(locationObj, 'refresh')
              const formData = new FormData()
              formData.append('searched_address[address]', locationObj.address)
              formData.append('searched_address[latitude]', locationObj.latitude)
              formData.append('searched_address[longitude]', locationObj.longitude)
              app.addSearchedAddress(formData)
            } else if (from == 'dream_address') {
              setLoader(true)
              const formData = new FormData()
              formData.append('dream_address[address]', locationObj.address)
              formData.append('dream_address[latitude]', locationObj.latitude)
              formData.append('dream_address[longitude]', locationObj.longitude)
              const onSuccess = () => {
                setLoader(false)
                setTimeout(() => navigation.goBack(), 1000)
              }
              const onFinally = () => {
                setLoader(false)
              }
              dispatch(create_dream_address(formData, onSuccess, onFinally))
            }
          }}
          query={{
            key: GOOGLE_MAP_KEY,
            language: 'en',
          }}
          styles={{
            container: {
              flex: 0,
              zIndex: 1
            },
            listView: {
              position: 'absolute',
              left: 0,
              top: 50,
              backgroundColor: colors.white,
              elevation: 5,
              shadowOffset: { width: 1, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
            },
            textInput: {
              color: colors.b1
            },
            description: {
              color: '#777'
            }
          }}
        />
        <Divider color={colors.g13} />
        {from == 'enter_address' &&
          <>
            <Text style={styles.h1}>People who searched this address</Text>
            {count ? <Text style={styles.countText}>{`${count} entries`}</Text> : null}
            {users.length > 0 ?
              <View style={{ flex: 1 }}>
                <FlatList
                  data={users}
                  keyExtractor={(_, index) => index}
                  refreshing={refreshLoader}
                  onRefresh={() => fetchData(locationObj, 'refresh')}
                  onEndReached={() => fetchData(locationObj)}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item }) => {
                    return <AddressCard item={item} />
                  }}
                  ListFooterComponent={
                    <View style={styles.footerComponent} >
                      {!refreshLoader && loader && <ActivityIndicator size={WP(6)} color={colors.bl1} />}
                    </View>
                  }
                />
              </View> :
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={styles.noData} >{locationObj && !refreshLoader && 'No users found agaist this address'}</Text>
              </View>
            }
          </>
        }
      </View>
      <AppLoader loading={!(users.length > 0) && (loader || refreshLoader)} />
    </SafeAreaView>
  );
};

export default AddAddress;
