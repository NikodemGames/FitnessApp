import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

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

  const handleSubmit = () => {
    console.log(`Name: ${name}, Age: ${age}, Height: ${height}, Weight: ${weight}`);
    // You can replace the console.log statement with code that handles the form data, such as submitting it to a server or saving it to local storage.
  };


  return (
    <View style={styles.container}>
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
