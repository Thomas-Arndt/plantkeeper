import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from './style/themes';
import TabMainNavigation from './components/TabMainNavigation';
import {RootState} from '@reduxjs/toolkit/query';


const Index = () => {
  const Stack = createStackNavigator();

  const darkMode = useSelector((state: RootState<any, any, any>) => state.darkMode);
  return (
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Index">
            <Stack.Screen
                name="Index"
                component={TabMainNavigation}
                options={{
                  title: '',
                  headerShown: false,
                  gestureEnabled: false,
                }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
};
export default Index;

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});*/
