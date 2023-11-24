import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import {AppHeader, BackHeader} from '../../../../components';
import styles from './styles';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Privacy Policy'} />
      <BackHeader title={'Privacy Policy'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleTxtStyle}>Welcome to housibly!</Text>
          <Text style={styles.valuesTxtStyle}>
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </Text>
          <Text style={styles.titleTxtStyle}>Please read Privacy Policy</Text>
          <Text style={styles.valuesTxtStyle}>
            Reservation of Rights{'\n'}
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amen these terms and conditions and it’s linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </Text>
          <Text style={styles.titleTxtStyle}>Please read Privacy Policy</Text>
          <Text style={styles.valuesTxtStyle}>
            Removal of links from our website If you find any link on our
            Website that is offensive for any reason, you are free to contact
            and inform us any moment. We will consider requests to remove links.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
