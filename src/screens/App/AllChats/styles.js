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
  },
  backBtnsContainer: {
    height: WP(17),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: WP(5),
  },
  backRightBtn: {
    height: '100%',
    paddingHorizontal: WP(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.r1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginBottom: 9,
  },
  chatTitle: {
    color: colors.b1,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
  chatMessage: {
    color: colors.b1,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginTop:WP(3),
    width:WP(68)
  }
});

export default styles