import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colours } from './Colours';

const UserProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          setName(data.name);
          setAge(data.age);
          setHeight(data.height);
          setWeight(data.weight);
        }
      } catch (e) {
        console.log('Error retrieving user:', e);
      }
    };
    fetchData();
  }, []);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAgeChange = (value) => {
    setAge(value);
  };

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleSave = async () => {
    try {
      const userData = {
        name: name,
        age: age,
        height: height,
        weight: weight,
      };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log('User data saved successfully!');
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error saving user:', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={handleNameChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={handleAgeChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height (cm)</Text>
        <TextInput
          style={styles.input}
          placeholder="Height"
          keyboardType="numeric"
          value={height}
          onChangeText={handleHeightChange}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput
          style={styles.input}
          placeholder="Weight"
          keyboardType="numeric"
          value={weight}
          onChangeText={handleWeightChange}
        />
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.black,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: Colours.emerald,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: Colours.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colours.white,
    marginBottom: 5,
  },
  input: {
    backgroundColor: Colours.white,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    color: Colours.black,
  },
  header: {
    marginBottom: 40,
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colours.black,
    textAlign: 'center',
  },
});


export default UserProfile;




