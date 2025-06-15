import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faCamera, faLayerGroup, faEye} from '@fortawesome/free-solid-svg-icons';
import TabOne from './tabs/TabOne.tsx';
import TabTwo from './tabs/TabTwo.tsx';
import TabThree from './tabs/TabThree.tsx';
import {Alert, StyleSheet, View} from "react-native";

const TabMainNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={({ navigation, state, descriptors, insets }) => (
              <BottomNavigation.Bar
                  navigationState={state}
                  safeAreaInsets={insets}
                  style={{display: 'flex'}}
                  onTabPress={({ route, preventDefault }) => {
                    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (event.defaultPrevented) {
                      preventDefault();
                    } else if (isFocused && route.name === 'Camera') {
                      Alert.alert('Camera is not available yet');
                    } else {
                      navigation.dispatch({
                        ...CommonActions.navigate(route.name, route.params),
                        target: state.key,
                      });
                    }
                  }}
                  renderIcon={({ route, focused, color }) => {
                    const { options } = descriptors[route.key];
                    if (options.tabBarIcon) {
                      if (route.name === 'Camera' && focused) {
                        return (
                            <View style={styles.cameraOuterCircle}>
                              <View style={styles.cameraInnerCircle}>
                                <FontAwesomeIcon icon={faCamera} size={24} color="white" />
                              </View>
                            </View>
                        );
                      }
                      else{
                        return options.tabBarIcon({ focused, color, size: 24 });
                      }
                    }

                    return null;
                  }}
                  getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

                    if (route.name === 'Camera') {
                      return isFocused ? null : 'Identify';
                    }

                    let label = options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                    return label;
                  }}
              />
          )}
      >
        <Tab.Screen
            name="Care Cards"
            component={TabOne}
            options={{
              tabBarLabel: 'Care Cards',
              tabBarIcon: ({ color, size }) => {
                return <FontAwesomeIcon icon={faLayerGroup} size={size} color={color} />;
              },
            }}
        />
        <Tab.Screen
            name="Camera"
            component={TabTwo}
            options={{
              tabBarLabel: 'Identify',
              tabBarIcon: ({ color, size }) => {
                return  <FontAwesomeIcon icon={faEye} size={size} color={color} />;
              },
            }}
        />
        <Tab.Screen
            name="Calendar"
            component={TabThree}
            options={{
              tabBarLabel: 'Calendar',
              tabBarIcon: ({ color, size }) => {
                return <FontAwesomeIcon icon={faCalendar} size={size} color={color} />;
              },
            }}
        />
      </Tab.Navigator>
  );
};
export default TabMainNavigation;

const styles = StyleSheet.create({
  cameraOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3D3D3', // light gray outer ring
    justifyContent: 'center',
    alignItems: 'center',
    top: -15, // lift above tab bar slightly
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  cameraInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#808080', // dark gray inner button
    justifyContent: 'center',
    alignItems: 'center',
  },
});
