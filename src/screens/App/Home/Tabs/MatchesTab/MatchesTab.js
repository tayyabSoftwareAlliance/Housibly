import React from 'react';
import {Text, View, Image, FlatList} from 'react-native';
import {appIcons} from '../../../../../shared/exporter';
import {myMatches} from '../../../../../shared/utilities/constant';
import styles from './styles';

const MatchesTab = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item?.img} style={styles.imgStyle} />
        <View style={{paddingVertical: 5}}>
          <View style={styles.innerRow}>
            <Text numberOfLines={1} style={styles.nameTxtStyle}>
              {item?.name}
            </Text>
            <View style={styles.txtContainer}>
              <Text style={styles.newTxtStyle}>New</Text>
            </View>
          </View>
          <View style={styles.simpleRow}>
            <Text style={styles.smallTxtStyle}>$25,000 | </Text>
            <Image
              resizeMode="contain"
              source={appIcons.bedIcon}
              style={styles.bedIconStyle}
            />
            <Text style={styles.smallTxtStyle}>4</Text>
            <Image source={appIcons.bathIcon} style={styles.bathIconStyle} />
            <Text resizeMode="contain" style={styles.smallTxtStyle}>
              3.5
            </Text>
          </View>
          <View style={[styles.simpleRow, {paddingTop: 0}]}>
            <Image source={appIcons.heartIcon} style={styles.heartIconStyle} />
            <Text style={styles.heartTxtStyle}>90% match</Text>
          </View>
          <Text style={styles.timeTxtStyle}>Last active: 1 day ago</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.paddingView}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleTxtStyle}>Property Matches</Text>
        <Text
          style={styles.viewAllTxtStyle}
          onPress={() => navigation.navigate('AllMatches')}>
          View All
        </Text>
      </View>
      <FlatList
        data={myMatches}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MatchesTab;
