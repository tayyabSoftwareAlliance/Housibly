import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  AppButton,
  BackHeader,
  FilterButton,
} from '../../../components';
import styles from './styles';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import {
  bath_list,
  beds_list,
  colors,
  lat_frontage_list,
  property_type_list,
  size,
  spacing,
  WP,
} from '../../../shared/exporter';

const SubFilterScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={spacing.my2}>
        <BackHeader subtitle={'Filter'} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputCon}>
          <Divider color={colors.g18} />
          <FilterButton onPress={() => {}} title={'Dream Address'} />
          <Divider color={colors.g18} />
        </View>
        <View style={styles.spacRow}>
          <AppButton
            width={'45%'}
            bgColor={colors.g21}
            title={'Save'}
            fontSize={size.tiny}
            borderColor={colors.g21}
            onPress={() => {
              navigation?.goBack();
            }}
            shadowColor={colors.white}
          />

          <AppButton
            onPress={() => {
              navigation?.goBack();
            }}
            width={'45%'}
            bgColor={colors.p2}
            title={'Done'}
            fontSize={size.tiny}
          />
        </View>
      </View>

      {/* Lat Frontage Modal */}
    </SafeAreaView>
  );
};

export default SubFilterScreen;
