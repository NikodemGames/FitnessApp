import { StyleSheet, Text, View, SafeAreaView, Image, Pressable} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const WorkoutScreen = () => {
    const route = useRoute();
    console.log(route.params)
    const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
      <Image style={{width: '100%', height: 170}} source={{uri:route.params.image}}/>

      <Entypo onPress={() => navigation.goBack()}
      style={{position:"absolute", top:50, left:20}} name="back" size={28} color="white" />

      
    </SafeAreaView>
  );
};

export default WorkoutScreen

const styles = StyleSheet.create({})