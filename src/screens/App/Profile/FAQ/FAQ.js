import React from 'react';
import {SafeAreaView, Text, View, ScrollView} from 'react-native';
import {AppHeader, BackHeader} from '../../../../components';
import styles from './styles';

const FAQ = () => {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'FAQ'} />
      <BackHeader title={'FAQ'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.titleTxtStyle}>Welcome to housibly!</Text>
          <Text style={styles.valuesTxtStyle}>
            The following organizations may link to our Website without prior
            written approval:{'\n'}
            {'\n'}• {'  '}Government agencies;{'\n•   '}Search engines;{' '}
            {'\n•   '}News organizations;{'\n•   '}Online directory distributors
            may link to our Website in the same manner as they hyperlink to the
            Websites of other listed businesses; and{'\n•   '}
            System wide Accredited Businesses except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups which may not hyperlink to our Web site.{'\n'}
            {'\n'}These organizations may link to our home page, to publications
            or to other Website information so long as the link: (a) is not in
            any way deceptive; (b) does not falsely imply sponsorship,
            endorsement or approval of the linking party and its products and/or
            services; and (c) fits within the context of the linking party’s
            site.{'\n'}
            {'\n'}We may consider and approve other link requests from the
            following types of organizations:
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;
