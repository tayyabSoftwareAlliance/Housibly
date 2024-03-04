import {
  Alert,
  Keyboard,
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
  FilterButton,
  FilterInput,
  PriceInput,
} from '../../../../components';
import styles from './styles';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import {
  colors,
  HP,
  level_list,
  size,
  spacing,
  WP,
} from '../../../../shared/exporter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveCreatePropertyData,
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

  const { propertyData, from } = route.params
  const dispatch = useDispatch(null);
  const { saved_create_property_data, address } = useSelector(
    state => state?.appReducer,
  );

  const [roomDetail, setRoomDetail] = useState({ ...INITIAL_VALUE })
  const [data, setData] = useState(JSON.parse(JSON.stringify(propertyData)))
  const isFocused = useIsFocused()

  useEffect(() => {
    if (!isFocused && saved_create_property_data && from != 'edit') {
      setData(JSON.parse(JSON.stringify(saved_create_property_data)))
    }
  }, [saved_create_property_data])

  const onNext = async () => {
    Keyboard.dismiss()
    if (data.rooms?.filter(item => !item?.deleted)?.length != data.total_number_of_rooms) {
      Alert.alert('Error', `Rooms Details should be equal to Number of Rooms: ${data.total_number_of_rooms} as you entered in previous screen`)
    } else {
      navigation.navigate('PropertyDetail', { propertyData: data, id: data?.id, from })
    }
  };

  const onSave = async () => {
    dispatch(saveCreatePropertyData(data))
  };

  const setRoomValue = (type, value) => {
    setRoomDetail(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  const addOrEditRoom = () => {
    if (!roomDetail.name) {
      Alert.alert('Error', 'Room Name is Required');
    } else if (!(roomDetail.length_in_feet > 0)) {
      Alert.alert('Error', 'Room Length is Required');
    } else if (!(roomDetail.width_in_feet > 0)) {
      Alert.alert('Error', 'Room Width is Required');
    } else if (!roomDetail.level) {
      Alert.alert('Error', 'Room Level is Required');
    } else {
      if (typeof roomDetail?.index == 'number') {
        // for edit
        const { index, ...room } = roomDetail
        setData(prev => {
          prev['rooms'][index] = { ...room }
          return { ...prev, rooms: [...prev.rooms] }
        })
      } else {
        // for add
        setData(prev => {
          prev['rooms'] = [{ ...roomDetail }, ...prev['rooms']]
          return { ...prev }
        })
      }
      setRoomDetail({ ...INITIAL_VALUE })
    }
  }

  const removeRoom = (item, index) => {
    setData(prev => {
      if (item?.id) {
        prev['rooms'][index] = { id: prev['rooms'][index]?.id, deleted: true }
        prev['rooms'] = [...prev['rooms']]
      } else {
        prev['rooms'] = prev['rooms'].filter((_, ind) => ind != index)
      }
      return { ...prev }
    })
  }
  const onEditRoom = (item, index) => {
    setRoomDetail({ ...item, index })
  }
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Add Room Details'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: WP(2) }}
        keyboardShouldPersistTaps={'handled'}>
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
          {(data.rooms?.filter(item => !item?.deleted)?.length < data.total_number_of_rooms ||
            typeof roomDetail?.index == 'number') &&
            <TouchableOpacity onPress={addOrEditRoom} >
              <Text style={styles.addBtn} >{typeof roomDetail?.index == 'number' ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
          }
          <RoomsBox data={data.rooms} onRemoveRoom={removeRoom} onEditRoom={onEditRoom} />
          <View style={[styles.spacRow, from == 'edit' && { justifyContent: 'flex-end' }]}>
            {from != 'edit' &&
              <AppButton
                width={'45%'}
                bgColor={colors.g21}
                title={'Save'}
                fontSize={size.tiny}
                borderColor={colors.g21}
                onPress={onSave}
                shadowColor={colors.white}
              />
            }
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