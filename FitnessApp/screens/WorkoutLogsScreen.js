import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutLogsScreen = () => {
    const [workoutLogs, setWorkoutLogs] = useState([]);
  
    useEffect(() => {
      getWorkoutLogs();
    }, []);
  
    const getWorkoutLogs = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('workoutLogs');
        const logs = jsonValue != null ? JSON.parse(jsonValue) : [];
        setWorkoutLogs(logs);
      } catch (e) {
        console.error('Error retrieving workout logs: ', e);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Workout Logs</Text>
        {workoutLogs.map((log, index) => (
          <View style={styles.log} key={index}>
<Text style={styles.logText}>{new Date(log.date).toLocaleDateString()} - {log.workout}</Text>

            {log.completed && <Text style={styles.logText}>{log.completed.join(' , ')}</Text>}
          </View>
        ))}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  log: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logText: {
    fontSize: 18,
  },
});

export default WorkoutLogsScreen;
