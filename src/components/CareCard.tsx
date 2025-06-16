import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLeaf} from "@fortawesome/free-solid-svg-icons";

interface CareCardProps {
  plantName: string;
  description?: string;
}

const CareCard: React.FC<CareCardProps> = ({ plantName, description = 'Native Colorado plant' }) => {
  // Get a random color for the plant avatar
  const getRandomColor = () => {
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#009688', '#3F51B5', '#2196F3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (

    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <FontAwesomeIcon icon={faLeaf} color={getRandomColor()} size={24}/>
          <Title style={styles.title}>{plantName}</Title>
        </View>
        <Paragraph style={styles.description}>{description}</Paragraph>
        <View style={styles.careInfo}>
          <View style={styles.careItem}>
            <Text style={styles.careLabel}>Water</Text>
            <Text>Weekly</Text>
          </View>
          <View style={styles.careItem}>
            <Text style={styles.careLabel}>Light</Text>
            <Text>Full Sun</Text>
          </View>
          <View style={styles.careItem}>
            <Text style={styles.careLabel}>Soil</Text>
            <Text>Well-drained</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 12,
    color: '#666',
  },
  careInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  careItem: {
    alignItems: 'center',
  },
  careLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
});

export default CareCard;
