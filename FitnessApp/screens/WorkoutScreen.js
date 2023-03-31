import { StyleSheet, Text, View, Image, Pressable, ScrollView} from 'react-native'
import React, {useContext} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WorkoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <Image style={styles.image} source={{uri:route.params.image}}/>

        <Ionicons onPress={() => navigation.goBack()}
        style={styles.backButton} name="arrow-back-circle" size={30} color="white" />

        {route.params.excersises.map((item, index) => (
          <Pressable style={styles.pressable} key={index}>
            <Image style={styles.excersiseImage} source={{uri:item.image}}/> 

            <View style={styles.excersiseDetails}>
              <Text style={styles.excersiseName}>{item.name}</Text>

              <Text style={styles.excersiseSets}>x{item.sets}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable onPress={() => {
        navigation.navigate("Fit",{ excersises:route.params.excersises, 
        })
      }}
      style={styles.startButton}>
          <Text style={styles.startButtonText}>START</Text>
      </Pressable>
    </>
  );
};


export default WorkoutScreen

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: 170,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 20,
  },
  pressable: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  excersiseImage: {
    width: 90,
    height: 90,
  },
  excersiseDetails: {
    marginLeft: 15,
  },
  excersiseName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  excersiseSets: {
    marginTop: 4,
    fontSize: 18,
    color: "gray",
  },
  startButton: {
    backgroundColor: "black",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    borderRadius: 6,
    width: 100,
  },
  startButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
