import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { family, size, WP, colors } from '../../shared/exporter';
import CheckBox from '../Custom/CheckBox';

export const ListModal = ({
  listRef,
  list,
  getValue,
  height,
  title,
  onPressCross,
  onPressTick,
  selected,
  closable,
  multiselect = false
}) => {

  const [value, setValue] = useState(selected || (multiselect ? [] : {}))

  const onSelect = (item) => {
    if (multiselect) {
      setValue(prev => {
        if (prev.findIndex(it => it.id == item.id) > -1)
          return prev.filter(it => it.id != item.id)
        else
          return [...prev, item]
      })
    } else {
      setValue(item)
    }
  }

  const isSelected = useCallback((item) => {
    if (multiselect) {
      return (value.findIndex(it => item?.id == it?.id) > -1)
    } else {
      return item?.id == value?.id
    }
  }, [value, selected])

  return (
    <RBSheet
      ref={listRef}
      height={height}
      openDuration={250}
      closeOnPressBack={false}
      closeOnPressMask={false}
      customStyles={{
        container: styles.container,
      }}>
      <View style={styles.aiRow}>
        <Icon
          name={'cross'}
          type={'entypo'}
          onPress={() => {
            onPressCross()
            setValue(selected)
          }}
        />
        <Text style={styles.textStyle}>{multiselect ? 'Can Choose Multiple' : title}</Text>
        <Icon
          name={'check'}
          type={'ionicons'}
          onPress={() => onPressTick(value)}
        />
      </View>

      <View style={styles.gradientStyle}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.buttonContainer,
                  {
                    backgroundColor:
                      isSelected(item) ? colors.g20 : colors.white,
                  },
                ]}
                onPress={() => onSelect(item)}>
                {multiselect &&
                  <CheckBox
                    checked={isSelected(item)}
                    onPress={() => onSelect(item)}
                    style={{ width: 20, marginRight: 10 }}
                  />
                }
                <Text
                  numberOfLines={1}
                  style={[
                    styles.textStyle,
                    { fontFamily: family.Gilroy_Medium },
                  ]}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  gradientStyle: {
    width: '100%',

    flex: 1,
    paddingHorizontal: WP('4'),
    paddingVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
    color: colors.b1,
    textTransform: 'capitalize'
  },
  h1: {
    fontSize: size.h1,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
    paddingVertical: 10,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.g12,
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
  },
});
