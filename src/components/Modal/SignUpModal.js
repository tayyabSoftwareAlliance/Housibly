import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors, WP, family, size, appIcons} from '../../shared/exporter';
import {
  modalData,
  slide1BoxData,
  slide2BoxData,
  slide3BoxData,
} from '../../shared/utilities/constant';

export const SignUpModal = ({
  show,
  buttonClick,
  onPressHide,
  activeIndex,
  valueCallBack,
}) => {
  const [item, setItem] = useState({});
  const [slide1Data, setSlide1Data] = useState(slide1BoxData);
  const [slide2Data, setSlide2Data] = useState(slide2BoxData);
  const [slide3Data, setSlide3Data] = useState(slide3BoxData);

  useEffect(() => {
    if (activeIndex != undefined) setItem(modalData[activeIndex]);
  }, [activeIndex]);

  const handleBoxClick = (id, slideData) => {
    let data = slideData;
    // data manipulation
    data = data.map(item => {
      item.isChecked = false;
      if (item.id == id) {
        return {
          ...item,
          isChecked: true,
        };
      } else {
        return {
          ...item,
          isChecked: false,
        };
      }
    });
    // set respective data
    activeIndex == 0
      ? setSlide1Data(data)
      : activeIndex == 1
      ? setSlide2Data(data)
      : setSlide3Data(data);
  };

  const handleNavigation = () => {
    let userType = 'Seller';
    let licensed = 'Yes';
    let contacted = 'Yes';
    slide1Data.forEach(element => {
      if (element?.isChecked) {
        userType = element?.title;
      }
    });
    slide2Data.forEach(element => {
      if (element?.isChecked) {
        licensed = element?.title;
      }
    });
    slide3Data.forEach(element => {
      if (element?.isChecked) {
        contacted = element?.title;
      }
    });
    onPressHide();
    setTimeout(() => {
      valueCallBack(userType, licensed, contacted);
    }, 300);
  };

  const CheckBoxRow = ({id, data, title, isChecked}) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleBoxClick(id, data)}>
          <Image
            source={isChecked ? appIcons.checkedBox : appIcons.box}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <Text style={styles.rowTxtStyle}>{title}</Text>
      </View>
    );
  };

  return (
    <Modal onBackdropPress={onPressHide} isVisible={show}>
      <View style={styles.modalContainer}>
        <View style={styles.imageView}>
          <View style={styles.imgContainer}>
            <Image
              resizeMode="contain"
              source={item?.img}
              style={styles.personImgStyle}
            />
          </View>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.titleTxtStyle(activeIndex)}>{item?.title}</Text>
          {activeIndex === 0 &&
            slide1Data?.map(item => {
              return (
                <CheckBoxRow
                  id={item?.id}
                  data={slide1Data}
                  title={item?.title}
                  isChecked={item?.isChecked}
                />
              );
            })}
          {activeIndex === 1 &&
            slide2Data?.map(item => {
              return (
                <CheckBoxRow
                  id={item?.id}
                  data={slide2Data}
                  title={item?.title}
                  isChecked={item?.isChecked}
                />
              );
            })}
          {activeIndex === 2 &&
            slide3Data?.map(item => {
              return (
                <CheckBoxRow
                  id={item?.id}
                  data={slide3Data}
                  title={item?.title}
                  isChecked={item?.isChecked}
                />
              );
            })}
          <Text style={styles.descTxtStyle}>{item?.desc}</Text>
          <View style={styles.bottomRow(activeIndex)}>
            <View style={styles.innerRow}>
              <View style={styles.dotStyle(activeIndex == 0)} />
              <View style={styles.dotStyle(activeIndex == 1)} />
              <View style={styles.dotStyle(activeIndex == 2)} />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                activeIndex == 2 ? handleNavigation() : buttonClick()
              }
              style={styles.btnContainer}>
              <Text style={styles.btnTxtStyle}>
                {activeIndex == 2 ? 'Done' : 'NEXT'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 8,
    alignItems: 'center',
    paddingBottom: WP('7'),
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageView: {
    width: '100%',
    height: WP('51'),
    alignItems: 'center',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    justifyContent: 'center',
    backgroundColor: colors.g5,
  },
  imgContainer: {
    width: WP('25'),
    height: WP('25'),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.g11,
  },
  personImgStyle: {
    width: WP('15.5'),
    height: WP('16.5'),
  },
  homeImgStyle: {
    width: WP('18'),
    height: WP('16.5'),
  },
  dealerImgStyle: {
    width: WP('16.7'),
    height: WP('16.7'),
  },
  contentView: {
    width: '100%',
    marginTop: WP('3'),
    paddingHorizontal: WP('3.6'),
  },
  titleTxtStyle: activeIndex => {
    return {
      color: colors.b1,
      fontSize: size.xxlarge,
      fontFamily: family.Gilroy_SemiBold,
      marginBottom: activeIndex == 0 ? WP('3') : WP('0'),
    };
  },
  rowContainer: {
    marginTop: WP('4'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: WP('4.4'),
    height: WP('4.4'),
  },
  rowTxtStyle: {
    top: 1,
    left: 7,
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
  descTxtStyle: {
    color: colors.b1,
    marginTop: WP('4'),
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
  bottomRow: activeIndex => {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: activeIndex == 0 ? WP('3') : WP('2'),
    };
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: isActive => {
    return {
      width: isActive ? 23 : 12,
      height: 3,
      marginRight: 3,
      borderRadius: 23,
      backgroundColor: isActive ? colors.p2 : colors.p3,
    };
  },
  btnContainer: {
    borderRadius: 15,
    width: WP('17.5'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.p2,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.xsmall,
    paddingVertical: WP('2'),
    fontFamily: family.Gilroy_SemiBold,
  },
});
