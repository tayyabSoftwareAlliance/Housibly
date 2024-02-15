import React, { useMemo } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Text,
} from 'react-native';
import styles from './styles';
import {
  BackHeader,
} from '../../../components';
import { colors, spacing } from '../../../shared/exporter';
import Notifications from '../Notifications';
import { useSelector } from 'react-redux'

const SupportCloserNotifications = ({ navigation }) => {

  const { all_notifications } = useSelector(state => state?.notification);

  const unSeenNotificationCount = useMemo(() => {
    let count = all_notifications?.filter(item => !item.seen)?.length || 0
    count = count > 99 ? '99+' : count
    return count ? (
      <View style={styles.badge} >
        <Text style={styles.badgeTxt}>{count}</Text>
      </View>
    ) : null
  }, [all_notifications])

return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
       <View style={spacing.my2}>
        <BackHeader subtitle={'Notifications'} hideBackButton={true} rightIcon={unSeenNotificationCount} />
      </View>
      <Notifications/>
    </SafeAreaView>
  );
};

export default SupportCloserNotifications