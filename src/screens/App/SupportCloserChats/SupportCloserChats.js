import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styles from './styles';
import {
  BackHeader,
} from '../../../components';
import AllChats from '../AllChats';
import { colors, spacing } from '../../../shared/exporter';

const SupportCloserChats = ({ navigation }) => {

return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
       <View style={spacing.my2}>
        <BackHeader subtitle={'Messages'} hideBackButton={true} />
      </View>
      <AllChats/>
    </SafeAreaView>
  );
};

export default SupportCloserChats