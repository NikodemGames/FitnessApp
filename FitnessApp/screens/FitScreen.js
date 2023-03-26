import { StyleSheet, Text, View, SafeAreaView, Image, Pressable} from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'

const FitScreen = () => {
    const route = useRoute ();
    console.log(route.params);
    const [index, setIndex] = useState(0);
    const excersise = route.params.excersises;
    const current = excersise[index];
    console.log(current, "first exercise")
  return (
    <SafeAreaView>
      <Image style ={{width:"100%", height:300}} source = {{uri:current.image}}/>
      <Text style = {{marginLeft:"auto", marginRight:"auto", marginTop:30, fontSize:30, fontWeight:"bold"}}>{current.name}</Text>
      <Text style = {{marginLeft:"auto", marginRight:"auto", marginTop:30, fontSize:40, fontWeight:"bold"}}>x{current.sets}</Text>

      <Pressable style ={{backgroundColor:"black", padding:10, marginLeft:"auto", marginRight:"auto", marginVertical:20, borderRadius:20, width:100}}>
        <Text style = {{textAlign:"center", fontWeight:"bold", fontSize:20, color:"white"}}>Finish</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default FitScreen

const styles = StyleSheet.create({})