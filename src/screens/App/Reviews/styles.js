import { StyleSheet } from 'react-native';
import { WP, colors, size, family } from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#EFF8FC',
  },
  contentContainer:{
    paddingHorizontal: WP('3.85'),
  },
  titleContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical: 24
  },
  title:{
    fontSize: size.large,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
});

export default styles;
