import React, { useState } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import {
  AppButton,
  AppHeader,
  BackHeader,
  Spacer,
} from '../../../components';
import { appIcons, WP } from '../../../shared/exporter';
import styles from './styles';

const TermsConditions = ({ navigation }) => {

  const [isChecked, setIsChecked] = useState(false)

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <Spacer androidVal={WP('4')} iOSVal={WP('4')} />
      <BackHeader title="Terms & Conditions" />
      <ScrollView
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.quesTxtStyle}>Welcome to housibly!</Text>
        <Text style={styles.ansTxtStyle}>
          These terms and conditions outline the rules and regulations for the
          use of Housibly's Website, located at www.housibly.com. By accessing
          this website we assume you accept these terms and conditions. Do not
          continue to use housibly if you do not agree to take all of the terms
          and conditions stated on this page. The following terminology applies
          to these Terms and Conditions, Privacy Statement and Disclaimer Notice
          and all Agreements: "Client", "You" and "Your" refers to you, the
          person log on this website and compliant to the Company’s terms and
          conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
          to our Company. "Party", "Parties", or "Us", refers to both the Client
          and ourselves. All terms refer to the offer, acceptance and
          consideration of payment necessary to undertake the process of our
          assistance to the Client in the most appropriate manner for the
          express purpose of meeting the Client’s needs in respect of provision
          of the Company’s stated services, in accordance with and subject to,
          prevailing law of Netherlands. Any use of the above terminology or
          other words in the singular, plural, capitalization and/or he/she or
          they, are taken.
        </Text>
      </ScrollView>
      <View style={styles.rowContainer}>
        {/* <Image source={appIcons.box} style={styles.iconStyle} /> */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsChecked(prev => !prev)}>
          <Image
            source={isChecked ? appIcons.checkedBox : appIcons.box}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.agreeTxtStyle}>
          I agree to this Terms & Conditions
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          title="Continue"
          onPress={() => {
            if (isChecked) {
              setTimeout(() => {
                navigation.replace('App')
              }, 500)
            } else {
              Alert.alert('Alert', 'Please agree to Term & Conditions')
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default TermsConditions;
