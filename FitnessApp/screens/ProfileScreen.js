import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colours } from './Colours';
import { Ionicons } from '@expo/vector-icons';


const Profile = () => {
  const [userData, setUserData] = useState(null); //This will store the user data
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => { //Retrieving item 'user' from asyncstorage with data to update this page.
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUserData(data);
      } catch (e) { //Catching any errors with retrieving the data.
        console.log('Error getting user data:', e);
      }
    };
    getUserData();
  }, []);

  const handleEdit = () => {
    navigation.navigate('ProfileEdit'); //Takes the user to the edit screen when called.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Ionicons name="arrow-back-circle" size={30} color={Colours.white} style={styles.backIcon} onPress={() => navigation.goBack()}/> 
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}> 
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      {userData ? ( // Display userData and its contents if available.
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Name:</Text>
            <Text style={styles.sectionText}>{userData.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age:</Text>
            <Text style={styles.sectionText}>{userData.age}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Height:</Text>
            <Text style={styles.sectionText}>{userData.height} cm</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weight:</Text>
            <Text style={styles.sectionText}>{userData.weight} kg</Text>
          </View>
        </>
      ) : ( //If no user data is available display this.
        <Text style={styles.text}>No user data found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.emerald,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colours.black,
  },
  editButton: {
    backgroundColor: Colours.darkGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  editButtonText: {
    color: Colours.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colours.black,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 20,
    color: Colours.white,
  },
  text: {
    fontSize: 24,
    color: Colours.black,
    textAlign: 'center',
  },
});

export default Profile;
