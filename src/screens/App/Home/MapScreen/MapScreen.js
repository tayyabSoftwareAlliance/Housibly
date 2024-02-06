import { SafeAreaView, StatusBar, View } from 'react-native';
import React, { useEffect } from 'react';
import { BackHeader, MapComponent } from '../../../../components';
import styles from './styles';
import { colors } from '../../../../shared/exporter';
import { useIsFocused } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapScreen = ({route}) => {

  const isFocused = useIsFocused()
  const {top} = useSafeAreaInsets()

  useEffect(() => {
    if (isFocused)
      StatusBar.setHidden(true)
    else
      StatusBar.setHidden(false)
    return () => StatusBar.setHidden(false)
  }, [isFocused])

  return (
    <View style={styles.rootContainer}>
      <View style={[styles.headerStyle,{paddingTop:top}]}>
        <BackHeader tintColor={colors.white} title={route.params?.savedLocation?.title} txtColor={colors.white} />
      </View>
      <MapComponent />
    </View>
  );
};

export default MapScreen;