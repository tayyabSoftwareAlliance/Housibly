import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  CardOptionModal,
  DelPaymentCard,
  Spacer,
} from '../../../../components';
import {
  appIcons,
  capitalizeFirstLetter,
  checkBrand,
  checkConnected,
  colors,
  networkText,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';
import {
  get_default_card_request,
  get_payment_cards_request,
  delete_card_request,
  default_card_request,
} from '../../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/core';
const AllCards = ({navigation}) => {
  const [method, setMethod] = useState('cards');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const {payment_card_list} = useSelector(state => state?.settings);
  const [currentCard, setcurrentCard] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(0);

  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);
  const modalRef = useRef(null);
  useEffect(() => {
    getCards();
  }, [isFocus]);

  //Get Cards
  const getCards = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setLoading(false);
        console.log('On Get Card Success');
        setLoading(false);
      };
      const onFailure = res => {
        setLoading(false);
        Alert.alert('Error', res);
        console.log('On Get Card Failure', res);
        setLoading(false);
      };
      dispatch(get_payment_cards_request(onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //Delete Card
  const deleteCard = async () => {
    const isConnected = await checkConnected();
    if (isConnected) {
      setLoading(true);
      const onSuccess = res => {
        setShow(false);
        setLoading(false);
        console.log('On DEL Card Success', res);
        getCards();
      };
      const onFailure = res => {
        console.log(res);
        setShow(false);
        setLoading(false);
        Alert.alert('Error', res || 'Unable to Delete Card');
        console.log('On DEL Card Failure', res);
      };
      const requestBody = {
        'payment[id]': currentCard?.card?.id,
      };
      dispatch(delete_card_request(requestBody, onSuccess, onFailure));
    } else {
      Alert.alert('Error', networkText);
    }
  };

  //On Set Default Card
  const onDafultCardHandler = (item, index) => {
    const requestBody = {
      card: currentCard,
      id: currentIndex,
    };
    const onSuccess = res => {
      console.log('On Default Card Success');
      modalRef.current.close();
    };
    const onFailure = res => {
      Alert.alert('Error', res);
      console.log('On Default Card Failure', res);
    };
    dispatch(default_card_request(requestBody, onSuccess, onFailure));
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('CardDetails', {card_detail: item})}>
        <View style={styles.row}>
          <View>
            <Text style={styles.titleTxtStyle}>
              {capitalizeFirstLetter(item?.card?.name)}
            </Text>
            <Text
              style={
                styles.valTxtStyle
              }>{`**** **** **** ${item?.card?.last4}`}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setcurrentCard(item);
              setcurrentIndex(index);
              modalRef?.current?.open();
            }}
            activeOpacity={0.7}
            style={styles.boxStyle}>
            <Icon
              type={'entypo'}
              name={'dots-three-horizontal'}
              size={22}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <Image
          resizeMode="contain"
          source={checkBrand(item?.card?.brand)}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Manage Cards'} />
      <BackHeader
        onPressRight={() => {
          navigation?.navigate('AddCard');
        }}
        isBox={true}
        title={'Manage Cards'}
        boxIcon={
          <Icon name={'plus'} type={'entypo'} size={22} color={colors.white} />
        }
      />

      <Spacer androidVal={WP('5.5')} iOSVal={WP('5.5')} />
      <View style={{marginBottom: 50, flex: 1}}>
        <FlatList
          data={payment_card_list}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, index) => item + index.toString()}
        />
      </View>
      <View style={styles.bottomView}>
        <AppButton
          title="Continue"
          onPress={() => {}}
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
        expiry_date={currentCard?.card?.last4}
        brand={checkBrand(currentCard?.card?.brand)}
      />
      <CardOptionModal
        onPressRemove={() => {
          modalRef.current.close();
          setTimeout(() => {
            setShow(true);
          }, 500);
        }}
        onPressEdit={() => {
          navigation?.navigate('EditCard', {
            card_detail: currentCard,
          });
          modalRef.current.close();
        }}
        onPressDefault={() => {
          onDafultCardHandler();
        }}
        modalRef={modalRef}
      />
      <AppLoader loading={loading} />
    </SafeAreaView>
  );
};

export default AllCards;
