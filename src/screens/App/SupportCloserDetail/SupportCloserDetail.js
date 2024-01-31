import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  FlatList,
  StatusBar,
  Linking,
} from 'react-native';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  ProfileField,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProfileRequest } from '../../../redux/actions';
import { HP, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, appIcons, appImages, colors, family, profile_uri, responseValidator, size, spacing } from '../../../shared/exporter';
import { Divider, Icon } from 'react-native-elements';
import Document from '../../../components/Custom/Document';
import { ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import Review from '../../../components/Custom/Review';
import { app } from '../../../shared/api';
import { extractFileType } from '../../../shared/utilities/helper';

const SupportCloserDetail = ({ navigation, route }) => {

  const id = route.params?.id
  const dispatch = useDispatch(null);
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFulldescription, setShowFullDescription] = useState(false)
  const isFocus = useIsFocused();

  const getReviews = async () => {
    const res = await app.getSupportCloserReviews(id, 'all', 1)
    if (res?.status == 200)
      setReviews(res.data)
  }

  const getUserProfile = async () => {
    setIsLoading(true)
    try {
      const res = await app.getOtherUserProfile(id)
      if (res?.status == 200) {
        setData(res.data)
        getReviews()
      }
    } catch (error) {
      console.log('error', error)
      let msg = responseValidator(error?.response?.status, error?.response?.data);
      Alert.alert('Error', msg || 'Something went wrong!');
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    isFocus && getUserProfile()
  }, [isFocus])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={'#F9FBFC'}
        barStyle={'dark-content'}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        <BackHeader
          title="Profile"
          txtCenter
          txtSize={size.xsmall}
          txtFamily={family.Gilroy_SemiBold}
        />
        <View style={styles.contentContainer}>
          <View style={spacing.pt8}>
            <TouchableOpacity
              onPress={() => navigation.navigate('PersonChat', { from: 'not_chats', recipient_id: data?.id, avatar: data?.avatar, full_name: data?.full_name })}
              style={styles.iconCon}>
              <Image style={styles.iconStyle} source={appIcons.chat} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${data?.phone_number}`)}
              style={[styles.iconCon, { top: 60 }]}>
              <Image style={styles.iconStyle} source={appIcons.phone} resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.imgStyle}
                source={{ uri: data?.avatar || profile_uri }}
              />
            </View>
            <Text style={styles.h1}>{data?.full_name || 'N/A'}</Text>
            <Text style={styles.subtitle}>{'Company abc'}</Text>
          </View>
          <View style={styles.ratingContainer} >
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('EditProfile', { item: data });
              }}
              style={styles.ratingIconCon}>
              <Image style={styles.ratingIconStyle} source={appIcons.starIcon} />
            </TouchableOpacity>
            <View >
              <Text style={styles.ratingText} >Rating</Text>
              <Text style={styles.ratingNumber}>{data?.average_rating || 0}</Text>
            </View>
          </View>
          <View style={spacing.mt6}>
            <Text style={styles.desc}>
              {showFulldescription ? (data?.description || 'Describe something') : (data?.description?.slice(0, 270) || 'N/A')}
              {data?.description?.length > 270 &&
                <TouchableWithoutFeedback onPress={() => setShowFullDescription(!showFulldescription)} >
                  {!showFulldescription ?
                    <Text style={styles.moreText}> More...</Text> :
                    <Text style={styles.moreText}> Less</Text>
                  }
                </TouchableWithoutFeedback>
              }
            </Text>
          </View>
          <Divider style={spacing.my6} color={colors.g18} />
          <View>
            <ProfileField
              title={'Profession'}
              subtitle={data?.professions?.map(item => item?.title).join(', ') || 'N/A'}
              containerStyle={{ marginTop: 0 }}
            />
            <ProfileField
              title={'Email Address'}
              subtitle={data?.email || 'email-address'}
            />
            <ProfileField
              title={'Phone Number'}
              subtitle={`+${data?.country_code || ''}${data?.phone_number || ''}`}
              containerStyle={{ marginBottom: 0 }}
            />
          </View>
          <Divider style={spacing.my6} color={colors.g18} />
          <View >
            <Text style={styles.subHeading} >Uploaded Photos</Text>
            <View style={styles.photoContainer} >
              {
                data?.images?.map(item => {
                  return (
                    <Image key={item?.id} style={styles.photo} source={{ uri: item?.url }} />
                  )
                })
              }
            </View>
          </View>
          <View style={spacing.mt6} >
            <Text style={styles.subHeading} >Uploaded Documents</Text>
            {data?.certificates?.map(item => {
              const type = extractFileType(item.url)
              const data = {
                name: 'Certificate',
                size: item.size,
                type
              }
              return (
                <Document
                  key={item?.id}
                  data={data}
                />
              )
            })}
          </View>
        </View>
        <View style={styles.peoplesContainer} >
          <View style={styles.reviewsTitleContainer} >
            <Text style={styles.peoplesContainerTitle} >Your Reviews ({reviews?.count || 0})</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={data?.average_rating || 0}
              fullStarColor={'#FFC107'}
              emptyStarColor={'#ccc'}
              // selectedStar={(rating) => { }}
              starSize={20}
            />
          </View>
          <FlatList
            data={reviews?.reviews || []}
            keyExtractor={(_, index) => index}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Review data={item} short containerStyle={index == 0 && { marginTop: 0 }} />
            )}
            contentContainerStyle={{ marginTop: 24 }}
          />
          <AppButton
            width={'43%'}
            borderColor={colors.p2}
            title="View all Reviews"
            textStyle={{ fontSize: size.tiny }}
            onPress={() => navigation.navigate('Reviews', { id, full_name: data?.full_name, avatar: data?.avatar })}
          />
        </View>
      </ScrollView>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default SupportCloserDetail