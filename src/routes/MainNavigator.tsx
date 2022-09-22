import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home/Home';
import Post from '../screens/Post/Post';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="SplashScreen" component={Splash} />
        <MainStack.Screen name="LoginScreen" component={Login} />
        <MainStack.Screen name="RegisterScreen" component={Register} />
        <MainStack.Screen name="HomeScreen" component={Home} />
        <MainStack.Screen name="PostScreen" component={Post} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
