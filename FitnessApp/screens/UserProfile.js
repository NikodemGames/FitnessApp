import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
      navigation.goBack();
    } catch (e) {
      console.log('Error saving user:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Age: {age}</Text>
      <Text style={styles.text}>Height: {height}</Text>
      <Text style={styles.text}>Weight: {weight}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={handleAgeChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        keyboardType="numeric"
        value={height}
        onChangeText={handleHeightChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={handleWeightChange}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    width: '80%',
  },
});

export default UserProfile;
