import { Alert, Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppButton, BackHeader } from '../../../../components';
import { colors, size, spacing, WP } from '../../../../shared/exporter';
import Textarea from 'react-native-textarea';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { saveCreatePropertyData } from '../../../../redux/actions';
import { useIsFocused } from '@react-navigation/native'

const AddpropertyDesc = ({ navigation, route }) => {

  const { propertyData, from } = route.params
  const { saved_create_property_data } = useSelector(state => state?.appReducer)
  const [data, setData] = useState(JSON.parse(JSON.stringify(propertyData)))
  const isFocused = useIsFocused()
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused && saved_create_property_data && from != 'edit')
      setData(JSON.parse(JSON.stringify(saved_create_property_data)))
  }, [saved_create_property_data])

  const onNext = async () => {
    Keyboard.dismiss()
    // if (!data.property_description) {
    //   Alert.alert('Error', 'Description is Required');
    // } else {
    if (data.property_type == 'vacant_land') {
      navigation.navigate('PropertyDetail', { propertyData: data, id: data?.id, from });
    } else {
      navigation.navigate('AddRoom', { propertyData: data, from });
    }
    // }
  }

  const onSave = async () => {
    dispatch(saveCreatePropertyData(data));
  }

  const setValue = (type, value) => {
    setData(prev => {
      prev[type] = value
      return { ...prev }
    })
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Add Details'} />
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.inputCon}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.contentContainer}>
          <Divider color={colors.g18} />
          <Textarea
            containerStyle={[styles.textareaContainer]}
            style={styles.textarea}
            placeholder={'Property description'}
            placeholderTextColor={colors.g19}
            underlineColorAndroid={'transparent'}
            value={data.property_description}
            onChangeText={text => setValue('property_description', text)}
          />
          {data.property_type != 'vacant_land' && (
            <>
              <Divider color={colors.g18} />
              <Textarea
                containerStyle={[styles.textareaContainer]}
                style={styles.textarea}
                placeholder={'Appliances & Other Items'}
                placeholderTextColor={colors.g19}
                underlineColorAndroid={'transparent'}
                value={data.appliances_and_other_items}
                onChangeText={text => setValue('appliances_and_other_items', text)}
              />
            </>
          )}
        </View>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddpropertyDesc;
