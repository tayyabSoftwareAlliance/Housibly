import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppButton, AppHeader, BackHeader, Spacer} from '../../../../components';
import {get_default_card_request} from '../../../../redux/actions';
import {
  appIcons,
  checkConnected,
  colors,
  networkText,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';

const PayMethod = ({navigation}) => {
  const [method, setMethod] = useState('cards');
  const [loading, setLoading] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);

  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);

  useEffect(() => {
    if (isFocus) {
      getDefaultCard();
    }
  }, [isFocus]);

  //Get Default Card
  const getDefaultCard = async () => {
    const check = await checkConnected();
    if (check) {
      try {
        setLoading(true);
        const onSuccess = res => {
          setLoading(false);
          setcurrentCard(res);
          console.log('On Default Card Success', res);
        };
        const onFailure = res => {
          setLoading(false);
          Alert.alert('Error', res);
          console.log('On Default Card Failure', res);
        };
        dispatch(get_default_card_request(onSuccess, onFailure));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Payment Method'} />
      <BackHeader
        // isBox={true}
        title={'Payment Method'}
        // boxIcon={
        //   <Icon name={'plus'} type={'entypo'} size={22} color={colors.white} />
        // }
      />
      <Spacer androidVal={WP('5.5')} iOSVal={WP('5.5')} />
      <View style={styles.contentContainer}>
        <Text style={styles.descTxtStyle}>
          Please setup your paymant method to get better delivery service
        </Text>
        <Text style={styles.payTxtStyle}>Payment Methods</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.itemContainer}
          onPress={() => setMethod('cards')}>
          <View style={styles.innerRow}>
            <Image
              resizeMode="contain"
              source={appIcons.cards}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleTxtStyle}>Credit Card</Text>
              <Text style={styles.valTxtStyle}>
                {currentCard?.card?.last4
                  ? `**** **** **** ${currentCard?.card?.last4} ${currentCard?.card?.brand}`
                  : 'No card selected'}
              </Text>
            </View>
          </View>
          <Image
            resizeMode="contain"
            source={method === 'cards' ? appIcons.checked : appIcons.unchecked}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.itemContainer}
          onPress={() => setMethod('apple')}>
          <View style={styles.innerRow}>
            <Image
              resizeMode="contain"
              source={appIcons.apple}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleTxtStyle}>Apple Pay</Text>
              <Text style={styles.valTxtStyle}>myemail.com</Text>
            </View>
          </View>
          <Image
            resizeMode="contain"
            source={method === 'apple' ? appIcons.checked : appIcons.unchecked}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.itemContainer}
          onPress={() => setMethod('google')}>
          <View style={styles.innerRow}>
            <Image
              resizeMode="contain"
              source={appIcons.cards}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.titleTxtStyle}>Google Wallet</Text>
              <Text style={styles.valTxtStyle}>myemail.com</Text>
            </View>
          </View>
          <Image
            resizeMode="contain"
            source={method === 'google' ? appIcons.checked : appIcons.unchecked}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
      {method === 'cards' && (
        <View style={styles.bottomView}>
          <AppButton
            title="Continue"
            borderColor={colors.white}
            shadowColor={colors.white}
            onPress={() => navigation.navigate('AllCards')}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default PayMethod;
