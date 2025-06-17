import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground
} from 'react-native';
import { Text, Divider, IconButton } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAllPlants } from '../../state/slices/PlantsSlice';
import CareCard from '../CareCard';
import ExpandedCareCard from '../ExpandedCareCard';
import AlphabetSelector from '../AlphabetSelector';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

// Letter divider component
const LetterDivider = ({ letter }) => (
  <View style={styles.dividerContainer}>
    <Text style={styles.dividerLetter}>{letter}</Text>
    <Divider style={styles.divider} />
  </View>
);

const TabOne = () => {
  // Get plants from Redux store and sort them alphabetically
  const plants = [...useSelector(selectAllPlants)].sort((a, b) => a.name.localeCompare(b.name));

  // Reference to the FlatList
  const flatListRef = useRef(null);
  const [selectedLetter, setSelectedLetter] = useState('');
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

  // Create a combined list of letter dividers and plants
  const listData = useMemo(() => {
    // Create an array with all alphabet letters
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Initialize the result array
    const result:Array<object> = [];

    // Add all alphabet letters as dividers
    alphabet.forEach(letter => {
      // Add the letter divider
      result.push({
        id: `divider-${letter}`,
        type: 'divider',
        letter,
      });

      // Add all plants that start with this letter
      const plantsWithLetter = plants.filter(
        plant => plant.name.charAt(0).toUpperCase() === letter
      );

      plantsWithLetter.forEach(plant => {
        result.push({
          ...plant,
          type: 'plant'
        });
      });
    });

    return result;
  }, [plants]);

  // Extract available letters from plants (uppercase)
  const availableLetters = [...new Set(plants.map(plant =>
    plant.name.charAt(0).toUpperCase()
  ))];

  // Scroll to the letter divider
  const scrollToLetter = (letter) => {
    const index = listData.findIndex(item =>
      item.type === 'divider' && item.letter === letter
    );

    if (index !== -1) {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
      setSelectedLetter(letter);
    }
  };

  const renderItem = ({ item }) => {
    if (item.type === 'divider') {
      return <LetterDivider letter={item.letter} />;
    } else {
      return (
        <TouchableOpacity onPress={() => setExpandedPlant(item)}>
          <CareCard plantName={item.name} description={item.description} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode="cover"
        style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Garden (AI)ssistant</Text>
        </View>
        {expandedPlant ? (
          // Show expanded card when a plant is selected
          <ExpandedCareCard
            plant={expandedPlant}
            onClose={() => setExpandedPlant(null)}
          />
        ) : (
          // Show the alphabetical list when no plant is selected
          <View style={styles.container}>
            <FlatList
              ref={flatListRef}
              data={listData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.listContent}
              snapToAlignment="start"
              decelerationRate="fast"
              snapToInterval={0} // Set to 0 for smooth scrolling or to a specific value for snapping
              bounces={true}
              onScrollToIndexFailed={(info) => {
                console.warn('Scroll to index failed:', info);
              }}
            />
            {/* Alphabet selector on the right side */}
            <AlphabetSelector
              onSelectLetter={scrollToLetter}
              availableLetters={availableLetters}
            />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

export default TabOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e7d32',
    backgroundColor: 'transparent',
    textShadowColor: 'white',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  // Letter divider styles
  dividerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  dividerLetter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5f5f5',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  item: {
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
