import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView} from 'react-native'
import React, {useContext} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { FitnessItems } from '../Context';
import { FontAwesome } from '@expo/vector-icons';

const WorkoutScreen = () => {
    const route = useRoute();
    // console.log(route.params)
    const navigation = useNavigation();
    const {completed, setCompleted} = useContext(FitnessItems);
  return (
    <>
    <ScrollView style={{backgroundColor:"white", marginTop:50}}>
      <Image style={{width: '100%', height: 170}} source={{uri:route.params.image}}/>

      <Ionicons onPress={() => navigation.goBack()}
      style={{position:"absolute", top:10, left:20}} name="arrow-back-circle" size={30} color="white" />
      

      {route.params.excersises.map((item, index) => (
      <Pressable style = {{margin:10, flexDirection:"row", alignItems:"center"}} key = {index}>
        <Image style = {{width:90, height:90}} source={{uri:item.image}}/> 

        <View style = {{marginLeft:15,}}>
          <Text style={{fontSize:20, fontWeight:"bold"}}> {item.name}</Text>

          <Text style={{marginTop:4, fontSize:18, color:"gray"}}>x{item.sets}</Text>
        </View>

        {completed.includes(item.name) ? (
          <FontAwesome name="check-circle" size={24} color="green" />
        ) : (
          null
        )}
      </Pressable>
      ))}
    </ScrollView>

    <Pressable onPress={() => {
      navigation.navigate("Fit",{ excersises:route.params.excersises, 
      })
      setCompleted([]); 
    }}
    style = {{backgroundColor:"black", padding:10, marginLeft:"auto", marginRight:"auto", marginVertical:20, borderRadius:6, width:100}}>
        <Text style = {{textAlign:"center", color: "white", fontSize:15, fontWeight:"600"}}>START</Text>
    </Pressable>

    </>
  );
};

export default WorkoutScreen

const styles = StyleSheet.create({})