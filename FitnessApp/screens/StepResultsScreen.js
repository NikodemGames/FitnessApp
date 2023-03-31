import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colours } from './Colours';
import { Ionicons } from '@expo/vector-icons';

const StepResultsScreen = ({ navigation, route }) => {
  const { stepCount, distance, caloriesBurned } = route.params; // Extract the values of "stepCount", "distance", and "caloriesBurned" from the "route" prop
  
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 60, left: 20 }}
        name="arrow-back-circle"
        size={30}
        color="white"
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Workout Summary</Text>
      </View>
      <Text style={styles.title}>Step Count:</Text>
      <Text style={styles.value}>{stepCount}</Text>

      <Text style={styles.title}>You Traveled {distance.toFixed(2)} km</Text>
      

      <Text style={styles.title}>Your Workout Burned {caloriesBurned.toFixed(2)} Calories</Text>
      
      <Text style={styles.title}>That was a Great Workout!</Text>

      <TouchableOpacity style={styles.button} onPress={navigateToHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.emerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: Colours.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colours.white,
  },
  title: {
    fontSize: 20,
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
    backgroundColor: Colours.black,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colours.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StepResultsScreen;