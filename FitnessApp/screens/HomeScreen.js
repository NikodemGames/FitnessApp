import { StyleSheet, Text, View,  ScrollView,  TouchableOpacity, } from 'react-native'
import React, { useContext } from 'react'
import FitnessCards from '../components/FitnessCards'
import { FitnessItems } from '../Context'
import { Colours } from './Colours'
import { handleVibration } from '../screens/FitScreen';


const HomeScreen = ({ navigation }) => {
  const { minutes, calories, workout } = useContext(FitnessItems); //Using context.js to retrieve variables.


  const navigateToProfile = () => { 
    navigation.navigate('ProfileScreen'); //Using navigation object to navigate the user to another screen.
  };
  const navigateToWorkoutLog = () => {
    navigation.navigate('LogScreen');
  };
  const navigateToStepCounter = () => {
    navigation.navigate('StepCounter');
    handleVibration();
  };
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>GYM PRO</Text>

          <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigateToWorkoutLog}>
            <Text style={styles.buttonText}>Workout Log</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>{workout}</Text>
            <Text style={styles.workoutSubtitle}>SETS DONE</Text>

          </View>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>{calories}</Text> 
            <Text style={styles.workoutSubtitle}>KCAL</Text>
          </View>
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutTitle}>{minutes}</Text>
            <Text style={styles.workoutSubtitle}>MINUTES</Text>

          </View>
        </View>
        <TouchableOpacity style={styles.cardioButton} onPress={navigateToStepCounter}>
          <Text style={styles.cardioButtonText}>CARDIO</Text>
        </TouchableOpacity>
        <FitnessCards />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.darkGreen,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: Colours.white,
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colours.black,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  workoutInfo: {
    alignItems: 'center',
  },
  workoutTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colours.white,
    fontSize: 18,
    marginBottom: 6,
  },
  workoutSubtitle: {
    color: Colours.white,
    fontSize: 17,
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '90%',
    height: 120,
    borderRadius: 7,
  },
  cardioButton: {
    backgroundColor: Colours.emerald,
    borderRadius: 15,
    paddingVertical: 40,
    marginVertical: 20,
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardioButtonText: {
    color: Colours.white,
    fontSize: 24,
    fontWeight: 'bold',
  }

});

export default HomeScreen;