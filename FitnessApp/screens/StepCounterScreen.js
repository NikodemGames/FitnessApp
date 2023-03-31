import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colours } from './Colours';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';
import { handleVibration } from '../screens/FitScreen';


const StepCounterScreen = () => {
  //defining all the variables to calculate the number of calories burned based on step count
  const [stepCount, setStepCount] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [distance, setDistance] = useState(0);
  const [weight, setWeight] = useState(70); // assigned a default weight in kg
  const [height, setHeight] = useState(170)// assigned a default height in cm
  const navigation = useNavigation();

  const getUserData = async () => { //Retrieves data from AsyncStorage's item called 'user' and its contents.
    try {
      const userDataString = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      const userWeight = userData.weight; 
      const userHeight = userData.height; 
      setWeight(userWeight);//assigning the collected data to a new variable so it can be used in this script.
      setHeight(userHeight)
    } catch (e) {
      console.log('Error getting user data:', e); //If there's an error it is logged.
    }
  };
 
  useEffect(()=>{
    getUserData(); //Calls the function that collects data from async storage.
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
  }, [weight, height]);  // Only re-run this effect if the user's weight or height changes

  const navigateToStepResults = () => { //Navigates the user to summary of step workout.
    navigation.navigate('StepResults', {
      stepCount: stepCount,
      distance: distance,
      caloriesBurned: caloriesBurned,
    });
    handleVibration(); 
  };

  return ( //toFixed(2) rounded to 2 decimal places
    <View style={styles.container}>
      <Ionicons onPress={() => navigation.goBack()}
      style={{position:"absolute", top:60, left:20}} name="arrow-back-circle" size={30} color="white" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Cardio Workout</Text>
      </View>
      <Text style={styles.title}>Step Count:</Text>
      <Text style={styles.value}>{stepCount}</Text>

      <Text style={styles.title}>Distance:</Text>
    
      <Text style={styles.value}>{distance.toFixed(2)} km</Text> 

      <Text style={styles.title}>Calories Burned:</Text>
      <Text style={styles.value}>{caloriesBurned.toFixed(2)} kcal</Text>
      {/* <Text style={styles.title}>Weight:</Text>
      <Text style={styles.value}>{weight} kg</Text> */}
      
      
      <TouchableOpacity style={styles.button} onPress={navigateToStepResults}>
        <Text style={styles.buttonText}>Finish Workout</Text>
      </TouchableOpacity>

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
    fontSize: 40,
    fontWeight: 'bold',
    color: Colours.white,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colours.white,
    marginTop: 20,
    marginBottom: 10,
  },
  
  value: {
    fontSize: 24,
    textAlign: 'center',
    color: Colours.white,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colours.emerald,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: Colours.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default StepCounterScreen;
