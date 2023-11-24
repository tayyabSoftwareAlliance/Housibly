import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {AppHeader, Spacer} from '../../../components';
import {WP} from '../../../shared/exporter';
import styles from './styles';

const Bookmarks = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <Spacer androidVal={WP('4')} iOSVal={WP('4')} />
      <Text style={styles.txtStyle}>Bookmarks</Text>
    </SafeAreaView>
  );
};

export default Bookmarks;
