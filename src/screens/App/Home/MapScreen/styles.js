import {StyleSheet} from 'react-native';
import {WP, colors} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.over1,
  },
  contentContainer: {
    flex: 1,
  },
  headerStyle: {
    position: 'absolute',
    height: '11%',
    zIndex: 9999,
    justifyContent: 'flex-end',
    backgroundColor: colors.over1,
    paddingBottom: 10,
  },
});

export default styles;
