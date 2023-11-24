import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HP, WP, colors, family, size } from '../../shared/exporter'
import { SmallHeading } from '../Headings/SmallHeading'
import { Icon } from 'react-native-elements';

const RoomsBox = ({ data, onRemoveRoom }) => {
  return (
    data?.length > 0 &&
    <View style={styles.descBox}>
      <SmallHeading title={'Rooms'} />
      {data.map((item, index) => (
        <View key={index} style={styles.roomRow} >
          <Text style={styles.text} >{item?.name || 'N/A'}</Text>
          <Text style={styles.text} >{item?.level || 'N/A'}</Text>
          <Text style={styles.text} >{`${item?.length_ft}'${item?.length_in}" x ${item?.width_ft}'${item?.width_in}"`}</Text>
          <View style={{ width: WP(23), justifyContent: 'center', alignItems: 'center' }} >
            {onRemoveRoom &&
              <Icon
                type={'material'}
                name={'close'}
                color={colors.red}
                size={WP(2)}
                reverse
                onPress={() => onRemoveRoom(index)}
              />
            }
          </View>
        </View>
      ))
      }
    </View>
  )
}

export default RoomsBox

const styles = StyleSheet.create({
  descBox: {
    backgroundColor: colors.g30,
    marginHorizontal: -WP('3.85'),
    paddingHorizontal: WP('3.85'),
    paddingVertical: 20,
    marginTop: HP(3),
  },
  text: {
    fontSize: WP(3),
    color: colors.g22,
    fontFamily: family.Gilroy_Medium,
    textTransform: 'capitalize',
    width: WP(23)
  },
  roomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: HP(1)
  }
})