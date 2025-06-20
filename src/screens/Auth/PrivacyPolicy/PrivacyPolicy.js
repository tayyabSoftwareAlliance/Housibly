import React from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import { AppButton, AppHeader, BackHeader, Spacer } from '../../../components';
import { WP } from '../../../shared/exporter';
import { privacyPolicy } from '../../../shared/utilities/constant';
import styles from './styles';

const PrivacyPolicy = ({ navigation }) => {
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <Text style={styles.quesTxtStyle}>{item.ques}</Text>
        <Text style={styles.ansTxtStyle}>{item.ans}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader />
      <Spacer androidVal={WP('4')} iOSVal={WP('4')} />
      <BackHeader title="Privacy" />
      <FlatList
        data={privacyPolicy}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flStyle}
        keyExtractor={(item, index) => (item + index).toString()}
      />
      <View style={styles.btnContainer}>
        <AppButton
          title="Continue"
          onPress={() => {
            navigation.navigate('TermsConditions')
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
