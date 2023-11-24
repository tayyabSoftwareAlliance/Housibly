import React, {useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/core';
import {AppButton, BackHeader, Spacer} from '../../../../components';
import {
  appIcons,
  appImages,
  appLogos,
  colors,
  family,
  size,
  WP,
} from '../../../../shared/exporter';
import {
  condoDetails,
  homeDetails,
  landDetails,
} from '../../../../shared/utilities/constant';
import styles from './styles';

const PersonDetails = ({navigation, route}) => {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    return () => navigation.getParent()?.setOptions({tabBarStyle: undefined});
  }, [isFocus]);

  useLayoutEffect(() => {
    let type = route?.params?.itemType;
    if (type === 'House') {
      setData(homeDetails);
    } else if (type === 'Condo') {
      setData(condoDetails);
    } else {
      setData(landDetails);
    }
  }, []);

  const RenderDetails = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.detailsContainer}
        onPress={() => console.log('You touched me')}>
        <View style={styles.innerRow}>
          <Image source={appImages.person3} style={styles.imgStyle} />
          <View>
            <Text numberOfLines={2} style={styles.nameTxtStyle}>
              Aspen Franci
            </Text>
            <View style={styles.iconRow}>
              <Icon
                name={'heart'}
                type={'antdesign'}
                size={16}
                color={colors.r2}
                style={{marginRight: 5}}
              />
              <Text style={styles.matchTxtStyle}>95% match</Text>
            </View>
          </View>
        </View>
        <Image source={appLogos.roundLogo} style={styles.matchImgStyle} />
      </TouchableOpacity>
    );
  };

  const RenderRow = ({item, index}) => {
    return (
      <View style={styles.itemRow(index)}>
        <Text style={styles.titleTxtStyle}>{item?.title}</Text>
        <View style={styles.contentRow}>
          <Text style={styles.valTxtStyle}>{item?.property}</Text>
          <Image
            source={item?.isHave ? appIcons.checkIcon : appIcons.crossedIcon}
            style={styles.iconStyle}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar backgroundColor={colors.g5} />
      <Spacer androidVal={WP('5')} iOSVal={WP('0')} />
      <BackHeader
        title="Buyer’s Preference"
        txtCenter
        txtSize={size.xsmall}
        txtFamily={family.Gilroy_SemiBold}
      />
      <RenderDetails />
      <View style={styles.container}>
        <Text style={styles.headTxtStyle}>Preference</Text>
        {data?.map((item, index) => {
          return <RenderRow item={item} index={index} />;
        })}
      </View>
      <View style={styles.bottomView}>
        <AppButton
          width="38.5%"
          height={WP('10.3')}
          title="Send Message"
          borderColor={colors.p2}
          textStyle={styles.btnTxtStyle}
          onPress={() => navigation.navigate('PersonChat')}
        />
      </View>
    </SafeAreaView>
  );
};

export default PersonDetails;
