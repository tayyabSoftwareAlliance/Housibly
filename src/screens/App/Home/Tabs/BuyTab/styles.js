import {StyleSheet} from 'react-native';
import {WP, colors, size, family, scrWidth} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  propertyTxtStyle: {
    color: '#5C5C5C',
    fontSize: size.xlarge,
    fontFamily: family.Gilroy_Medium,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locIconStyle: {
    width: 12,
    height: 14,
  },
  locTxtStyle: {
    top: 1,
    marginLeft: 7,
    color: colors.g2,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  phImgStyle: {
    width: WP('15'),
    height: WP('15'),
  },
  itemContainer: {
    padding: 6,
    borderRadius: 20,
    marginTop: WP('4'),
    flexDirection: 'row',
    backgroundColor: colors.s3,
    justifyContent: 'space-between',
  },
  itemInnerRow: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  personImgStyle: {
    width: WP('22'),
    height: WP('22'),
    borderRadius: 15,
  },
  txtContainer: {
    paddingHorizontal: WP('4'),
  },
  itemNameStyle: {
    color: colors.white,
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
  },
  h1TxtStyle: {
    paddingTop: 6,
    paddingBottom: 15,
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
  h2TxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  iconContainer: {
    right: 5,
    borderRadius: 7,
    width: WP('6.7'),
    height: WP('6.7'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.s4,
  },
  menuContainer: {
    width: '100%',
    top: WP('-16'),
    alignItems: 'flex-end',
    paddingRight: WP('8.2'),
    justifyContent: 'flex-end',
  },
  menuStyle: {
    marginTop: 5,
    marginLeft: -5,
    borderRadius: 8,
    height: WP('20'),
    width: scrWidth / 3.7,
  },
  menuItemStyle: {
    height: WP('8'),
  },
  menuTxtStyle: {
    left: -2,
    color: colors.b1,
    marginTop: WP('3.5'),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
  },
  paddingView: {
    paddingHorizontal: WP('4.1'),
  },
  tabsContainer: {
    borderRadius: 13,
    marginTop: WP('3.5'),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: WP('5.4'),
    backgroundColor: colors.g5,
    justifyContent: 'space-between',
  },
  tabStyle: isSelected => {
    return {
      margin: 3,
      width: '30%',
      borderRadius: 10,
      height: WP('10.3'),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isSelected ? colors.p2 : colors.g5,
    };
  },
  tabTxtStyle: isSelected => {
    return {
      fontSize: size.tiny,
      fontFamily: family.Gilroy_SemiBold,
      color: isSelected ? colors.white : colors.g15,
    };
  },
  itemRow: {
      borderRadius: 5,
      paddingHorizontal: 8,
      flexDirection: 'row',
      paddingVertical: 6,
  },
  titleTxtStyle: {
    flex: 0.4,
    color: colors.g16,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    textTransform:'capitalize'
  },
  valTxtStyle: {
    flex: 0.6,
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
    textTransform:'capitalize'
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: WP('2'),
    paddingBottom: WP('3.5'),
  },
  advanceTxtStyle: {
    paddingLeft: 8,
    paddingRight: 5,
    color: colors.p1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  mapImgStyle: {
    width: '100%',
    height: WP('19.5'),
    marginTop: WP('2.5'),
    alignItems: 'center',
    marginBottom: WP('5'),
    justifyContent: 'center',
  },
  iconStyle: {
    width: WP('9'),
    height: WP('9'),
  },
  addressTxtStyle: {
    paddingTop: WP('2'),
    color: colors.white,
    fontSize: size.xxtiny,
    fontFamily: family.Gilroy_Regular,
  },
  infoRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIconStyle: {
    width: WP('3'),
    height: WP('3'),
  },
  dividerView: {
    width: '100%',
    height: 0.5,
    backgroundColor: colors.g18,
  },
  startTypingTxt: {
    color: colors.g19,
    paddingHorizontal: 2,
    paddingVertical: WP(4),
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  addressItemRow: index => {
    return {
      borderRadius: 25,
      padding: 8,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: index % 2 == 0 ? '#E3F5FF' : '#F3FBFF',
      marginTop:WP(2)
    };
  },
  addrsTxtStyle: {
    color: colors.g16,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    width:WP(70)
  },
  locationIconStyle: {
    width: WP(4),
    height: WP(4),
    objectFit:'contain'
  },
  crossIconStyle: {
    width: WP(3),
    height: WP(3),
    objectFit:'contain'
  },
  savedLocationContainer:{
    backgroundColor: colors.g5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius:5,
    marginBottom: WP('2.5'),
  },
  savedLocationText:{
    color: colors.p1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    textDecorationLine:'underline',
  }
});

export default styles;
