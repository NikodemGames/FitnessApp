import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUserData(data);
      } catch (e) {
        console.log('Error getting user data:', e);
      }
    };
    getUserData();
  }, []);

  const handleEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text style={styles.text}>Age: {userData.age}</Text>
          <Text style={styles.text}>Height: {userData.height} cm</Text>
          <Text style={styles.text}>Weight: {userData.weight} kg</Text>
        </>
      ) : (
        <Text style={styles.text}>No user data found.</Text>
      )}
      <Button title="Edit Info" onPress={handleEdit} />
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
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Profile;
