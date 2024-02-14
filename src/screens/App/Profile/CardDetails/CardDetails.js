import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch } from 'react-redux';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  DelPaymentCard,
  Spacer,
} from '../../../../components';
import {
  appIcons,
  appImages,
  appLogos,
  capitalizeFirstLetter,
  checkBrand,
  checkConnected,
  colors,
  networkText,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';
import { app } from '../../../../shared/api';
import moment from 'moment';

const CardDetails = ({ navigation, route }) => {
  const { id } = route?.params;
  const [data, setData] = useState(null);
  const [delShow, setDelShow] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(null);

  const RenderRow = ({ title, value }) => {
    return (
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>{title}</Text>
        <Text style={styles.valueTxtStyle}>{value}</Text>
      </View>
    );
  };

  //Delete Card
  const deleteCard = async () => {
    try {
      setDelLoading(true)
      const isConnected = await checkConnected();
      if (isConnected) {
        const res = await app.deleteCard(id)
        if (res.status == 200) {
          setDelShow(false)
          navigation.goBack()
        }
      } else {
        Alert.alert('Error', networkText);
      }
    }
    catch (error) {
      // console.log('error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setDelLoading(false)
    }
  };

  const getCardDetail = async () => {
    try {
      setLoading(true)
      const isConnected = await checkConnected();
      if (isConnected) {
        const res = await app.getCardDetail(id)
        if (res.status == 200) {
          setData(res.data)
        }
      } else {
        Alert.alert('Error', networkText);
      }
    }
    catch (error) {
      // console.log('error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getCardDetail()
  }, [])

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
          setDelShow(true);
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
                source={checkBrand(data?.card?.brand)}
                style={styles.iconStyle}
              />
              {/* <Text style={styles.catTxtStyle}>Platinum</Text> */}
            </View>
            <Text
              style={
                styles.numTxtStyle
              }>{`• • • • ${data?.card?.last4 || ''}`}</Text>
          </View>
        </ImageBackground>
        <RenderRow
          title="Card Holder Name"
          value={capitalizeFirstLetter(data?.card?.name) || ''}
        />
        <RenderRow title="Ending in" value={data?.card?.last4} />
        <RenderRow
          title="Expiry"
          value={data?.card?.exp_month ? `${data?.card?.exp_month?.toString().padStart(2, '0')}/${data?.card?.exp_year}` : ''}
        />
        {/* <RenderRow
          title="Card Holder Address"
          value="31901 Thornridge Cir. Shiloh, Hawaii 81063"
        /> */}
        <Text style={styles.transTxtStyle}>Last Transactions</Text>
        {data?.transactions?.map(item => (
          <View style={styles.itemContainer}>
            <View style={styles.row}>
              <View style={styles.logoContainer}>
                <Image source={appLogos.appLogo} style={styles.imgStyle} />
              </View>
              <View>
                <Text style={styles.txtStyle}>Housibly</Text>
                <Text style={styles.timeTxtStyle}>{moment(item?.created_at).fromNow()}</Text>
              </View>
            </View>
            <Text style={styles.valTxtStyle}>{`${item.currency} ${item.amount}`}</Text>
          </View>
        ))}
        <Spacer androidVal={WP('5.5')} iOSVal={WP('5.5')} />
      </KeyboardAwareScrollView>
      {/* <View style={styles.bottomView}>
        <AppButton
          title="Proceed"
          onPress={() => {
            Alert.alert('Coming Soon');
          }}
          borderColor={colors.white}
          shadowColor={colors.white}
        />
      </View> */}
      <DelPaymentCard
        show={delShow}
        onPressHide={() => {
          setDelShow(false);
        }}
        onPress={deleteCard}
        expiry_date={data?.card?.last4}
        brand={checkBrand(data?.card?.brand)}
        loading={delLoading}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default CardDetails;
