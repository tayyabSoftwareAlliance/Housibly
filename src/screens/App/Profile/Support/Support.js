import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppButton, AppHeader, AppLoader, BackHeader } from '../../../../components';
import { WP, appLogos, capitalizeFirstLetter, colors, family, responseValidator, size } from '../../../../shared/exporter';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native'
import { app } from '../../../../shared/api';
import moment from 'moment';

const Support = ({ navigation }) => {

  const [tickets, setTickets] = useState([]);
  const [loader, setLoader] = useState(false)
  const isFocused = useIsFocused()

  const fetchData = async () => {
    try {
      setLoader(true)
      const res = await app.getSupportTickets()
      if (res?.status == 200) {
        console.log('resssss', res.data)
        setTickets(res.data?.tickets || [])
      }
    } catch (error) {
      console.log('error', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    isFocused && fetchData()
  }, [isFocused])

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('SupportChat', { conversation_id: item?.ticket?.id })}>
        <Image source={appLogos.supportLogo} style={styles.imgStyle} />
        <View style={{ flex: 1 }}>
          <View style={styles.reviewRow}>
            <Text style={styles.dateTxtStyle}>{moment(item?.ticket?.created_at).format('DD/MM/YYYY')}</Text>
            <Text style={styles.statusTxtStyle(item?.ticket?.status)}>
              {capitalizeFirstLetter(item?.ticket?.status)}
            </Text>
          </View>
          <Text style={styles.numTxtStyle}>{item?.ticket?.ticket_number}</Text>
          <Text numberOfLines={2} style={styles.infoTxtStyle}>
            {item?.ticket?.description || 'N/A'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Support'} />
      <BackHeader title={'Support'} />
      <View style={styles.contentContainer}>
        {tickets?.length > 0 ? (
          <FlatList
            data={tickets}
            renderItem={renderItem}
            keyExtractor={(item) => item?.ticket?.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ marginTop: WP('5') }}
          />
        ) : (
          <View style={styles.noRecordsView}>
            <Text style={styles.noRecords} >No Queries Found Yet!</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomView}>
        <AppButton
          title="Send New Message"
          onPress={() => navigation.navigate('SupportQuery')}
          shadowColor={colors.white}
          borderColor={colors.white}
          fontSize={size.tiny}
        />
      </View>
      <AppLoader loading={loader} />
    </SafeAreaView>
  );
};

export default Support;
