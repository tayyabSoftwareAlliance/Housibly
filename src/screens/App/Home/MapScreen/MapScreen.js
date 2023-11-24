import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BackHeader, MapComponent} from '../../../../components';
import styles from './styles';
import {colors} from '../../../../shared/exporter';

const MapScreen = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.headerStyle}>
        <BackHeader tintColor={colors.white} />
      </View>
      <MapComponent />
    </SafeAreaView>
  );
};

export default MapScreen;