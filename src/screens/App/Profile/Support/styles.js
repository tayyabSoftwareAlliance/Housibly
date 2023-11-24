import {StyleSheet} from 'react-native';
import {WP, colors, size, family} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    flex: 1,
    marginBottom: WP('10'),
    paddingHorizontal: WP('2'),
  },
  itemContainer: {
    width: '90%',
    borderRadius: 14,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: WP('2.5'),
    paddingVertical: WP('4.5'),
    backgroundColor: colors.p6,
    paddingHorizontal: WP('3.5'),
  },
  imgStyle: {
    width: WP('15'),
    height: WP('15'),
    marginRight: WP('2.5'),
    borderRadius: WP('12.5'),
  },
  reviewRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  numTxtStyle: {
    marginTop: 3,
    color: colors.s7,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
  statusTxtStyle: index => {
    return {
      fontSize: size.tiny,
      fontFamily: family.Gilroy_Medium,
      color: index == 2 ? colors.s7 : colors.s8,
    };
  },
  infoTxtStyle: {
    lineHeight: 17.5,
    color: colors.g34,
    fontSize: size.tiny,
    marginTop: WP('2.2'),
    fontFamily: family.Gilroy_Regular,
  },
  dateTxtStyle: {
    color: colors.g34,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  noRecordsView: {
    flex: 0.85,
    marginTop: WP('3'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecords: {
    marginRight: 17,
    color: colors.p1,
    fontSize: size.large,
    fontFamily: family.Gilroy_Bold,
  },
  bottomView: {
    bottom: 20,
    width: '85%',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});

export default styles;
