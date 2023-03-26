import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const WorkoutScreen = () => {
    const route = useRoute();
    console.log(route.params)
    const navigation = useNavigation();
  return (
    <>
    <ScrollView style={{backgroundColor:"white", marginTop:50}}>
      <Image style={{width: '100%', height: 170}} source={{uri:route.params.image}}/>

      <Entypo onPress={() => navigation.goBack()}
      style={{position:"absolute", top:20, left:20}} name="back" size={28} color="white" />

      {route.params.excersises.map((item, index) => (
      <Pressable style = {{margin:10, flexDirection:"row", alignItems:"center"}} key = {index}>
        <Image style = {{width:90, height:90}} source={{uri:item.image}}/> 

        <View style = {{marginLeft:15,}}>
          <Text style={{fontSize:20, fontWeight:"bold"}}> {item.name}</Text>

          <Text style={{marginTop:4, fontSize:18, color:"gray"}}>x{item.sets}</Text>
        </View>
      </Pressable>
      ))}
    </ScrollView>

    <Pressable onPress={() => navigation.navigate("Fit",{ excersises:route.params.excersises, })}
    style = {{backgroundColor:"black", padding:10, marginLeft:"auto", marginRight:"auto", marginVertical:20, borderRadius:6, width:100}}>
        <Text style = {{textAlign:"center", color: "white", fontSize:15, fontWeight:"600"}}>START</Text>
    </Pressable>

    </>
  );
};

export default WorkoutScreen

const styles = StyleSheet.create({})