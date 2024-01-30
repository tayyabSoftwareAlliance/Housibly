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

const AddReview = ({ navigation, route }) => {

  const { id, full_name } = route.params
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      <View style={styles.contentContainer}>
        <View style={spacing.pt8}>
          <View style={styles.imgCon}>
            <Image
              style={styles.imgStyle}
              source={{ uri: data?.avatar || profile_uri }}
            />
          </View>
          <Text style={styles.h1}>{full_name || 'N/A'}</Text>
        </View>
        <View style={styles.ratingContainer} >
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
        <AppButton
          width={'43%'}
          borderColor={colors.p2}
          title="View all Reviews"
          textStyle={{ fontSize: size.tiny }}
          onPress={() => navigation.navigate('Reviews', { id })}
        />
      </View>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default AddReview