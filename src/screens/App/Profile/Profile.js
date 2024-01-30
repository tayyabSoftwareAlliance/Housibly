import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import {
  AppLoader,
  BackHeader,
  ProfileField,
} from '../../../components';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getProfileRequest} from '../../../redux/actions';
import {appIcons, colors, profile_uri, spacing} from '../../../shared/exporter';
import {Divider, Icon} from 'react-native-elements';

const Profile = ({navigation}) => {
  const dispatch = useDispatch(null);
  const [data, setData] = useState([]);
  const [userImage, setUserImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFocus = useIsFocused(null);

  useEffect(() => {
    getUserProfile();
  }, [isFocus, navigation]);

  const getUserProfile = () => {
    setIsLoading(true);
    const getProfileSuccess = async res => {
      setData(res);
      setUserImage(res?.avatar);
      setIsLoading(false);
    };
    const getProfileFailure = async err => {
      console.log('Err is ==> ', err);
      Alert.alert('Error', err);
      setIsLoading(false);
    };
    dispatch(getProfileRequest(getProfileSuccess, getProfileFailure));
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      {/* <AppLoader loading={isLoading} /> */}
      <View style={spacing.my2}>
        <BackHeader
          subtitle={'Your Profile'}
          rightIcon={
            <Icon
              type={'ionicons'}
              name={'settings'}
              onPress={() => {
                navigation?.navigate('Settings');
              }}
            />
          }
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={spacing.py4}>
          <View style={styles.imgCon}>
            <Image
              style={styles.imgStyle}
              source={{uri: userImage === '' ? profile_uri : userImage}}
            />
          </View>
          <Text style={styles.h1}>{data?.full_name}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditProfile', {item: data});
            }}
            style={styles.iconCon}>
            <Image style={styles.iconStyle} source={appIcons.bgPencil} />
          </TouchableOpacity>
        </View>
        <View style={spacing.my4}>
          <Text style={styles.desc}>
            {data?.description || 'Describe something'}
          </Text>
        </View>
        <Divider color={colors.g18} />
        <View style={spacing.py4}>
          <ProfileField
            title={'Email Address'}
            subtitle={data?.email || 'email-address'}
          />
          <ProfileField
            title={'Phone Number'}
            subtitle={`+${data?.country_code || ''}${data?.phone_number || ''}`}
          />
        </View>
      </View>
      <AppLoader loading={isLoading} />
    </SafeAreaView>
  );
};

export default Profile;
