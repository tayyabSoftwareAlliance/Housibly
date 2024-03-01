import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { AppButton, AppInput, AppLoader, BackHeader } from '../../../components';
import { Menu, MenuItem } from 'react-native-material-menu';
import { appIcons, colors, family, responseValidator, size, WP } from '../../../shared/exporter';
import { allMatches, property_image } from '../../../shared/utilities/constant';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { get_matched_properties } from '../../../redux/actions/app-actions/app-actions';
import { ActivityIndicator } from 'react-native';
import PropertyComponent from '../../../components/Custom/PropertyComponent';
import SearchSupportCloserComponent from '../../../components/Custom/SearchSupportCloserComponent';
import { app } from '../../../shared/api';

let page = 1;

const SearchSupportCloser = ({ navigation }) => {

  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [loader, setLoader] = useState(false)
  const [refreshLoader, setRefreshLoader] = useState(false)
  const [data, setData] = useState([])
  // const [showMenu, setShowMenu] = useState(false);
  // const [filterType, setFilterType] = useState('All');

  // const hideItemClick = type => {
  //   setFilterType(type);
  //   setShowMenu(false);
  // };

  const fetchData = async (from) => {
    if (loader || refreshLoader) return
    if (from == 'refresh' || from == 'search') page = 1
    from == 'refresh' ? setRefreshLoader(true) : setLoader(true)
    console.log('formmmm',page)
    try {
      const res = await app.searchSupportCloser(search, page)
      console.log('resss ', JSON.stringify(res.data[0],null,2))
      if (res?.status == 200 && res?.data?.length > 0) {
        if (page == 1)
          setData(res.data)
        else
          setData(prev => [...prev, ...res.data])
        page++
      }
    } catch (error) {
      console.log('error', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      from == 'refresh' ? setRefreshLoader(false) : setLoader(false)
    }
  }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <BackHeader
        title="Looking For"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <Text style={styles.titleTxtStyle}>Near you</Text>
      <AppInput
        onChangeText={setSearch}
        renderErrorMessage={true}
        placeholder="Search"
        value={search}
        blurOnSubmit={false}
        disableFullscreenUI={true}
        autoCapitalize="none"
        leftIcon={<Icon
          name={'search'}
          type={'material'}
          size={22}
          color={colors.g6}
        />}
        onSubmitEditing={() => fetchData('search')}
      />
      {data.length > 0 &&
        <FlatList
          data={data}
          renderItem={({ item }) => <SearchSupportCloserComponent item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flStyle}
          refreshing={refreshLoader}
          onRefresh={() => fetchData('refresh')}
          onEndReached={() => fetchData()}
          // onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View style={styles.footerComponent} >
              {!refreshLoader && loader && <ActivityIndicator size={WP(6)} color={colors.bl1} />}
            </View>
          }
        />
      }
      <AppLoader loading={!(data.length > 0) && loader} />
    </SafeAreaView>
  );
};

export default SearchSupportCloser;
