import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { AppButton, BackHeader, SignUpModal, Spacer } from '../../../components';
import { appIcons, appImages, colors, WP } from '../../../shared/exporter';
import styles from './styles';

const SignUpPurpose = ({ navigation, route }) => {
  const login_type = route.params?.login_type
  const [selected, setSelected] = useState('want_sell');
  const [show, setShow] = useState(false);
  const [showSlide, setShowSlide] = useState(0);

  const handleNavigation = (userType, licensed, contacted) => {
    if (login_type == 'social_login') {
      if (selected == 'support_closer') {
        navigation.navigate('AddSupportInfo', {
          profile_complete: false,
          regPurpose: selected,
        });
      } else {
        navigation.navigate('AddPersonalInfo', {
          profile_complete: false,
          regPurpose: selected,
          item: {
            userType,
            licensed,
            contacted,
          },
        });
      }
    } else {
      if (selected == 'support_closer') {
        navigation.navigate('SignUp', {
          regPurpose: selected,
        });
      } else {
        navigation.navigate('SignUp', {
          regPurpose: selected,
          item: {
            userType,
            licensed,
            contacted,
          },
        });
      }
    }
    setShowSlide(0);
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <ImageBackground source={appImages.homeImg} style={styles.bgImgStyle}>
        {navigation?.canGoBack() &&
          <TouchableOpacity
            onPress={() => {
              navigation?.goBack();
            }}
            style={styles.btnCon}>
            <Image
              resizeMode="contain"
              source={appIcons.backArrow}
              style={[styles.iconStyle1]}
            />
          </TouchableOpacity>
        }
        <Text style={styles.helloTxtStyle}>Hello, roberto</Text>
        <Text style={styles.chooseTxtStyle}>
          Choose, What do you want to do?{' '}
        </Text>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.btnsContainer}>
          <AppButton
            borderRadius={32}
            height={WP('16.4')}
            title="I want to Sell"
            icon={appIcons.sellHome}
            style={styles.iconStyle}
            borderColor={colors.white}
            shadowColor={colors.white}
            onPress={() => setSelected('want_sell')}
            bgColor={selected === 'want_sell' ? colors.p1 : colors.g12}
            textColor={selected === 'want_sell' ? colors.white : colors.b1}
          />
          <AppButton
            borderRadius={32}
            height={WP('16.4')}
            title="I want to Buy"
            icon={appIcons.buyHome}
            style={styles.iconStyle}
            borderColor={colors.white}
            shadowColor={colors.white}
            onPress={() => setSelected('want_buy')}
            bgColor={selected === 'want_buy' ? colors.p1 : colors.g12}
            textColor={selected === 'want_buy' ? colors.white : colors.b1}
          />
          <AppButton
            borderRadius={32}
            height={WP('16.4')}
            title="I am a Support Closer"
            style={styles.iconStyle}
            borderColor={colors.white}
            shadowColor={colors.white}
            onPress={() => setSelected('support_closer')}
            bgColor={
              selected === 'support_closer' ? colors.s2 : colors.g12
            }
            textColor={
              selected === 'support_closer' ? colors.white : colors.b1
            }
            icon={
              selected === 'support_closer'
                ? appIcons.buyHome
                : appIcons.contractorHome
            }
          />
        </View>
        <View style={styles.bottomView}>
          <AppButton
            title="Next"
            onPress={() => {
              if (selected == 'support_closer') {
                handleNavigation();
              } else {
                setShow(true);
              }
            }}
          />
        </View>
      </ScrollView>
      <SignUpModal
        show={show}
        activeIndex={showSlide}
        onPressHide={() => setShow(false)}
        buttonClick={() => setShowSlide(showSlide + 1)}
        valueCallBack={handleNavigation}
      />
    </View>
  );
};

export default SignUpPurpose;
