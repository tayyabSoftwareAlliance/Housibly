import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {AppHeader, Spacer} from '../../../components';
import {WP} from '../../../shared/exporter';
import styles from './styles';

const Search = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <Spacer androidVal={WP('4')} iOSVal={WP('4')} />
      <Text style={styles.txtStyle}>Search</Text>
    </SafeAreaView>
  );
};

export default Search;
