import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import RenderHtml from 'react-native-render-html';
import {AppHeader, BackHeader} from '../../../../components';
import {scrWidth} from '../../../../shared/exporter';
import styles from './styles';

const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
};

const Terms = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Terms & Conditions'} />
      <BackHeader title={'Terms & Conditions'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* <RenderHtml contentWidth={scrWidth} source={source} /> */}
          <Text style={styles.titleTxtStyle}>Welcome to housibly!</Text>
          <Text style={styles.valuesTxtStyle}>
            These terms and conditions outline the rules and regulations for the
            use of Housibly's Website, located at www.housibly.com.{'\n'}By
            accessing this website we assume you accept these terms and
            conditions. Do not continue to use housibly if you do not agree to
            take all of the terms and conditions stated on this page.{'\n'}The
            following terminology applies to these Terms and Conditions, Privacy
            Statement and Disclaimer Notice and all Agreements: "Client", "You"
            and "Your" refers to you, the person log on this website and
            compliant to the Company’s terms and conditions. "The Company",
            "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
            "Parties", or "Us", refers to both the Client and ourselves. All
            terms refer to the offer, acceptance and consideration of payment
            necessary to undertake the process of our assistance to the Client
            in the most appropriate manner for the express purpose of meeting
            the Client’s needs in respect of provision of the Company’s stated
            services, in accordance with and subject to, prevailing law of
            Netherlands. Any use of the above terminology or other words in the
            singular, plural, capitalization and/or he/she or they, are taken.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Terms;
