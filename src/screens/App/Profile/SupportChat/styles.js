import { StyleSheet } from 'react-native';
import {
  WP,
  colors,
  size,
  family,
  platformOrientedCode,
} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  itemContainer: {
    width: '90%',
    borderRadius: 14,
    alignSelf: 'center',
    paddingTop: WP('4.5'),
    paddingBottom: WP('2.5'),
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imgStyle: {
    width: WP('13'),
    height: WP('13'),
    marginRight: WP('2'),
    borderRadius: WP('12.5'),
    backgroundColor:colors.g14
  },
  nameTxtStyle: {
    color: colors.b7,
    fontSize: size.large,
    fontFamily: family.Gilroy_Medium,
  },
  dateTxtStyle: {
    color: colors.b7,
    marginTop: WP('1'),
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Regular,
  },
  infoTxtStyle: {
    lineHeight: 16,
    color: colors.g34,
    fontSize: size.tiny,
    marginTop: WP('2'),
    paddingHorizontal: WP('2'),
    fontFamily: family.Gilroy_Regular,
  },
  inputView: {
    padding: WP('4'),
    minHeight: WP('9'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: WP('6'),
  },
  inputWrapper: {
    flex: 1,
    width: '100%',
    marginRight: 16,
    borderRadius: 18,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.w1,
  },
  inputStyles: {
    width: '88%',
    paddingRight: 5,
    color: colors.b1,
    alignSelf: 'center',
    fontSize: size.xsmall,
    textAlignVertical: 'top',
    fontFamily: family.Gilroy_Medium,
    padding: platformOrientedCode(11, 15),
    paddingTop: platformOrientedCode(5, 5),
    paddingBottom: platformOrientedCode(3, 2),
  },
  iconStyle: {
    width: 26,
    height: 26,
  },
  msgContainer: {
    marginBottom: WP('4.6'),
    marginHorizontal: WP('5'),
  },
  noRecordsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecords: {
    color: colors.g19,
    fontSize: size.small,
    fontFamily: family.Gilroy_Regular,
  },
  msgImageContainer:{
    padding:WP(2),
    backgroundColor:colors.g1,
    borderRadius:10,
    alignSelf:'flex-start',
    marginTop:WP(2)
  },
  msgImage:{
    height:WP(10),
    width:WP(10),
    borderRadius:10
  }
});

export default styles;
