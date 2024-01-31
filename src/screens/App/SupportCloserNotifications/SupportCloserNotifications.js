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
import { colors, spacing } from '../../../shared/exporter';
import Notifications from '../Notifications';

const SupportCloserNotifications = ({ navigation }) => {

return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
       <View style={spacing.my2}>
        <BackHeader subtitle={'Notifications'} hideBackButton={true} />
      </View>
      <Notifications/>
    </SafeAreaView>
  );
};

export default SupportCloserNotifications