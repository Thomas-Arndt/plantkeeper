import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar, faCamera, faLayerGroup} from '@fortawesome/free-solid-svg-icons';
import TabOne from './tabs/TabOne.tsx';
import TabTwo from './tabs/TabTwo.tsx';
import TabThree from './tabs/TabThree.tsx';

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
                  style={{display: navigation.getState().routes[navigation.getState().index].name === 'Checkin' ? 'none' : 'flex'}}
                  onTabPress={({ route, preventDefault }) => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
                    if (event.defaultPrevented) {
                      preventDefault();
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
                      return options.tabBarIcon({ focused, color, size: 24 });
                    }

                    return null;
                  }}
                  getLabelText={({ route }) => {
                    const { options } = descriptors[route.key];
                    return options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
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
              tabBarLabel: 'Camera',
              tabBarIcon: ({ color, size }) => {
                return <FontAwesomeIcon icon={faCamera} size={size} color={color} />;
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
