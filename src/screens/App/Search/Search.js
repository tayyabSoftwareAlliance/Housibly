import React, { useEffect } from 'react';
import { Text, SafeAreaView, StatusBar } from 'react-native';
import { AppHeader, MapComponent, Spacer } from '../../../components';
import { WP } from '../../../shared/exporter';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

const Search = () => {

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused)
      StatusBar.setHidden(true)
    else
      StatusBar.setHidden(false)
  }, [isFocused])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <MapComponent />
    </SafeAreaView>
  );
};

export default Search