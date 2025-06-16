import React, { useState, useCallback, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground} from 'react-native';
import {
  CalendarProvider,
  ExpandableCalendar,
  AgendaList,
  CalendarUtils,
  LocaleConfig
} from 'react-native-calendars';
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import ExpandedCareCard from '../../components/ExpandedCareCard';

const TabThree = () => {
  const today = CalendarUtils.getCalendarDateString(new Date());
  const [currentDate, setCurrentDate] = useState(today);
  const navigation = useNavigation();
  const [expandedPlant, setExpandedPlant] = useState(null);

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

  // List of Colorado native plants - same as in TabOne
  const plants = [
    {
      id: '1',
      name: 'Colorado Blue Columbine',
      description: 'The state flower of Colorado',
      detailedDescription: 'The Colorado Blue Columbine (Aquilegia coerulea) is the official state flower of Colorado. It\'s a beautiful perennial with distinctive blue and white flowers. The plant typically grows to about 20 inches tall and blooms from late spring to early summer. It prefers partial shade and well-drained soil.',
      water: 'Moderate',
      light: 'Partial shade',
      soil: 'Well-drained, rich in organic matter',
      bloomTime: 'Late spring to early summer',
      height: '15-20 inches',
      spacing: '12-18 inches',
      maintenance: 'Low to moderate'
    },
    {
      id: '2',
      name: 'Rocky Mountain Juniper',
      description: 'Evergreen tree native to Colorado',
      detailedDescription: 'The Rocky Mountain Juniper (Juniperus scopulorum) is a hardy evergreen tree native to the Rocky Mountain region. It can grow up to 30-40 feet tall and has a distinctive conical shape. The foliage is blue-green and the tree produces small, blue, berry-like cones.',
      water: 'Low',
      light: 'Full sun',
      soil: 'Well-drained, tolerates poor soils',
      bloomTime: 'N/A (Evergreen)',
      height: '30-40 feet',
      spacing: '15-20 feet',
      maintenance: 'Low'
    },
    {
      id: '3',
      name: 'Ponderosa Pine',
      description: 'Common in Colorado forests',
      detailedDescription: 'The Ponderosa Pine (Pinus ponderosa) is one of the most common trees in Colorado forests. It can grow to impressive heights of 60-100 feet. The bark is distinctive, with large plates that smell like vanilla or butterscotch when warm. The needles grow in bundles of three.',
      water: 'Low to moderate',
      light: 'Full sun',
      soil: 'Well-drained, adaptable',
      bloomTime: 'N/A (Evergreen)',
      height: '60-100 feet',
      spacing: '20-25 feet',
      maintenance: 'Low'
    },
    {
      id: '4',
      name: 'Pasque Flower',
      description: 'Early spring bloomer',
      detailedDescription: 'The Pasque Flower (Pulsatilla patens) is one of the earliest blooming wildflowers in Colorado. It produces lavender to purple cup-shaped flowers with yellow centers. The plant is covered with silky hairs that help protect it from cold spring temperatures.',
      water: 'Low to moderate',
      light: 'Full sun to partial shade',
      soil: 'Well-drained, sandy or rocky',
      bloomTime: 'Early spring',
      height: '6-8 inches',
      spacing: '8-12 inches',
      maintenance: 'Low'
    },
    {
      id: '5',
      name: 'Blanket Flower',
      description: 'Drought-tolerant perennial',
      detailedDescription: 'The Blanket Flower (Gaillardia aristata) is a colorful, drought-tolerant perennial native to Colorado. It produces daisy-like flowers with red centers and yellow tips. The plant blooms throughout the summer and attracts butterflies and other pollinators.',
      water: 'Low',
      light: 'Full sun',
      soil: 'Well-drained, tolerates poor soils',
      bloomTime: 'Summer to fall',
      height: '12-18 inches',
      spacing: '12-18 inches',
      maintenance: 'Low'
    },
    {
      id: '6',
      name: 'Prairie Zinnia',
      description: 'Low-growing wildflower',
      detailedDescription: 'The Prairie Zinnia (Zinnia grandiflora) is a low-growing wildflower native to Colorado. It produces small, yellow, daisy-like flowers throughout the summer. The plant forms a mat-like ground cover and is extremely drought-tolerant.',
      water: 'Very low',
      light: 'Full sun',
      soil: 'Well-drained, sandy or rocky',
      bloomTime: 'Summer',
      height: '4-8 inches',
      spacing: '12-18 inches',
      maintenance: 'Very low'
    },
    {
      id: '7',
      name: 'Sulphur Flower',
      description: 'Drought-tolerant groundcover',
      detailedDescription: 'The Sulphur Flower (Eriogonum umbellatum) is a drought-tolerant groundcover native to Colorado. It produces clusters of bright yellow flowers on short stems. The plant forms a low mat and is excellent for rock gardens and xeriscaping.',
      water: 'Very low',
      light: 'Full sun',
      soil: 'Well-drained, sandy or rocky',
      bloomTime: 'Late spring to summer',
      height: '4-10 inches',
      spacing: '12-18 inches',
      maintenance: 'Very low'
    },
    {
      id: '8',
      name: 'Rocky Mountain Penstemon',
      description: 'Vibrant blue-purple flowers',
      detailedDescription: 'The Rocky Mountain Penstemon (Penstemon strictus) is a stunning wildflower native to Colorado. It produces spikes of vibrant blue-purple tubular flowers that attract hummingbirds and bees. The plant is drought-tolerant once established.',
      water: 'Low',
      light: 'Full sun to partial shade',
      soil: 'Well-drained',
      bloomTime: 'Late spring to early summer',
      height: '18-36 inches',
      spacing: '12-18 inches',
      maintenance: 'Low'
    },
    {
      id: '9',
      name: 'Chocolate Flower',
      description: 'Smells like chocolate in the morning',
      detailedDescription: 'The Chocolate Flower (Berlandiera lyrata) is a unique wildflower native to Colorado. It produces yellow daisy-like flowers that emit a chocolate scent, especially in the morning. The plant is drought-tolerant and attracts butterflies.',
      water: 'Low',
      light: 'Full sun',
      soil: 'Well-drained',
      bloomTime: 'Summer to fall',
      height: '12-18 inches',
      spacing: '12-18 inches',
      maintenance: 'Low'
    },
    {
      id: '10',
      name: 'Scarlet Globemallow',
      description: 'Orange-red flowers on silver foliage',
      detailedDescription: 'The Scarlet Globemallow (Sphaeralcea coccinea) is a drought-tolerant wildflower native to Colorado. It produces bright orange-red flowers on silver-gray foliage. The plant is extremely hardy and can thrive in harsh conditions.',
      water: 'Very low',
      light: 'Full sun',
      soil: 'Well-drained, tolerates poor soils',
      bloomTime: 'Late spring to summer',
      height: '6-12 inches',
      spacing: '12-18 inches',
      maintenance: 'Very low'
    },
    {
      id: '11',
      name: 'Prairie Coneflower',
      description: 'Yellow daisy-like flowers',
      detailedDescription: 'The Prairie Coneflower (Ratibida columnifera) is a wildflower native to Colorado. It produces distinctive yellow daisy-like flowers with drooping petals and elongated central cones. The plant is drought-tolerant and attracts butterflies and birds.',
      water: 'Low',
      light: 'Full sun',
      soil: 'Well-drained',
      bloomTime: 'Summer to fall',
      height: '18-30 inches',
      spacing: '12-18 inches',
      maintenance: 'Low'
    },
    {
      id: '12',
      name: 'Blue Grama Grass',
      description: 'Native prairie grass',
      detailedDescription: 'Blue Grama Grass (Bouteloua gracilis) is a native prairie grass of Colorado. It forms dense clumps and produces distinctive seed heads that resemble eyelashes. The grass is extremely drought-tolerant and provides important habitat for wildlife.',
      water: 'Very low',
      light: 'Full sun',
      soil: 'Well-drained, tolerates poor soils',
      bloomTime: 'Summer',
      height: '12-18 inches',
      spacing: '12-18 inches',
      maintenance: 'Very low'
    },
  ];

  // Function to find plant by name
  const findPlantByName = (name) => {
    return plants.find(plant => plant.name === name) || null;
  };
  // Sample agenda items
  const [items, setItems] = useState({
    '2025-06-13': [{ name: 'Colorado Blue Columbine', time: '10:00 AM' }],
    '2025-06-14': [{ name: 'Prairie Zinnia', time: '09:00:00' }, { name: 'Blanket Flower', time: '14:00:00' }, { name: 'Sulphur Flower', time: '17:00:00' }],
    '2025-06-15': [{ name: 'Prairie Coneflower', time: '09:00:00' }, { name: 'Colorado Blue Columbine', time: '14:00:00' }],
    '2025-06-16': [{ name: 'Pasque Flower', time: '09:00:00' }, { name: 'Sulphur Flower', time: '14:00:00' }],
    '2025-06-17': [{ name: 'Colorado Blue Columbine', time: '09:00:00' }, { name: 'Blue Grama Grass', time: '14:00:00' }],
    '2025-06-19': [{ name: 'Prairie Zinnia', time: '09:00:00' }, { name: 'Blanket Flower', time: '14:00:00' }],
    '2025-06-20': [{ name: 'Prairie Coneflower', time: '09:00:00' }, { name: 'Colorado Blue Columbine', time: '14:00:00' }],
    '2025-06-21': [{ name: 'Pasque Flower', time: '09:00:00' }, { name: 'Sulphur Flower', time: '14:00:00' }],
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
        onPress={() => {
          const plant = findPlantByName(item.name);
          if (plant) {
            setExpandedPlant(plant);
          }
        }}
      >
        <View style={styles.itemTimeContainer}>
          <Text style={styles.itemTime}>{formatTime(item.time)}</Text>
        </View>
        <View style={styles.itemNameContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, [findPlantByName]);

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
    <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode="cover"
        style={styles.background}>
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
              sections={Object.keys(items).map(date => ({
                title: date,
                data: items[date].map(item => ({
                  ...item,
                  date,
                }))
              }))}
              renderItem={renderItem}
              keyExtractor={item => item.date + '-' + item.name + '-' + item.time}
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
