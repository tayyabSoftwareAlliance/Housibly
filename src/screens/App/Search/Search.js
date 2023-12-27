import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {AppHeader, MapComponent, Spacer} from '../../../components';
import {WP} from '../../../shared/exporter';
import styles from './styles';

const Search = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <MapComponent />
    </SafeAreaView>
  );
};

export default Search