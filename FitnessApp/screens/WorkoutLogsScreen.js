import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Colours } from './Colours';

const WorkoutLogsScreen = ({ navigation }) => {
  const [workoutLogs, setWorkoutLogs] = useState([]);

  useEffect(() => {
    getWorkoutLogs();
  }, []);

  const getWorkoutLogs = async () => { // retrieving data from asyncstorage to display the dates and amount of workouts done on this log page.
    try {
      const jsonValue = await AsyncStorage.getItem('workoutLogs');
      const logs = jsonValue != null ? JSON.parse(jsonValue) : [];
      setWorkoutLogs(logs);
    } catch (e) {
      console.error('Error retrieving workout logs: ', e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back-circle" size={30} color={Colours.white} style={styles.backIcon} onPress={() => navigation.goBack()}/>
        <Text style={styles.headerText}>Workout Logs</Text>
      </View>
      <View style={styles.logsContainer}>
        {workoutLogs.map((log, index) => (
          <View style={styles.log} key={index}>
            <Text style={styles.logDate}>{new Date(log.date).toLocaleDateString()}</Text>
            <Text style={styles.logText}>{log.workout + 1} Completed Exercises</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.emerald,
  },
  header: {
    flex: 1,
    height: 180,
    backgroundColor: Colours.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colours.white,
  },
  logsContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  log: {
    width: '60%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colours.white,
    marginBottom: 20,
    alignItems: 'center',
  },
  logDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colours.black,
    marginBottom: 5,
  },
  logText: {
    fontSize: 12,
    color: Colours.black,
  },
});

export default WorkoutLogsScreen;
