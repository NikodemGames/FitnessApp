import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, Vibration } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FitnessItems } from '../Context'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function handleVibration() {
  if (Vibration.vibrate) {
    Vibration.vibrate(500);
  } else {
    console.log('Vibration API is not available on this device');
  }
}

const FitScreen = () => {
  const route = useRoute ();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];
  const { completed, setCompleted, minutes, setMinutes, calories, setCalories, workout, setWorkout } = useContext(FitnessItems);
  console.log(workout, "completed exercise");

  const saveWorkoutLog = async (date, workout) => {
    try {
      const log = { date, workout };
      const existingLogs = await AsyncStorage.getItem('workoutLogs');
      const newLogs = existingLogs ? JSON.parse(existingLogs).concat(log) : [log];
      await AsyncStorage.setItem('workoutLogs', JSON.stringify(newLogs));
    } catch (error) {
      console.log(error);
    }
  }

  const handleWorkoutComplete = async () => {
    await saveWorkoutLog(new Date(), workout);
    navigation.navigate("Home");
    handleVibration();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={{ uri: current.image }} />
      <Text style={styles.title}>{current.name}</Text>
      <Text style={styles.sets}>x{current.sets}</Text>

      {index + 1 >= excersise.length ? (
        <Pressable onPress={handleWorkoutComplete} style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => {
          navigation.navigate("Rest")
          setCompleted(...completed, current.name)
          setWorkout(workout + 1)
          setMinutes(minutes + 0.5)
          setCalories(calories + 60)
          setTimeout(() => {
            setIndex(index + 1)
          }, 2000)
          handleVibration();
        }} style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </Pressable>
      )}

    </SafeAreaView>
  )
}

export default FitScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    borderRadius: 20,
    width: 100,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  sets: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    fontSize: 40,
    fontWeight: 'bold',
  },
});
