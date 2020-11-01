import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '@screens/Home';
import ImageDetails from '@screens/ImageDetails';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
              title: 'My Bills'
          }}
        />
        <Stack.Screen
          name="ImageDetails"
          component={ImageDetails}
          options={{
              title: 'Bill'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
