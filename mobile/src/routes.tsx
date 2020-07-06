import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Transactions from './pages/Transactions';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode='none'
        screenOptions={{
          cardStyle: { backgroundColor: '#f0f0f5' },
        }}
      >
        <AppStack.Screen name='Home' component={Home} />
        <AppStack.Screen name='Transactions' component={Transactions} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
