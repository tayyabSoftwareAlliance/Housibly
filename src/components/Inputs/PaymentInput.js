import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {CardField} from '@stripe/stripe-react-native';
import {colors, family, size, WP} from '../../shared/exporter';

export const PaymentInput = ({title, onCardChange, onFocus}) => {
  return (
    <View style={{paddingHorizontal: WP('3')}}>
      {title && <Text style={styles.textStyle}>{title}</Text>}

      {/* <CardField
        placeholder={{
          number: 'Card Number',
        }}
        postalCodeEnabled={false}
        cardStyle={styles.cardStyle}
        style={[styles.payStyle]}
        onCardChange={onCardChange}
        onFocus={onFocus}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  payStyle: {
    width: '100%',
    height: 40,
  },
  textStyle: {
    marginBottom: 10,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  cardStyle: {
    backgroundColor: colors.g5,
    borderRadius: 20,
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    textColor: colors.b1,
  },
});
