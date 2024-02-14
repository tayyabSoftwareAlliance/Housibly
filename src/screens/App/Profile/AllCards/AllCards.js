import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
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
  responseValidator,
  WP,
} from '../../../../shared/exporter';
import styles from './styles';
import {
  get_default_card_request,
  get_payment_cards_request,
  delete_card_request,
  default_card_request,
} from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/core';
import { app } from '../../../../shared/api';
const AllCards = ({ navigation }) => {
  const [method, setMethod] = useState('cards');
  const [delShow, setDelShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [defaultLoading, setDefaultLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const { payment_card_list } = useSelector(state => state?.settings);
  const [currentCard, setcurrentCard] = useState(null);
  const [currentIndex, setcurrentIndex] = useState(0);

  const dispatch = useDispatch(null);
  const isFocus = useIsFocused(null);
  const modalRef = useRef(null);

  //Get Cards
  const getCards = async () => {
    try {
      setLoading(true)
      const isConnected = await checkConnected();
      if (isConnected) {
        const res = await app.getAllCards()
        console.log('ressss', res.data)
        if (res.status == 200) {
          setCards(res.data || [])
        }
      } else {
        Alert.alert('Error', networkText);
      }
    } catch (error) {
      console.log('errorrr', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    isFocus && getCards()
  }, [isFocus])

  //Delete Card
  const deleteCard = async () => {
    try {
      setDelLoading(true)
      const isConnected = await checkConnected();
      if (isConnected) {
        const res = await app.deleteCard(currentCard?.id)
        if (res.status == 200) {
          setCards(prev => prev.filter(item => item.id != currentCard?.id))
          setDelShow(false)
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

  //On Set Default Card
  const onDafultCardHandler = async (item, index) => {
    try {
      setDefaultLoading(true)
      const isConnected = await checkConnected();
      if (isConnected) {
        const res = await app.setDefaultCard(currentCard?.id)
        if (res.status == 200) {
          console.log('ress', res.data)
          Alert.alert('Success', 'Card successfully set as default!');
        }
      } else {
        Alert.alert('Error', networkText);
      }
    }
    catch (error) {
      console.log('error ', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setDefaultLoading(false)
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('CardDetails', { id: item?.id })}>
        <View style={styles.row}>
          <View>
            <Text style={styles.titleTxtStyle}>
              {capitalizeFirstLetter(item?.name)}
            </Text>
            <Text
              style={
                styles.valTxtStyle
              }>{`**** **** **** ${item?.last4}`}</Text>
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
          source={checkBrand(item?.brand)}
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
      <View style={{ marginBottom: 50, flex: 1 }}>
        {cards.length > 0 ?
          <FlatList
            data={cards}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={(item, index) => item + index.toString()}
          /> :
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text style={styles.noData} >No Cards Found Yet!</Text>
          </View>
        }
      </View>
      {/* <View style={styles.bottomView}>
        <AppButton
          title="Continue"
          onPress={() => { }}
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
        expiry_date={currentCard?.last4}
        brand={checkBrand(currentCard?.brand)}
        loading={delLoading}
      />
      <CardOptionModal
        onPressRemove={() => {
          modalRef.current.close();
          setTimeout(() => {
            setDelShow(true);
          }, 1000);
        }}
        // onPressEdit={() => {
        //   navigation?.navigate('EditCard', {
        //     card_detail: currentCard,
        //   });
        //   modalRef.current.close();
        // }}
        onPressDefault={() => {
          modalRef.current.close()
          setTimeout(onDafultCardHandler, 1000)
        }}
        modalRef={modalRef}
      />
      <AppLoader loading={!(cards.length > 0) && loading} />
      <AppLoader loading={defaultLoading} />
    </SafeAreaView>
  );
};

export default AllCards;
