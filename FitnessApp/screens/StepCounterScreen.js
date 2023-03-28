import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';

const StepCounterScreen = () => {
  const [stepCount, setStepCount] = useState(0);

  useEffect(() => {
    console.log('watchStepCount called');
  const subscription = Pedometer.watchStepCount(result => {
    console.log('step count:', result.steps);
    setStepCount(result.steps);
    });

    return () => {
      console.log('subscription removed');
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.stepCountText}>Step Count: {stepCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCountText: {
    fontSize: 24,
  },
});

export default StepCounterScreen;
