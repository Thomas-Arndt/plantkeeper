import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
//import { useCameraDevice, Camera } from 'react-native-vision-camera';

const TabTwo = () => {
  //const device = useCameraDevice('back');
  return (
      <SafeAreaView style={styles.container}>
        {/*<Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            video={false}
        />*/}
        <View style={styles.wrapper}>
          <FontAwesomeIcon icon={faCamera} size={96} color="lightgrey" />
        </View>
      </SafeAreaView>
  )
}
export default TabTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  }
});
