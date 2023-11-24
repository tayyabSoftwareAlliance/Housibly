import React, {useState} from 'react';
import {SafeAreaView, Text, View, Switch, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {AppHeader, BackHeader, Spacer} from '../../../../components';
import {colors, WP} from '../../../../shared/exporter';
import styles from './styles';

const Notifications = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Notifications'} />
      <BackHeader title={'Notifications'} />
      <Spacer androidVal={WP('8.2')} iOSVal={WP('8.2')} />
      <View style={styles.contentContainer}>
        <Text style={styles.descTxtStyle}>
          Control your notications depending on your prefereces.
        </Text>
        <Text style={styles.notifyTxtStyle}>Message Notification</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rowContainer}
          onPress={() => navigation.navigate('NewMessages')}>
          <Text style={styles.txtStyle}>New Messages</Text>
          <Icon
            type={'entypo'}
            name={'chevron-right'}
            size={22}
            color={colors.b2}
          />
        </TouchableOpacity>
        <Text style={styles.subTxtStyle}>
          If you disable this notification, you will not get notify when someone
          messages you.
        </Text>
        <Text style={styles.notifyTxtStyle}>Vibrations</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Enable App Vibrations</Text>
          <Switch
            trackColor={{false: colors.g1, true: colors.p1}}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
