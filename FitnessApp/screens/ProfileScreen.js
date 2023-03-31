import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colours } from './Colours';


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
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      {userData ? (
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
      ) : (
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
