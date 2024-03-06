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
  Pressable,
  StyleSheet,
  Platform,
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
import { HP, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, colors, family, profile_uri, size, spacing } from '../../../shared/exporter';
import { Divider, Icon } from 'react-native-elements';
import Document from '../../../components/Custom/Document';
import { ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import Review from '../../../components/Custom/Review';
import { extractFileType, formatNumber, requestNotificationPermission } from '../../../shared/utilities/helper';
import { app } from '../../../shared/api';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment';
// import { BlurView } from "@react-native-community/blur";
import { get_all_notifications } from '../../../redux/actions/notification-actions/notification-actions';

const VisitorDetailModal = ({ isVisible, data, onPressHide }) => {

  const [viewFull, setViewFull] = useState(false)
  const [viewFullDesc, setViewFullDesc] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    !isVisible && setViewFull(false)
  }, [isVisible])

  return (
    <Modal onBackdropPress={onPressHide} isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.crossIconView}
          onPress={() => onPressHide()}>
          <Image
            resizeMode="contain"
            source={appIcons.crossIcon}
            style={styles.crossIconStyle}
          />
        </TouchableOpacity>
        <Image source={{ uri: data?.avatar }} style={styles.imgStyle} />
        <Text style={styles.nameTxtStyle}>{data?.full_name || 'N/A'}</Text>
        {viewFull ?
          <>
            <View style={spacing.mt6}>
              <Text style={styles.desc}>
                {viewFullDesc ? (data?.description || 'Describe something') : (data?.description?.slice(0, 270) || 'N/A')}
                {data?.description?.length > 270 &&
                  <TouchableWithoutFeedback onPress={() => setViewFullDesc(!viewFullDesc)} >
                    {!viewFullDesc ?
                      <Text style={styles.moreText}> More...</Text> :
                      <Text style={styles.moreText}> Less</Text>
                    }
                  </TouchableWithoutFeedback>
                }
              </Text>
            </View>
            <Divider style={spacing.my3} color={colors.g18} />
            <View style={{ width: '100%', marginVertical: 10 }} >
              <Text style={{ color: colors.b1, fontSize: size.xsmall, fontFamily: family.Gilroy_Medium }}>Email Address</Text>
              <Text style={{ color: colors.g19, fontSize: size.xsmall, fontFamily: family.Gilroy_Medium }}>{data?.email || 'N/A'}</Text>
            </View>
            <View style={{ width: '100%', marginVertical: 10 }} >
              <Text style={{ color: colors.b1, fontSize: size.xsmall, fontFamily: family.Gilroy_Medium }}>Phone Number</Text>
              <Text style={{ color: colors.g19, fontSize: size.xsmall, fontFamily: family.Gilroy_Medium }}>{data?.phone_number || 'N/A'}</Text>
            </View>
          </> :
          <>
            <Text style={styles.subtitle}>Viewed Your Profile</Text>
            <Text style={styles.time}>{moment(data?.viewed_time).fromNow()}</Text>
          </>
        }
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={() => {
            if (viewFull) {
              navigation.navigate('PersonChat', { recipient_id: data?.id, avatar: data?.avatar, full_name: data?.full_name, from: 'not_chats' })
              onPressHide()
            } else
              setViewFull(true)
          }}>
          <Text style={styles.btnTxtStyle}>{viewFull ? 'Send Message' : 'View Full Profile'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const HomeSupportCloser = ({ navigation }) => {

  const dispatch = useDispatch(null);
  const { userProfile } = useSelector(state => state?.settings);
  const { userInfo } = useSelector(state => state?.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFulldescription, setShowFullDescription] = useState(false)
  const [reviews, setReviews] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [visitorDetailModal, setVisitorDetailModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const isFocus = useIsFocused(null);

  const getVisitors = async () => {
    const res = await app.getVisitors()
    if (res?.status == 200)
      setVisitors(res.data || [])
  }

  const getReviews = async () => {
    const res = await app.getSupportCloserReviews(userInfo?.id, 'all', 1)
    if (res?.status == 200)
      setReviews(res.data)
  }

  const getUserProfile = () => {
    setIsLoading(true);
    const getProfileSuccess = async res => {
      setData(res);
      getVisitors()
      getReviews()
      setIsLoading(false);
    };
    const getProfileFailure = async err => {
      console.log('Err is ==> ', err);
      Alert.alert('Error', err);
      setIsLoading(false);
    };
    dispatch(getProfileRequest(getProfileSuccess, getProfileFailure));
  };

  useEffect(() => {
    if (isFocus && userInfo)
      getUserProfile()
  }, [isFocus])

  useEffect(() => {
    if (userInfo) {
      setTimeout(requestNotificationPermission, 1000)
      dispatch(get_all_notifications())
    }
  }, [])

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={'#F9FBFC'}
        barStyle={'dark-content'}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        <AppHeader
          onPressIcon={() => {
            navigation.navigate('Settings');
          }}
          rightIcon
          from={'SUPPORT_CLOSER_HOME'}
          containerStyle={{ backgroundColor: '#F9FBFC' }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.headingContainer} >
            <Text style={styles.heading} >Your Profile</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfile', { item: data, from: 'SUPPORT_CLOSER_HOME' })
              }}
              style={styles.iconCon}>
              <Image style={styles.iconStyle} source={appIcons.bgPencil} />
            </TouchableOpacity>
          </View>
          <View style={spacing.pt4}>
            <TouchableOpacity
              onPress={() => navigation.navigate('BoostProfile')}
              style={styles.startIconCon}>
              <Image style={styles.iconStyle} source={appIcons.starWithLinesIcon} resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.imgStyle}
                source={{ uri: data?.avatar }}
              />
            </View>
            <Text style={styles.h1}>{data?.full_name}</Text>
            {/* <Text style={styles.subtitle}>{'Company abc'}</Text> */}
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
              <Text style={styles.ratingNumber}>{formatNumber(data?.average_rating) || 0}</Text>
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
              subtitle={data?.phone_number ? `+${data.country_code || ''}${data.phone_number || ''}` : 'N/A'}
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
          <Text style={styles.peoplesContainerTitle} >Who Viewed Your Profile?</Text>
          <View style={styles.peoplesImagesContainer} >
            <FlatList
              data={visitors}
              keyExtractor={(_, index) => index}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  disabled={!data?.is_subscribed}
                  onPress={() => {
                    setSelectedVisitor(item)
                    setVisitorDetailModal(true)
                  }}
                >
                  <Image
                    style={styles.peoplesImage}
                    source={{ uri: item.avatar }}
                    blurRadius={!data?.is_subscribed ? 30 : 0}
                  />
                </Pressable>
              )}
            />
            {/* {!data?.is_subscribed &&
              <BlurView
                style={{ ...StyleSheet.absoluteFill }}
                blurType="light"
                blurAmount={5}
              />
            } */}
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
            onPress={() => navigation.navigate('Reviews', { id: userInfo?.id, from: 'SUPPORT_CLOSER_HOME' })}
          />
        </View>
        {/* <View style={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS }} /> */}
      </ScrollView>
      <AppLoader loading={isLoading} />
      <VisitorDetailModal isVisible={visitorDetailModal} onPressHide={() => setVisitorDetailModal(false)} data={selectedVisitor} />
    </SafeAreaView>
  );
};

export default HomeSupportCloser