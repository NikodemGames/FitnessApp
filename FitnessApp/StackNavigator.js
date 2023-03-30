import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import FitScreen from './screens/FitScreen';
import RestScreen from './screens/RestScreen';
import StepCounterScreen from './screens/StepCounterScreen';
import UserProfile from './screens/UserProfile';
import ProfileScreen from './screens/ProfileScreen';
import WorkoutLogsScreen from './screens/WorkoutLogsScreen';

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Workout" component={WorkoutScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Fit" component={FitScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Rest" component={RestScreen} options= {{headerShown:false}} />
        <Stack.Screen name="StepCounter" component={StepCounterScreen} options= {{headerShown:false}}/>
        <Stack.Screen name="ProfileEdit" component={UserProfile} options= {{headerShown:false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options= {{headerShown:false}}/>
        <Stack.Screen name="LogScreen" component={WorkoutLogsScreen} options= {{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})