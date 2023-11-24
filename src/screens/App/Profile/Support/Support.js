import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {AppButton, AppHeader, BackHeader} from '../../../../components';
import {WP, appLogos, colors, size} from '../../../../shared/exporter';
import styles from './styles';

const Support = ({navigation}) => {
  const [support, setSupport] = useState([1, 2, 3, 4, 5, 6]);

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.itemContainer}
        onPress={() => navigation.navigate('SupportChat')}>
        <Image source={appLogos.supportLogo} style={styles.imgStyle} />
        <View style={{flex: 1}}>
          <View style={styles.reviewRow}>
            <Text style={styles.dateTxtStyle}>01/12/2022</Text>
            <Text style={styles.statusTxtStyle(index)}>
              {index === 2 ? 'Complete' : 'Pending'}
            </Text>
          </View>
          <Text style={styles.numTxtStyle}>92RU29R</Text>
          <Text style={styles.infoTxtStyle}>
            Lorem Ipsum is simply dummy text of the printing.
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <AppHeader subtitle={'Support'} />
      <BackHeader title={'Support'} />
      <View style={styles.contentContainer}>
        {support?.length > 0 ? (
          <FlatList
            data={support}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: WP('5')}}
          />
        ) : (
          <View style={styles.noRecordsView}>
            <Text style={styles.noRecords}>No queries found</Text>
          </View>
        )}
      </View>
      <View style={styles.bottomView}>
        <AppButton
          title="Send New Message"
          onPress={() => navigation.navigate('SupportQuery')}
          shadowColor={colors.white}
          borderColor={colors.white}
          fontSize={size.tiny}
        />
      </View>
    </SafeAreaView>
  );
};

export default Support;
