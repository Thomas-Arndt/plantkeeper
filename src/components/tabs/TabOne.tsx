import React, { useRef, useState, useEffect, useMemo } from 'react';
import {View, StyleSheet, FlatList, SafeAreaView, Animated, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { Text, Divider } from 'react-native-paper';
import CareCard from '../CareCard';
import AlphabetSelector from '../AlphabetSelector';

// Letter divider component
const LetterDivider = ({ letter }) => (
  <View style={styles.dividerContainer}>
    <Text style={styles.dividerLetter}>{letter}</Text>
    <Divider style={styles.divider} />
  </View>
);

const TabOne = () => {
  // List of Colorado native plants - sorted alphabetically
  const plants = [
    { id: '1', name: 'Colorado Blue Columbine', description: 'The state flower of Colorado' },
    { id: '2', name: 'Rocky Mountain Juniper', description: 'Evergreen tree native to Colorado' },
    { id: '3', name: 'Ponderosa Pine', description: 'Common in Colorado forests' },
    { id: '4', name: 'Pasque Flower', description: 'Early spring bloomer' },
    { id: '5', name: 'Blanket Flower', description: 'Drought-tolerant perennial' },
    { id: '6', name: 'Prairie Zinnia', description: 'Low-growing wildflower' },
    { id: '7', name: 'Sulphur Flower', description: 'Drought-tolerant groundcover' },
    { id: '8', name: 'Rocky Mountain Penstemon', description: 'Vibrant blue-purple flowers' },
    { id: '9', name: 'Chocolate Flower', description: 'Smells like chocolate in the morning' },
    { id: '10', name: 'Scarlet Globemallow', description: 'Orange-red flowers on silver foliage' },
    { id: '11', name: 'Prairie Coneflower', description: 'Yellow daisy-like flowers' },
    { id: '12', name: 'Blue Grama Grass', description: 'Native prairie grass' },
  ].sort((a, b) => a.name.localeCompare(b.name));

  // Reference to the FlatList
  const flatListRef = useRef(null);
  const [selectedLetter, setSelectedLetter] = useState('');

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
      return <TouchableOpacity onPress={() => Alert.alert('Item pressed', item.name)}><CareCard plantName={item.name} description={item.description} /></TouchableOpacity>;
    }
  };

  // Render header component with title
  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Care Cards</Text>
      <Text style={styles.subheader}>Colorado Native Plants</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={listData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={ListHeaderComponent}
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
    </SafeAreaView>
  );
}

export default TabOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2e7d32',
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
    backgroundColor: '#f5f5f5',
  },
  dividerLetter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#2e7d32',
  },
  item: {
    backgroundColor: 'white',
  },
});
