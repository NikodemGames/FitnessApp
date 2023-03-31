import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React, {useState,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const RestScreen = () => {
    const navigation = useNavigation();
    let timer =0;
    const [timeLeft,setTimeLeft] = useState(3); //Initialising timeLeft at 3

    const startTime = () => {  //Called every second reducing the timer. If timeLeft is 0 it navigates back and clears the timer.
        setTimeout(()=>{
            if(timeLeft<=0){
                navigation.goBack();
                clearTimeout(timer)
            }
            setTimeLeft(timeLeft-1)
        },1000)
    }
    useEffect(()=>{
        startTime();
        return()=>clearTimeout(timer);
    },)
  return (
    <SafeAreaView>
        <Image source={{uri:"https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/embedded/30340/rest-pvLJsu.jpg?resize=480:*"}} style={{width:"100%", height:420}}>
            
        </Image>
      <Text style={{fontSize:30, fontWeight:"900", marginTop:50, textAlign:"center"}}>TAKE A BREAK</Text>
      <Text style={{fontSize:40, fontWeight:"800", marginTop:50, textAlign:"center"}}>{timeLeft}</Text>
    </SafeAreaView>
  )
}

export default RestScreen

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 420,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: 50,
    textAlign: 'center',
  },
  timer: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 50,
    textAlign: 'center',
  },
})