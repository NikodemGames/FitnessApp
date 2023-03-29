import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';


const StepCounterScreen = () => {
  //defining all the variables to calculate the number of calories burned based on step count
  const [stepCount, setStepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [distance, setDistance] = useState(0);
  const [weight, setWeight] = useState(70); // assigned a default weight 

  //pedometer counts number of steps
  useEffect(() => {
    console.log('watchStepCount called');
  const subscription = Pedometer.watchStepCount(result => {
    console.log('step count:', result.steps);
    setStepCount(result.steps);

    //calculates the distance in km based on the average length
    const distanceInMeters = result.steps * 0.75; // average step length is 75cm
    const distanceInKm = distanceInMeters / 1000; // convert to kilometers
    setDistance(distanceInKm);


    const caloriesBurnedValue = (weight * 3.5 * distanceInKm) / 200; // calories burned = weight x MET value for walking x distance
      setCaloriesBurned(caloriesBurnedValue);
    });

    return () => {
      subscription.remove();
    };
  }, [weight]);

  return (
    <View style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default StepCounterScreen;
