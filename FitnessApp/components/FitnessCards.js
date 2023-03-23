import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import fitness from '../data/fitness'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FitnessCards = () => {
    const FitnessData = fitness;
  return (
    <View>
        {FitnessData.map((item, key) => (
            <Pressable style={{alignItems:"center", justifyContent:"center",margin:10}} key={key}>
                <Image style={{width:"90%", height:140,borderRadius:7}} source={{uri:item.image}}>

                </Image>
                <Text style={{position:"absolute", color:"white", fontSize:16,fontWeight:"bold",left:20,top:20}}>{item.name}</Text>
                <MaterialCommunityIcons style={{position:"absolute", color:"white",bottom:15, left:20}} name="lightning-bolt" size={24} color="black" />
            </Pressable>
        ))}
    </View>
  )
}

export default FitnessCards

const styles = StyleSheet.create({})