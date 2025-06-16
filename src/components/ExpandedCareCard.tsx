import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLeaf, faTimes, faWater, faSun, faSeedling } from "@fortawesome/free-solid-svg-icons";

interface Plant {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  water: string;
  light: string;
  soil: string;
  bloomTime: string;
  height: string;
  spacing: string;
  maintenance: string;
}

interface ExpandedCareCardProps {
  plant: Plant;
  onClose: () => void;
}

const ExpandedCareCard: React.FC<ExpandedCareCardProps> = ({ plant, onClose }) => {
  // Get a random color for the plant icon
  const getRandomColor = () => {
    const colors = ['#4CAF50', '#8BC34A', '#CDDC39', '#009688', '#3F51B5', '#2196F3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <View style={styles.expandedCardContainer}>
      <View style={styles.expandedCardHeader}>
        <View style={styles.expandedCardTitle}>
          <FontAwesomeIcon icon={faLeaf} color={getRandomColor()} size={24}/>
          <Text style={styles.expandedCardTitleText}>{plant.name}</Text>
        </View>
        <TouchableOpacity onPress={onClose}>
          <FontAwesomeIcon icon={faTimes} color={'#2e7d32'} size={24} style={styles.closeButton}/>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.expandedCardScrollView}>
        <Text style={styles.expandedCardDescription}>{plant.detailedDescription}</Text>

        <View style={styles.careInfoSection}>
          <Text style={styles.careInfoTitle}>Care Information</Text>

          <View style={styles.careInfoItem}>
            <View style={styles.careInfoIcon}>
              <FontAwesomeIcon icon={faWater} size={20} color="#2196F3" />
            </View>
            <View style={styles.careInfoContent}>
              <Text style={styles.careInfoLabel}>Water</Text>
              <Text style={styles.careInfoValue}>{plant.water}</Text>
            </View>
          </View>

          <View style={styles.careInfoItem}>
            <View style={styles.careInfoIcon}>
              <FontAwesomeIcon icon={faSun} size={20} color="#FFC107" />
            </View>
            <View style={styles.careInfoContent}>
              <Text style={styles.careInfoLabel}>Light</Text>
              <Text style={styles.careInfoValue}>{plant.light}</Text>
            </View>
          </View>

          <View style={styles.careInfoItem}>
            <View style={styles.careInfoIcon}>
              <FontAwesomeIcon icon={faSeedling} size={20} color="#4CAF50" />
            </View>
            <View style={styles.careInfoContent}>
              <Text style={styles.careInfoLabel}>Soil</Text>
              <Text style={styles.careInfoValue}>{plant.soil}</Text>
            </View>
          </View>
        </View>

        <View style={styles.plantDetailsSection}>
          <Text style={styles.plantDetailsTitle}>Plant Details</Text>

          <View style={styles.plantDetailsRow}>
            <Text style={styles.plantDetailsLabel}>Bloom Time:</Text>
            <Text style={styles.plantDetailsValue}>{plant.bloomTime}</Text>
          </View>

          <View style={styles.plantDetailsRow}>
            <Text style={styles.plantDetailsLabel}>Height:</Text>
            <Text style={styles.plantDetailsValue}>{plant.height}</Text>
          </View>

          <View style={styles.plantDetailsRow}>
            <Text style={styles.plantDetailsLabel}>Spacing:</Text>
            <Text style={styles.plantDetailsValue}>{plant.spacing}</Text>
          </View>

          <View style={styles.plantDetailsRow}>
            <Text style={styles.plantDetailsLabel}>Maintenance:</Text>
            <Text style={styles.plantDetailsValue}>{plant.maintenance}</Text>
          </View>
        </View>

        <View style={styles.expandedCardFooter}>
          <Text style={styles.expandedCardFooterText}>
            Native to Colorado and perfect for your garden!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  expandedCardContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  expandedCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  expandedCardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expandedCardTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginLeft: 12,
  },
  closeButton: {
    margin: 0,
  },
  expandedCardScrollView: {
    flex: 1,
    padding: 16,
  },
  expandedCardDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  careInfoSection: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 16,
    borderRadius: 8,
  },
  careInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  careInfoItem: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  careInfoIcon: {
    width: 40,
    alignItems: 'center',
  },
  careInfoContent: {
    flex: 1,
  },
  careInfoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  careInfoValue: {
    fontSize: 16,
    color: '#333',
  },
  plantDetailsSection: {
    marginBottom: 24,
  },
  plantDetailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 16,
  },
  plantDetailsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  plantDetailsLabel: {
    width: 120,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  plantDetailsValue: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  expandedCardFooter: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f8f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  expandedCardFooterText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2e7d32',
    textAlign: 'center',
  },
});

export default ExpandedCareCard;
