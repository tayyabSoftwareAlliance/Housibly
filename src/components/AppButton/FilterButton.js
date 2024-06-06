import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { Icon } from 'react-native-elements';
import { colors, family, property_type_list, size, WP } from '../../shared/exporter';
import { ListModal } from '../Modal/ListModal';

export const FilterButton = ({
  title,
  list = {},
  onPressTick,
  source,
  marginRight,
  marginLeft,
  marginBottom,
  marginTop,
  textColor,
  selected,
  multiselect = false,
  tintColor,
  required
}) => {

  const ref = useRef()

  const renderSubtitle = useMemo(() => {
    let subtitle = ''
    if (multiselect)
      subtitle = selected?.map?.(item => list[item]).join(', ')
    else
      subtitle = list[selected]
    return subtitle && (
      <Text numberOfLines={1} style={[styles.subtitle, { color: textColor || colors.g19 }]}>
        {subtitle}
      </Text>
    )
  }, [selected, textColor])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => ref.current?.open()} style={styles.btnCon}>
        <View style={styles.leftContainer} >
          {source && (
            <Image
              source={source}
              resizeMode='contain'
              style={{
                height: 30,
                width: 30,
                marginRight: marginRight || WP('3.85'),
                marginLeft: marginLeft,
                marginBottom: marginBottom,
                marginTop: marginTop,
                tintColor: tintColor,
              }}
            />
          )}
          <View style={{ flex: 1 }} >
            <View style={{ flexDirection: 'row' }} >
              <Text numberOfLines={2} style={[styles.title, textColor && { color: textColor }]}>
                {title}
              </Text>
              {required && <Text style={{ color: colors.r1 }} >*</Text>}
            </View>
            {renderSubtitle}
          </View>
        </View>
        <Icon name={'right'} type={'antdesign'} color={colors.g19} size={15} />
      </TouchableOpacity>
      <ListModal
        listRef={ref}
        list={Object.entries(list)}
        onPressCross={() => {
          ref.current?.close()
        }}
        onPressTick={(val) => {
          onPressTick(val)
          ref.current?.close()
        }}
        selected={selected}
        title={title}
        multiselect={multiselect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WP('1'),
    height: 60,
    justifyContent: 'center',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: size.xsmall,
    color: colors.b1,
    fontFamily: family.Gilroy_Medium,
  },
  subtitle: {
    width: '100%',
    fontSize: size.xsmall,
    color: colors.g19,
    fontFamily: family.Gilroy_Medium,
    textTransform: 'capitalize'
  },
  btnCon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
});
