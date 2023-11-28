import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppButton,
  BackHeader,
  CheckBoxInput,
  FilterButton,
  FilterInput,
  GalleryCard,
  HomeInput,
  ImagePickerModal,
  ListModal,
  LivingSpaceInput,
  PriceInput,
  TextBox,
} from '../../../../components';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {
  colors,
  currency_list,
  HP,
  image_options,
  level_list,
  property_type_list,
  size,
  spacing,
  WP,
} from '../../../../shared/exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Textarea from 'react-native-textarea';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCreatePropertyData,
  set_address_request,
} from '../../../../redux/actions';
import { useIsFocused } from '@react-navigation/native'
import RoomsBox from '../../../../components/Box/RoomsBox';

const INITIAL_VALUE = {
  name: '',
  length_in_feet: 0,
  length_in_inch: 0,
  width_in_feet: 0,
  width_in_inch: 0,
  level: ''
}

const AddPropertyDetails = ({ navigation, route }) => {

  const dispatch = useDispatch(null);
  const { saved_create_property_data, address } = useSelector(
    state => state?.appReducer,
  );

  const [roomDetail, setRoomDetail] = useState(JSON.parse(JSON.stringify(INITIAL_VALUE)))
  const [data, setData] = useState(JSON.parse(JSON.stringify(route.params)))
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused && saved_create_property_data) {
      setData(JSON.parse(JSON.stringify(saved_create_property_data)))
    }
  }, [saved_create_property_data])

  const onNext = async () => {
    if (data.rooms?.length != data.total_number_of_rooms) {
      Alert.alert('Error', `Please Enter All ${data.total_number_of_rooms} Rooms Details`)
    } else {
      navigation.navigate('PropertyDetail', {data,from:'create'})
    }
  };

  const onSave = async () => {
    const onSuccess = res => {
      Alert.alert('Success', 'Information Saved Successfully')
    };
    dispatch(saveCreatePropertyData(data, onSuccess))
  };

  const setRoomValue = (type, value) => {
    setRoomDetail(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  const addRoom = () => {
    if (!roomDetail.name) {
      Alert.alert('Error', 'Room Name is Required');
    } else if (!(roomDetail.length_in_feet > 0)) {
      Alert.alert('Error', 'Room Length is Required');
    } else if (!(roomDetail.width_in_feet > 0)) {
      Alert.alert('Error', 'Room Width is Required');
    } else if (!roomDetail.level) {
      Alert.alert('Error', 'Room Level is Required');
    } else {
      setData(prev => {
        prev['rooms'] = [{ ...roomDetail }, ...prev['rooms']]
        return { ...prev }
      })
      setRoomDetail(JSON.parse(JSON.stringify(INITIAL_VALUE)))
    }
  }

  const removeRoom = (index) => {
    setData(prev => {
      prev['rooms'] = prev['rooms'].filter((_, ind) => ind != index)
      return { ...prev }
    })
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Add Room Details'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: WP(2) }}>
        <View style={styles.contentContainer}>
          <View style={styles.inputCon}>
            <Text style={[styles.h1, { marginBottom: HP(2) }]}>{'Enter Room Info'}</Text>
            <FilterInput
              placeholder={'Room Name'}
              onChangeText={text => setRoomValue('name', text)}
              value={roomDetail.name}
              keyboardType={'default'}
            />
            <Divider color={colors.g18} />
            <PriceInput
              simpleInputPlaceHolder={'0'}
              title={'Length'}
              subtitle={' (ft)'}
              value={roomDetail.length_in_feet}
              onChangeText={text => setRoomValue('length_in_feet', text)}
            />
            <Divider color={colors.g18} />
            <PriceInput
              simpleInputPlaceHolder={'0'}
              title={'Length'}
              subtitle={' (in)'}
              value={roomDetail.length_in_inch}
              onChangeText={text => setRoomValue('length_in_inch', text)}
            />
            <Divider color={colors.g18} />
            <PriceInput
              simpleInputPlaceHolder={'0'}
              title={'Width'}
              subtitle={' (ft)'}
              value={roomDetail.width_in_feet}
              onChangeText={text => setRoomValue('width_in_feet', text)}
            />
            <Divider color={colors.g18} />
            <PriceInput
              simpleInputPlaceHolder={'0'}
              title={'Width'}
              subtitle={' (in)'}
              value={roomDetail.width_in_inch}
              onChangeText={text => setRoomValue('width_in_inch', text)}
            />
            <Divider color={colors.g18} />
            <FilterButton
              title={'Level'}
              list={level_list}
              selected={roomDetail.level}
              onPressTick={val => setRoomValue('level', val)}
            />
            <Divider color={colors.g18} />
          </View>
          {data.rooms?.length < data.total_number_of_rooms &&
            <TouchableOpacity onPress={addRoom} >
              <Text style={styles.addBtn} >Add</Text>
            </TouchableOpacity>
          }
          <RoomsBox data={data.rooms} onRemoveRoom={removeRoom} />
          <View style={styles.spacRow}>
            <AppButton
              width={'45%'}
              bgColor={colors.g21}
              title={'Save'}
              fontSize={size.tiny}
              borderColor={colors.g21}
              onPress={onSave}
              shadowColor={colors.white}
            />
            <AppButton
              onPress={onNext}
              width={'45%'}
              bgColor={colors.p2}
              title={'Next'}
              fontSize={size.tiny}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddPropertyDetails;