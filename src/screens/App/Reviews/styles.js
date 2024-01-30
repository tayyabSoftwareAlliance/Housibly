import { StyleSheet } from 'react-native';
import { WP, colors, size, family, PADDING_BOTTOM_FOR_TAB_BAR_SCREENS } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#EFF8FC',
  },
  contentContainer: {
    flex:1,
    paddingHorizontal: WP('3.85'),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 24
  },
  title: {
    fontSize: size.large,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  footerComponent: {
    height: WP(10),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  bottomView: {
    bottom: WP(10),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
  },
  btnTxtStyle: {
    color: colors.white,
    fontSize: size.tiny,
    fontFamily: family.Gilroy_SemiBold,
  },
});

export default styles;
