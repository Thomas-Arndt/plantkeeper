import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWater, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CalendarUtils } from 'react-native-calendars';

interface WateringOptionsModalProps {
  visible: boolean;
  selectedItem: any;
  onClose: () => void;
  onMarkWatered: () => void;
  onPostponeWatering: () => void;
}

const WateringOptionsModal: React.FC<WateringOptionsModalProps> = ({
  visible,
  selectedItem,
  onClose,
  onMarkWatered,
  onPostponeWatering
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Watering Options</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <FontAwesomeIcon icon={faTimes} size={20} color="#333" />
            </TouchableOpacity>
          </View>

          {selectedItem && (
            <Text style={styles.modalPlantName}>{selectedItem.name}</Text>
          )}

          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity
              style={[styles.iconButton, styles.buttonWatered]}
              onPress={onMarkWatered}
            >
              <FontAwesomeIcon icon={faWater} size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconButton, styles.buttonPostpone]}
              onPress={onPostponeWatering}
            >
              <FontAwesomeIcon icon={faArrowRight} size={40} color="white" />
              <Text style={styles.plusOneText}>+1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e7d32',
  },
  modalPlantName: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconButton: {
    borderRadius: 50,
    padding: 20,
    elevation: 5,
    margin: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWatered: {
    backgroundColor: '#2196F3',
  },
  buttonPostpone: {
    backgroundColor: '#4CAF50',
    position: 'relative',
  },
  plusOneText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    bottom: 10,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
});

export default WateringOptionsModal;
