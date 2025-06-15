import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AlphabetSelectorProps {
  onSelectLetter: (letter: string) => void;
  availableLetters: string[]; // Letters that have corresponding plants
}

const AlphabetSelector: React.FC<AlphabetSelectorProps> = ({
  onSelectLetter,
  availableLetters
}) => {
  // Full alphabet A-Z
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <View style={styles.container}>
      {alphabet.map((letter) => {
        const isAvailable = availableLetters.includes(letter);

        return (
          <TouchableOpacity
            key={letter}
            onPress={() => isAvailable && onSelectLetter(letter)}
            disabled={!isAvailable}
            style={styles.letterContainer}
          >
            <Text
              style={[
                styles.letter,
                !isAvailable && styles.disabledLetter
              ]}
            >
              {letter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -200 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 5,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center',
  },
  letterContainer: {
    paddingVertical: 2,
  },
  letter: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2e7d32',
  },
  disabledLetter: {
    color: '#cccccc',
    fontWeight: 'normal',
  },
});

export default AlphabetSelector;
