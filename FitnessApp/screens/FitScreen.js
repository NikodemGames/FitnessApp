import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, Vibration} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { FitnessItems } from '../Context'
import fitness from '../data/fitness'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function handleVibration() {
  if (Vibration.vibrate) {
    Vibration.vibrate(500);
  } else {
    console.log('Vibration API is not available on this device');
  }
}




const FitScreen = () => {
    const route = useRoute ();
    const navigation = useNavigation();
    const [index, setIndex] = useState(0); 
    const excersise = route.params.excersises;
    const current = excersise[index];
    // console.log(current, "first exercise")
    const {completed, setCompleted, minutes, setMinutes, calories, setCalories, workout, setWorkout} = useContext(FitnessItems);
    console.log(workout, "completed exercise");

    const saveWorkoutLog = async (date, workout) => {
      try {
        const log = { date, workout };
        const existingLogs = await AsyncStorage.getItem('workoutLogs');
        const newLogs = existingLogs ? JSON.parse(existingLogs).concat(log) : [log];
        await AsyncStorage.setItem('workoutLogs', JSON.stringify(newLogs));
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleWorkoutComplete = async () => {
      await saveWorkoutLog(new Date(), workout);
      navigation.navigate("Home");
      handleVibration();
    }

    
    
  return (
    <SafeAreaView>
      
      <Image style ={{width:"100%", height:300}} source = {{uri:current.image}}/>
      <Text style = {{marginLeft:"auto", marginRight:"auto", marginTop:30, fontSize:30, fontWeight:"bold"}}>{current.name}</Text>
      <Text style = {{marginLeft:"auto", marginRight:"auto", marginTop:30, fontSize:40, fontWeight:"bold"}}>x{current.sets}</Text>
      
      {index +1 >= excersise.length ? (
        <Pressable onPress={handleWorkoutComplete} 
        style ={{backgroundColor:"black", padding:10, marginLeft:"auto", marginRight:"auto", marginVertical:20, borderRadius:20, width:100}}>
          <Text style = {{textAlign:"center", fontWeight:"bold", fontSize:20, color:"white"}}>Finish</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => {
          navigation.navigate("Rest")
          setCompleted(...completed,current.name)
          setWorkout(workout+1)
          setMinutes(minutes+2.5)
          setCalories(calories+6.30)
          setTimeout(()=>{
            setIndex(index+1)
          },2000)
          handleVibration();
        }} style ={{backgroundColor:"black", padding:10, marginLeft:"auto", marginRight:"auto", marginVertical:20, borderRadius:20, width:100}}>
          <Text style = {{textAlign:"center", fontWeight:"bold", fontSize:20, color:"white"}}>Finish</Text>
        </Pressable>
      )}

      
      <Pressable style={{flexDirection:"row",alignItems:"center",marginLeft:"auto",marginRight:"auto", marginTop:80}}>
        <Pressable 
        disabled={index===0}
        onPress={()=>{
          navigation.navigate("Rest");
          setTimeout(()=>{
              setIndex(index-1)
          },2000)
        }}
        style={{backgroundColor:"green",padding:10,borderRadius:20,marginHorizontal:20,width:120}}>
          <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>PREVIOUS</Text>
        </Pressable>
        {index +1 >= excersise.length ? (
          <Pressable
          onPress={() => {
            navigation.navigate("Home")
          }}
          style={{backgroundColor:"red",padding:10,borderRadius:20,marginHorizontal:20,width:120}}>
          <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>SKIP</Text>
        </Pressable>
        ) : (
          <Pressable
          onPress={() => {
            navigation.navigate("Rest")
            setTimeout(()=>{
              setIndex(index+1)
            },2000)
          }}  
          style={{backgroundColor:"red",padding:10,borderRadius:20,marginHorizontal:20,width:120}}>
          <Text style={{color:"white",fontWeight:"bold",textAlign:"center"}}>SKIP</Text>
        </Pressable>
        )}
        
      </Pressable>
    </SafeAreaView>
  )
}

export default FitScreen

const styles = StyleSheet.create({})