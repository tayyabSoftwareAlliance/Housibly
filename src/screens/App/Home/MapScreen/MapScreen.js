import { SafeAreaView, StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { BackHeader, MapComponent } from '../../../../components';
import styles from './styles';
import { colors } from '../../../../shared/exporter';
import { useIsFocused } from '@react-navigation/native';

const MapScreen = () => {

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused)
      StatusBar.setHidden(true)
    else
      StatusBar.setHidden(false)
    return () => StatusBar.setHidden(false)
  }, [isFocused])

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