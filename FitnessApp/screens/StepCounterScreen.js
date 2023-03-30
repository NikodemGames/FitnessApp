import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colours } from './Colours';


const StepCounterScreen = () => {
  //defining all the variables to calculate the number of calories burned based on step count
  const [stepCount, setStepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [distance, setDistance] = useState(0);
  const [weight, setWeight] = useState(70); // assigned a default weight in kg
  const [height, setHeight] = useState(170)// assigned a default height in cm
  const getUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      const userWeight = userData.weight;
      const userHeight = userData.height; 
      setWeight(userWeight);
      setHeight(userHeight)
    } catch (e) {
      console.log('Error getting user data:', e);
    }
  };
 
  useEffect(()=>{
    getUserData();
  },[]);

  //pedometer counts number of steps
  useEffect(() => {
    console.log('watchStepCount called');
  const subscription = Pedometer.watchStepCount(result => {
    console.log('step count:', result.steps);
    setStepCount(result.steps);

    //calculates the distance based on users estemated step length
    const strideLength = height * 0.415; // estimate of average stride length based on the users height
    const distanceInMeters = result.steps * strideLength / 100; // Convert stride length to meters
    setDistance(distanceInMeters /1000);
    console.log('stride length: ', strideLength); 

    const caloriesBurnedValue = (weight * 3.5 * distanceInMeters/1000); // calories burned = weight x MET value for walking x distance 
      setCaloriesBurned(caloriesBurnedValue); 

    });

    return () => {
      subscription.remove();
    };
  }, [weight, height]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cardio Workout</Text>
      </View>
      <Text style={styles.title}>Step Count:</Text>
      <Text style={styles.value}>{stepCount}</Text>

      <Text style={styles.title}>Distance:</Text>
      <Text style={styles.value}>{distance.toFixed(2)} km</Text>

      <Text style={styles.title}>Calories Burned:</Text>
      <Text style={styles.value}>{caloriesBurned.toFixed(2)} kcal</Text>

      <Text style={styles.title}>Weight:</Text>
      <Text style={styles.value}>{weight} kg</Text>
    </View>
  ); 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: Colours.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colours.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colours.white,
    marginTop: 20,
    marginBottom: 10,
  },
  value: {
    fontSize: 36,
    textAlign: 'center',
    color: Colours.white,
    marginBottom: 20,
    
  },
});

export default StepCounterScreen;
