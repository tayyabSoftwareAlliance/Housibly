import React, { useState } from 'react';
import { Text, View, SafeAreaView, Alert, ScrollView } from 'react-native';
import {
  AppButton,
  AppHeader,
  AppLoader,
  BackHeader,
  DayBox,
  TimePickerCard,
} from '../../../components';
import { checkConnected, colors, networkText, weekDays } from '../../../shared/exporter';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { addInfoRequest } from '../../../redux/actions';
import moment from 'moment';

const ScheduleDay = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [week_days, setWeek_days] = useState(weekDays);
  const { userInfo, support_info } = useSelector(state => state?.auth);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const dispatch = useDispatch(null);

  //On Submit
  const onSubmit = async values => {
    setLoading(true)
    const check = await checkConnected();
    if (check) {
      console.log(support_info?.avatar);
      var form = new FormData();
      const imgObj = {
        name: support_info?.avatar?.fileName || 'Avatar',
        type: support_info?.avatar?.mime,
        uri: support_info?.avatar?.path,
      };
      form.append('user[avatar]', imgObj);
      support_info?.profession?.forEach((item, index) => {
        form.append(`user[professions_attributes][${index}][title]`, item?.title);
      })
      form.append('user[hourly_rate]', support_info?.hourly_rate);
      form.append('user[description]', support_info?.description);
      support_info?.images?.forEach(item => {
        form.append('user[images][]', {
          uri: item?.path,
          type: item?.mime || 'image/jpeg',
          name: item?.filename || 'image',
        });
      })
      support_info?.documents?.forEach(item => {
        form.append('user[certificates][]', {
          uri: item?.uri,
          type: item?.type || 'sample/jpeg',
          name: item?.name || 'pdf',
        });
      })
      week_days.forEach(item => {
        if (item?.selected)
          form.append(
            'user[schedule_attributes][working_days][]',
            item?.day
          );
      })
      form.append('user[schedule_attributes][starting_time]', moment(startTime).format('LT'));
      form.append('user[schedule_attributes][ending_time]', moment(endTime).format('LT'));
      form.append('user[licensed_realtor]', 'No');
      form.append('user[contacted_by_real_estate]', 'No');
      form.append('user[user_type]', 'neither');
      form.append('user[profile_type]', 'support_closer');
      console.log('forrmmm', form)
      const addInfoSuccess = async res => {
        console.log(res);
        setLoading(false);
        setTimeout(() => {
          navigation?.replace('App');
        }, 500);
      };
      const addInfoFailure = async res => {
        setLoading(false);
        Alert.alert('Error', res);
      };

      dispatch(addInfoRequest(form, addInfoSuccess, addInfoFailure));
    } else {
      setLoading(false)
      Alert.alert('Error', networkText);
    }
  };

  const setSelectedDay = (item, index) => {
    week_days[index].selected = !item?.selected;
    setWeek_days([...week_days]);
  };
  return (
    <>
      <SafeAreaView style={styles.rootContainer}>
        <AppHeader />
        <BackHeader title={'Set Your Schedule'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Text style={[styles.h1Style]}>Choose a Day</Text>
            <View style={styles.listCon}>
              {week_days.map((item, index) => {
                return (
                  <View>
                    <DayBox
                      day={item.day}
                      onPress={() => {
                        setSelectedDay(item, index);
                      }}
                      bgColor={item?.selected ? colors.white : colors.g8}
                      borderWidth={item?.selected ? 1 : 0}
                      borderColor={item?.selected ? colors.p2 : colors.g8}
                      tick={item?.selected ? true : false}
                    />
                  </View>
                );
              })}
            </View>
            <View>
              <Text style={[styles.h1Style]}>Starts at</Text>

              <TimePickerCard
                dateValue={startTime}
                onDateChange={date => {
                  setStartTime(date);
                }}
                // minTime={new Date()}
              />
            </View>
            <View>
              <Text style={[styles.h1Style]}>Ends at</Text>
              <TimePickerCard
                dateValue={endTime}
                onDateChange={date => {
                  setEndTime(date);
                }}
                minTime={startTime}
              />
            </View>
            <AppButton
              title={'Submit'}
              onPress={() => {
                onSubmit();
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <AppLoader loading={loading} />
    </>
  );
};

export default ScheduleDay;
