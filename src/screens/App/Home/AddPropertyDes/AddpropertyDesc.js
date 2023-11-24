import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
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

  const { add_property_detail } = useSelector(state => state?.appReducer)
  const [data, setData] = useState(JSON.parse(JSON.stringify(route.params)))
  const isFocused = useIsFocused()
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFocused && add_property_detail) {
      setData(JSON.parse(JSON.stringify(add_property_detail)))
    }
  }, [add_property_detail])

  const onNext = async () => {
    if (!data.desc) {
      Alert.alert('Error', 'Description is Required');
    } else {
      if (data.property_type?.title == 'Vacant Land') {
        navigation.navigate('PropertyDetail', data);
      } else {
        navigation.navigate('AddRoom', data);
      }
    }
  }

  const onSave = async () => {
    const onSuccess = res => {
      Alert.alert('Success', 'Information Saved Successfully');
    };
    dispatch(saveCreatePropertyData(data, onSuccess));
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
        contentContainerStyle={styles.inputCon}>
        <View style={styles.contentContainer}>
          <Divider color={colors.g18} />
          <Textarea
            containerStyle={[styles.textareaContainer]}
            style={styles.textarea}
            placeholder={'Property description'}
            placeholderTextColor={colors.g19}
            underlineColorAndroid={'transparent'}
            value={data.desc}
            onChangeText={text => setValue('desc', text)}
          />
          {data.property_type?.title != 'Vacant Land' && (
            <>
              <Divider color={colors.g18} />
              <Textarea
                containerStyle={[styles.textareaContainer]}
                style={styles.textarea}
                placeholder={'Appliances & Other Items'}
                placeholderTextColor={colors.g19}
                underlineColorAndroid={'transparent'}
                value={data.other_desc}
                onChangeText={text => setValue('other_desc', text)}
              />
            </>
          )}
        </View>
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AddpropertyDesc;
