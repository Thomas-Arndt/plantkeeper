import React, { useState, useCallback, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
  CalendarUtils,
  LocaleConfig,
} from 'react-native-calendars';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectAllPlants, selectPlantByName} from '../../state/slices/PlantsSlice';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight, faDroplet} from '@fortawesome/free-solid-svg-icons';
import ExpandedCareCard from '../../components/ExpandedCareCard';
import WateringOptionsModal from '../../components/WateringOptionsModal';

const TabThree = () => {
  const today = CalendarUtils.getCalendarDateString(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const navigation = useNavigation();
  const [expandedPlant, setExpandedPlant] = useState(null);

  // State for watering modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Close expanded care card when navigating away from this tab
  useFocusEffect(
    React.useCallback(() => {
      // This function runs when the screen comes into focus

      // Return a cleanup function that runs when the screen goes out of focus
      return () => {
        // Close the expanded care card when navigating away
        if (expandedPlant) {
          setExpandedPlant(null);
        }
      };
    }, [expandedPlant])
  );

  // Get all plants from Redux store
  const plants = useSelector(selectAllPlants);

  // Function to find plant by name
  const findPlantByName = (name) => {
    return plants.find(plant => plant.name === name) || null;
  };
  // Sample agenda items
  const [items, setItems] = useState({
    '2025-06-13': [{ 'id': 1, name: 'Colorado Blue Columbine', time: '10:00 AM' }],
    '2025-06-14': [{ 'id': 2, name: 'Prairie Zinnia', time: '09:00:00' }, { 'id': 3, name: 'Blanket Flower', time: '14:00:00' }, { 'id': 4, name: 'Sulphur Flower', time: '17:00:00' }],
    '2025-06-15': [{ 'id': 5, name: 'Prairie Coneflower', time: '09:00:00' }, { 'id': 6, name: 'Colorado Blue Columbine', time: '14:00:00' }],
    '2025-06-16': [{ 'id': 7, name: 'Pasque Flower', time: '09:00:00' }, { 'id': 8, name: 'Sulphur Flower', time: '14:00:00' }],
    '2025-06-17': [{ 'id': 9, name: 'Colorado Blue Columbine', time: '09:00:00' }, { 'id': 10, name: 'Blue Grama Grass', time: '14:00:00' }],
    '2025-06-18': [{ 'id': 11, name: 'Prairie Zinnia', time: '09:00:00' }, { 'id': 12, name: 'Blanket Flower', time: '14:00:00' }],
    '2025-06-20': [{ 'id': 13, name: 'Prairie Coneflower', time: '09:00:00' }, { 'id': 14, name: 'Colorado Blue Columbine', time: '14:00:00' }],
    '2025-06-21': [{ 'id': 15, name: 'Pasque Flower', time: '09:00:00' }, { 'id': 16, name: 'Sulphur Flower', time: '14:00:00' }],
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
    const showWaterIcon = isToday(item.date);

    return (
      <TouchableOpacity style={styles.item}
        onPress={() => {
          const plant = findPlantByName(item.name);
          if (plant) {
            setExpandedPlant(plant);
          }
        }}
      >
        {/*<View style={styles.itemTimeContainer}>
          <Text style={styles.itemTime}>{formatTime(item.time)}</Text>
        </View>*/}
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        {showWaterIcon && (
          <TouchableOpacity
            style={styles.waterIconContainer}
            onPress={(e) => {
              e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
              setSelectedItem(item);
              setModalVisible(true);
            }}
          >
            <FontAwesomeIcon icon={faDroplet} size={30} color="#2196F3" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }, [plants, isToday, today]);

  // Handle date change
  const onDateChanged = useCallback((date) => {
    setCurrentDate(date);
  }, []);

  // Handle marking a plant as watered
  const handleMarkWatered = useCallback(() => {
    if (!selectedItem) {return;}

    // Create a copy of the items
    const newItems = {...items};

    // Remove the selected item from today's list
    if (newItems[selectedItem.date]) {
      newItems[selectedItem.date] = newItems[selectedItem.date].filter(
        item => !(item.name === selectedItem.name && item.time === selectedItem.time)
      );

      // If the date has no more items, remove the date entry
      if (newItems[selectedItem.date].length === 0) {
        delete newItems[selectedItem.date];
      }

      // Update the items state
      setItems(newItems);
    }

    // Close the modal
    setModalVisible(false);
    setSelectedItem(null);
  }, [selectedItem, items]);

  // Handle postponing watering by 1 day
  const handlePostponeWatering = useCallback(() => {
    if (!selectedItem) {return;}

    // Create a copy of the items
    const newItems = {...items};

    // Parse the date string to ensure it's interpreted in the local timezone
    const [year, month, day] = selectedItem.date.split('-').map(num => parseInt(num, 10));

    // Store the original date string for later comparison
    const originalDateString = selectedItem.date;

    // Create a new date string directly by incrementing the day
    // This avoids any potential timezone issues
    let nextDay = day + 1;
    let nextMonth = month;
    let nextYear = year;

    // Handle month/year rollover
    const daysInMonth = new Date(year, month, 0).getDate();
    if (nextDay > daysInMonth) {
      nextDay = 1;
      nextMonth += 1;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
    }

    // Format the date string manually
    const newDateString = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;

    // Create a Date object for the original selected item date
    const [selYear, selMonth, selDay] = selectedItem.date.split('-').map(num => parseInt(num, 10));
    const selectedItemDateObj = new Date(selYear, selMonth - 1, selDay);

    // Process all dates including the selected item's date
    // Store dates to process to avoid modification during iteration
    const datesToProcess = Object.keys(newItems);

    // Sort dates in reverse order to process them from latest to earliest
    // This helps avoid index shifting issues
    datesToProcess.sort().reverse();

    // Process each date
    datesToProcess.forEach(date => {
      // Parse the current date string for proper comparison
      const [currYear, currMonth, currDay] = date.split('-').map(num => parseInt(num, 10));
      const currentDateObj = new Date(currYear, currMonth - 1, currDay);

      const itemsToUpdate = [];

      // First identify all items that need to be updated
      newItems[date].forEach((item, index) => {
        // For the selected item's date, only update the selected item
        if (date === originalDateString) {
          if (item.name === selectedItem.name && item.time === selectedItem.time) {
            itemsToUpdate.push({
              index,
              newDate: newDateString,
              item: {
                name: item.name,
                time: item.time,
              },
            });
          }
        }
        // For future dates, update all items with the same name
        else if (currentDateObj > selectedItemDateObj && item.name === selectedItem.name) {
          // Calculate the new date for this future event (always +1 day)
          // Parse the date string to ensure it's interpreted in the local timezone
          const [futureYear, futureMonth, futureDay] = date.split('-').map(num => parseInt(num, 10));

          // Create a new date string directly by incrementing the day
          // This avoids any potential timezone issues
          let nextDay = futureDay + 1;
          let nextMonth = futureMonth;
          let nextYear = futureYear;

          // Handle month/year rollover
          const daysInMonth = new Date(futureYear, futureMonth, 0).getDate();
          if (nextDay > daysInMonth) {
            nextDay = 1;
            nextMonth += 1;
            if (nextMonth > 12) {
              nextMonth = 1;
              nextYear += 1;
            }
          }

          // Format the date string manually
          const futureDateString = `${nextYear}-${String(nextMonth).padStart(2, '0')}-${String(nextDay).padStart(2, '0')}`;

          itemsToUpdate.push({
            index,
            newDate: futureDateString,
            item: {
              name: item.name,
              time: item.time,
            },
          });
        }
      });

      // Sort in reverse order to avoid index shifting issues
      itemsToUpdate.sort((a, b) => b.index - a.index);

      // Now update the items
      itemsToUpdate.forEach(updateInfo => {
        // Remove from current date
        newItems[date].splice(updateInfo.index, 1);

        // If the date has no more items, remove the date entry
        if (newItems[date].length === 0) {
          delete newItems[date];
        }

        // Add to new date - ensure the new date entry exists
        if (!newItems[updateInfo.newDate]) {
          newItems[updateInfo.newDate] = [];
        }

        newItems[updateInfo.newDate].push(updateInfo.item);
      });
    });

    // Force a re-render by creating a new object
    const updatedItems = {...newItems};

    // Update the items state
    setItems(updatedItems);

    // Close the modal
    setModalVisible(false);
    setSelectedItem(null);
  }, [selectedItem, items]);

  const formatTime = (timeString : string) => {
    if (!timeString) {return '';}

    const [hoursStr, minutesStr] = timeString.split(':');

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) {return '';}

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // convert 0 to 12
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  };


  // Check if an item is from today
  const isToday = (date) => {
    return date === today;
  };

  return (
    <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode="cover"
        style={styles.background}>

      {/* Watering Options Modal */}
      <WateringOptionsModal
        visible={modalVisible}
        selectedItem={selectedItem}
        onClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
        onMarkWatered={handleMarkWatered}
        onPostponeWatering={handlePostponeWatering}
      />
      <SafeAreaView style={styles.container}>
        {expandedPlant ? (
          // Show expanded care card when a plant is selected
          <ExpandedCareCard
            plant={expandedPlant}
            onClose={() => setExpandedPlant(null)}
          />
        ) : (
          // Show the calendar and agenda list when no plant is selected
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
                todayTextColor: '#2e7d32',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                monthTextColor: '#2e7d32',
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
                      <FontAwesomeIcon icon={faChevronLeft} size={16} color={'#2e7d32'} />
                  ) : (
                      <FontAwesomeIcon icon={faChevronRight} size={16} color={'#2e7d32'} />
                  )
              }
            />
            <AgendaList
              sections={Object.keys(items).sort().map(date => ({
                title: date,
                data: items[date].map(item => ({
                  ...item,
                  date,
                })),
              }))}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              sectionStyle={styles.section}
            />
          </CalendarProvider>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default TabThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
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
  waterIconContainer: {
    paddingHorizontal: 10,
  },
  section: {
    backgroundColor: 'transparent',
    color: 'white',
    textTransform: 'capitalize',
    fontSize: 14,
    padding: 10,
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
