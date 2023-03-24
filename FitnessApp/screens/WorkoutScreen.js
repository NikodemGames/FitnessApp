import { StyleSheet, Text, View, SafeAreaView, Image} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const WorkoutScreen = () => {
    const route = useRoute();
    console.log(route.params)
  return (
    <SafeAreaView>
      <Image style={{width: '100%', height: 170}} source={{uri:route.params.image}}/>
    </SafeAreaView>
  )
}

export default WorkoutScreen

const styles = StyleSheet.create({})