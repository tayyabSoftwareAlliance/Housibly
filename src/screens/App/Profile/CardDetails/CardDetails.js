import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  DelPaymentCard,
  Spacer,
} from '../../../../components';
import {delete_card_request} from '../../../../redux/actions';
import {
  appIcons,
  appImages,
  appLogos,
  checkBrand,
  checkConnected,
  colors,
  networkText,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';

const CardDetails = ({navigation, route}) => {
  const {card_detail} = route?.params;
  const [method, setMethod] = useState('cards');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch(null);

  const RenderRow = ({title, value}) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>{title}</Text>
        <Text style={styles.valueTxtStyle}>{value}</Text>
      </View>
    );
  };
  //Delete Card
  const deleteCard = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShow(false);
        setLoading(false);
        navigation?.goBack();
        console.log('On DEL Card Success');
      };
      const onFailure = res => {
        console.log(res);
        setShow(false);
        setLoading(false);
        Alert.alert('Error', res || 'Unable to Delete Card');
        console.log('On DEL Card Failure', res);
      };
      const requestBody = {
        'payment[id]': card_detail?.card?.id,
      };
      dispatch(delete_card_request(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Credit Card Details'} />
      <BackHeader
        isBox={true}
        title={'Credit Card Details'}
        boxIcon={
          <Icon
            name={'dots-three-horizontal'}
            type={'entypo'}
            size={18}
            color={colors.white}
          />
        }
        onPressRight={() => {
          setShow(true);
        }}
      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="contain"
          source={appImages.cardBg}
          style={styles.bgImgStyle}>
          <View style={styles.imgView}>
            <View>
              <Image
                resizeMode="contain"
                source={checkBrand(card_detail?.card?.brand)}
                style={styles.iconStyle}
              />
              {/* <Text style={styles.catTxtStyle}>Platinum</Text> */}
            </View>
            <Text
              style={
                styles.numTxtStyle
              }>{`• • • • ${card_detail?.card?.last4}`}</Text>
          </View>
        </ImageBackground>
        <RenderRow
          title="Card Holder Name"
          value={card_detail?.card?.name || 'name'}
        />
        <RenderRow title="Ending in" value={card_detail?.card?.last4} />
        <RenderRow
          title="Expiry"
          value={`${card_detail?.card?.exp_month}/${card_detail?.card?.exp_year}`}
        />
        {/* <RenderRow
          title="Card Holder Address"
          value="31901 Thornridge Cir. Shiloh, Hawaii 81063"
        /> */}
        <Text style={styles.transTxtStyle}>Last Transactions</Text>
        <View style={styles.itemContainer}>
          <View style={styles.row}>
            <View style={styles.logoContainer}>
              <Image source={appLogos.appLogo} style={styles.imgStyle} />
            </View>
            <View>
              <Text style={styles.txtStyle}>Housibly</Text>
              <Text style={styles.timeTxtStyle}>2 hr ago</Text>
            </View>
          </View>
          <Text style={styles.valTxtStyle}>$100.00</Text>
        </View>
        <Spacer androidVal={WP('5.5')} iOSVal={WP('5.5')} />
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <AppButton
          title="Proceed"
          onPress={() => {
            alert('Coming Soon');
          }}
          borderColor={colors.white}
          shadowColor={colors.white}
        />
      </View>
      <DelPaymentCard
        show={show}
        onPressHide={() => {
          setShow(false);
        }}
        onPress={() => {
          deleteCard();
        }}
        expiry_date={card_detail?.card?.last4}
        brand={checkBrand(card_detail?.card?.brand)}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default CardDetails;
