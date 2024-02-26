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
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  ProfileField,
  TextBox,
} from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProfileRequest } from '../../../redux/actions';
import { HP, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS, WP, appIcons, appImages, colors, family, profile_uri, responseValidator, size, spacing } from '../../../shared/exporter';
import { Divider, Icon } from 'react-native-elements';
import Document from '../../../components/Custom/Document';
import { ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import Review from '../../../components/Custom/Review';
import { app } from '../../../shared/api';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const AddReview = ({ navigation, route }) => {

  const { id, full_name, avatar } = route.params
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('review[support_closer_id]', id)
      formData.append('review[rating]', rating)
      formData.append('review[description]', review)
      console.log('formmmm', formData)
      const res = await app.createReview(formData);
      console.log('resresresres', res?.data)
      if (res?.status == 200) {
        Alert.alert('Success','Review Posted Successfully!')
        setRating(0)
        setReview('')
        setTimeout(() => navigation.goBack(), 500)
      }
    } catch (error) {
      console.log(error);
      let msg = responseValidator(error?.response?.status, error?.response?.data);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.white}
        barStyle={'dark-content'}
      />
      <BackHeader
        title="Add Review"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.contentContainer}>
        <View style={spacing.pt8}>
          <View style={styles.imgCon}>
            <Image
              style={styles.imgStyle}
              source={{ uri: avatar || profile_uri }}
            />
          </View>
          <Text style={styles.h1}>{full_name || 'N/A'}</Text>
        </View>
        <View style={styles.ratingContainer} >
          <TextBox
            conStyle={spacing.px2}
            onChangeText={setReview}
            value={review}
            placeholder={'Type here'}
            height={300}
          />
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            fullStarColor={'#FFC107'}
            emptyStarColor={'#ccc'}
            selectedStar={setRating}
            starSize={30}
            containerStyle={{ width: '70%', alignSelf: 'center' }}
          />
        </View>
        <AppButton
          width={'43%'}
          borderColor={colors.p2}
          title="Post Review"
          textStyle={{ fontSize: size.tiny }}
          onPress={handleSubmit}
          buttonStyle={{ marginVertical: WP(5) }}
        />
      </KeyboardAwareScrollView>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default AddReview