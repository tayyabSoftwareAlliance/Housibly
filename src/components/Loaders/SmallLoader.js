import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import {colors} from '../../shared/exporter';

export const SmallLoader = ({loading, height, width = '80%'}) => {
  return <ActivityIndicator size={'large'} color={colors.p1} animating />;
};
