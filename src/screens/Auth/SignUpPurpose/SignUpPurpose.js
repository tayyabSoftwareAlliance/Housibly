import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppButton, BackHeader, SignUpModal, Spacer} from '../../../components';
import {appIcons, appImages, colors, WP} from '../../../shared/exporter';
import styles from './styles';

const SignUpPurpose = ({navigation, route}) => {
  const [selected, setSelected] = useState('want_sell');
  const [show, setShow] = useState(false);
  const [showSlide, setShowSlide] = useState(0);

  const handleNavigation = (userType, licensed, contacted) => {
    if (selected == 'want_support_closer') {
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
    setShowSlide(0);
  };

  return (
    <View style={styles.rootContainer}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />

      <ImageBackground source={appImages.homeImg} style={styles.bgImgStyle}>
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
        <Text style={styles.helloTxtStyle}>Hello, roberto</Text>
        <Text style={styles.chooseTxtStyle}>
          Choose, What do you want to do?{' '}
        </Text>
      </ImageBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
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
            onPress={() => setSelected('want_support_closer')}
            bgColor={
              selected === 'want_support_closer' ? colors.s2 : colors.g12
            }
            textColor={
              selected === 'want_support_closer' ? colors.white : colors.b1
            }
            icon={
              selected === 'want_support_closer'
                ? appIcons.buyHome
                : appIcons.contractorHome
            }
          />
        </View>
        <View style={styles.bottomView}>
          <AppButton
            title="Next"
            onPress={() => {
              if (selected == 'want_support_closer') {
                handleNavigation();
              } else {
                setShow(true);
              }
            }}
          />
        </View>
      </KeyboardAwareScrollView>
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
