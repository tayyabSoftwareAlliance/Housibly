import React, {useState} from 'react';
import {SafeAreaView, Text, View, Switch} from 'react-native';
import {AppHeader, BackHeader, Spacer} from '../../../../components';
import {colors, WP} from '../../../../shared/exporter';
import styles from './styles';

const NewMessages = ({navigation}) => {
  const [pushNotify, setPushNotify] = useState(false);
  const [inAppNotify, setInAppNotify] = useState(false);
  const [emailsNotify, setEmailsNotify] = useState(false);

  const togglePushNotify = () => {
    setPushNotify(previousState => !previousState);
  };

  const toggleInAppNotify = () => {
    setInAppNotify(previousState => !previousState);
  };

  const toggleEmailsNotify = () => {
    setEmailsNotify(previousState => !previousState);
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'New Messages'} />
      <BackHeader title={'New Messages'} />
      <Spacer androidVal={WP('8.2')} iOSVal={WP('8.2')} />
      <View style={styles.contentContainer}>
        <Text style={styles.descTxtStyle}>
          If you disable this notification, you will not get notify when someone
          messages you
        </Text>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Push Notifications</Text>
          <Switch
            value={pushNotify}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={togglePushNotify}
            trackColor={{false: colors.g1, true: colors.p1}}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>In-app Notifications</Text>
          <Switch
            value={inAppNotify}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={toggleInAppNotify}
            trackColor={{false: colors.g1, true: colors.p1}}
          />
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.txtStyle}>Emails</Text>
          <Switch
            value={emailsNotify}
            thumbColor={colors.white}
            ios_backgroundColor={colors.g4}
            onValueChange={toggleEmailsNotify}
            trackColor={{false: colors.g1, true: colors.p1}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewMessages;
