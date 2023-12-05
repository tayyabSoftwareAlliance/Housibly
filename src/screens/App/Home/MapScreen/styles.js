import {StyleSheet} from 'react-native';
import {WP, colors,spacing} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.over1,
  },
  headerStyle: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.over1,
    ...spacing.py4
  },
});

export default styles;
