import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/views/home';
import Login from './src/views/login';
import TweetDetail from './src/views/tweet-detail';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="tweet-detail" component={TweetDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
