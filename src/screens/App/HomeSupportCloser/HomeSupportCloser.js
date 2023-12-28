import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';
import {
  AppHeader,
  AppLoader,
  BackHeader,
  ProfileField,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProfileRequest } from '../../../redux/actions';
import { HP, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, appIcons, appImages, colors, profile_uri, spacing } from '../../../shared/exporter';
import { Divider, Icon } from 'react-native-elements';
import Document from '../../../components/Custom/Document';
import { ScrollView } from 'react-native';
import { Rating } from 'react-native-ratings';

const HomeSupportCloser = ({ navigation }) => {

  const dispatch = useDispatch(null);
  const { userProfile } = useSelector(state => state?.settings);
  const { userInfo } = useSelector(state => state?.auth);
  const [data, setData] = useState([]);
  const [userImage, setUserImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFulldescription, setShowFullDescription] = useState(false)

  const isFocus = useIsFocused(null);

  useEffect(() => {
    getUserProfile();
  }, [isFocus, navigation]);

  const getUserProfile = () => {
    setIsLoading(true);
    const getProfileSuccess = async res => {
      setData(res?.user);
      setUserImage(res?.user?.image);
      setIsLoading(false);
    };
    const getProfileFailure = async err => {
      console.log('Err is ==> ', err);
      Alert.alert('Error', err);
      setIsLoading(false);
    };
    dispatch(getProfileRequest(getProfileSuccess, getProfileFailure));
  };

  const desc = 'fr furf ruf rfurb fjhr rhrtbfrutfbr ftugfb tugtb gbtiug trgtugbt gtgitbgtgbtgjktbgtj gtugbtgbtgibtgujt gtigb tgtbg tjgbtguitrbg rrufbgruivr frujfbr friofb jnribrk frifortbftf jkrjnfkj gtgitbgtgbtgjktbgtj gtugbtgbtgibtgujt gtigb tgtbg tjgbtguitrbg rrufbgruivr frujfbr friofb jnribrk frifortbftf jkrjnfkj gtgitbgtgbtgjktbgtj gtugbtgbtgibtgujt gtigb tgtbg tjgbtguitrbg rrufbgruivr frujfbr friofb jnribrk frifortbftf jkrjnfkj gtgitbgtgbtgjktbgtj gtugbtgbtgibtgujt gtigb tgtbg tjgbtguitrbg rrufbgruivr frujfbr friofb jnribrk frifortbftf jkrjnfkj gtgitbgtgbtgjktbgtj gtugbtgbtgibtgujt gtigb tgtbg tjgbtguitrbg rrufbgruivr frujfbr friofb jnribrk frifortbftf jkrjnfkj erfriofb f4foirbfkr f5oifb rfrfibf 5ifnri jfrfirubf rkjfb4rfkrnf 5f5fb4 5kfrnbfi krf5fb'

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
        <AppHeader
          onPressIcon={() => {
            navigation.navigate('Profile');
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
                // navigation.navigate('EditProfile', { item: data });
              }}
              style={styles.iconCon}>
              <Image style={styles.iconStyle} source={appIcons.bgPencil} />
            </TouchableOpacity>
          </View>
          <View style={spacing.pt4}>
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('EditProfile', { item: data });
              }}
              style={styles.startIconCon}>
              <Image style={styles.iconStyle} source={appIcons.starWithLinesIcon} />
            </TouchableOpacity>
            <View style={styles.imgCon}>
              <Image
                style={styles.imgStyle}
                source={{ uri: userImage === '' ? profile_uri : userImage }}
              />
            </View>
            <Text style={styles.h1}>{data?.full_name}</Text>
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
              <Text style={styles.ratingNumber}>5</Text>
            </View>
          </View>
          <View style={spacing.mt6}>
            <Text style={styles.desc}>
              {showFulldescription ? (desc || 'Describe something') : desc.slice(0, 270)}
              {desc?.length > 270 &&
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
              subtitle={data?.email || 'email-address'}
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
                [1, 2, 3, 4, 5, 6].map((item, index) => {
                  return (
                    <Image style={styles.photo} source={appImages.avatar} />
                  )
                })
              }
            </View>
          </View>
          <View style={spacing.mt6} >
            <Text style={styles.subHeading} >Uploaded Documents</Text>
            <Document
              data={{ name: 'my_pdf.pdf', size: '1.2', type: 'pdf' }}
            />
          </View>
        </View>
        <View style={styles.peoplesContainer} >
          <Text style={styles.peoplesContainerTitle} >Who Viewed Your Profile?</Text>
          <View style={styles.peoplesImagesContainer} >
            {
              [1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <Image style={styles.peoplesImage} source={appImages.avatar} />
                )
              })
            }
          </View>
        </View>
        <View style={styles.peoplesContainer} >
          <View style={styles.reviewsTitleContainer} >
            <Text style={styles.peoplesContainerTitle} >Your Reviews (43)</Text>
            <Rating
              onFinishRating={() => {}}
            />
          </View>
          <View style={styles.peoplesImagesContainer} >
            {
              [1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <Image style={styles.peoplesImage} source={appImages.avatar} />
                )
              })
            }
          </View>
        </View>
        <View style={{ height: PADDING_BOTTOM_FOR_TAB_BAR_SCREENS + HP(5) }} />
      </ScrollView>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default HomeSupportCloser