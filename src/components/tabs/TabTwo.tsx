import React from 'react';
import { View, StyleSheet } from 'react-native';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
//import { useCameraDevice, Camera } from 'react-native-vision-camera';

const TabTwo = () => {
  //const device = useCameraDevice('back');
  return (
      <View style={styles.container}>
        {/*<Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            video={false}
        />*/}
        <FontAwesomeIcon icon={faCamera} size={24} color="grey" />
      </View>
  )
}
export default TabTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
});
