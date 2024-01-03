import {StyleSheet} from 'react-native';
import {WP, colors, size, family, HP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topTabContainer:{
    flexDirection:'row',
  },
  topTabLine:{
    backgroundColor:colors.p1,
    height:3,
    width:WP(50),
    position:'absolute',
    bottom:0,
    left:0
  },
  topTabTxtContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:HP(1)
  },
  topTabTxt: {
    color: colors.g19,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
  },
  
});

export default styles;
