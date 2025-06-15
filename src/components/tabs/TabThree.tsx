import React, { useState, useCallback, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
  CalendarUtils,
  LocaleConfig
} from 'react-native-calendars';
import {useNavigation} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const TabThree = () => {
  const today = CalendarUtils.getCalendarDateString(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const navigation = useNavigation();
  // Sample agenda items
  const [items, setItems] = useState({
    '2025-06-13': [{ name: 'Meeting with client', time: '10:00 AM' }],
    '2025-06-14': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }, { name: 'Project presentation', time: '17:00:00' }],
    '2025-06-15': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
    '2025-06-16': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
    '2025-06-17': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
    '2025-06-19': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
    '2025-06-20': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
    '2025-06-21': [{ name: 'Team brainstorming session', time: '09:00:00' }, { name: 'Project presentation', time: '14:00:00' }],
  });

  // Get dates with events for marking
  const getMarkedDates = () => {
    const marked = {};
    Object.keys(items).forEach(key => {
      if (items[key] && items[key].length > 0) {
        marked[key] = { marked: true, dotColor: '#50cebb' };
      }
    });
    return marked;
  };

  // Render agenda item
  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity style={styles.item}
        onPress={() => Alert.alert('Item pressed', item.name + ' ' + item.time + ' ' + item.date)}
      >
        <View style={styles.itemTimeContainer}>
          <Text style={styles.itemTime}>{formatTime(item.time)}</Text>
        </View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  // Handle date change
  const onDateChanged = useCallback((date) => {
    setCurrentDate(date);
  }, []);

  const formatTime = (timeString : string) => {
    if (!timeString) return '';

    const [hoursStr, minutesStr] = timeString.split(':');

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) return '';

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // convert 0 to 12
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarProvider
        date={currentDate}
        onDateChanged={onDateChanged}
        showTodayButton
        disabledOpacity={0.6}
      >
        <ExpandableCalendar
          firstDay={1}
          markedDates={getMarkedDates()}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          renderArrow={(direction) =>
              direction === 'left' ? (
                  <FontAwesomeIcon icon={faChevronLeft} size={16} />
              ) : (
                  <FontAwesomeIcon icon={faChevronRight} size={16} />
              )
          }
        />
        <AgendaList
          sections={Object.keys(items).map(date => ({
            title: date,
            data: items[date].map(item => ({
              ...item,
              date,
            }))
          }))}
          renderItem={renderItem}
          sectionStyle={styles.section}
        />
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default TabThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
  },
  itemTimeContainer: {
    width: 80,
  },
  itemNameContainer: {
    flex: 1,
  },
  itemTime: {
    color: '#888',
    fontSize: 14,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#f0f0f0',
    color: '#2d4150',
    textTransform: 'capitalize',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
  },
});
