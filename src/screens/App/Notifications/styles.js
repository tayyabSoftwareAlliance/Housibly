import { StyleSheet } from 'react-native';
import { WP, colors, size, family, HP } from '../../../shared/exporter';

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: WP(5),
    marginTop: WP(5),
    backgroundColor: colors.white
  },
  imgStyle: {
    borderRadius: 15,
    width: WP(17),
    height: WP(17),
    marginRight: WP(2.5),
    backgroundColor:colors.g14
  },
  notificationTitle: {
    color: colors.b1,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    width:WP(68),
    textTransform:'capitalize'
  },
  notificationBody: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    marginTop:WP(2),
    width:WP(68)
  },
  notificationTime: {
    color: '#171717',
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Regular,
    marginTop:WP(2),
    width:WP(68)
  }
});

export default styles