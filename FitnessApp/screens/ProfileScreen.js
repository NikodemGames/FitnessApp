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
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Button title="Edit" onPress={handleEdit} />
      </View>
      {userData ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Name</Text>
            <Text style={styles.sectionText}>{userData.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Age</Text>
            <Text style={styles.sectionText}>{userData.age}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Height</Text>
            <Text style={styles.sectionText}>{userData.height} cm</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weight</Text>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
  },
});

export default Profile;
