import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import fitness from '../data/fitness'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { handleVibration } from '../screens/FitScreen';

const FitnessCards = () => {
const FitnessData = fitness;
const navigation = useNavigation();

return (
<View>
{FitnessData.map((item, key) => (
<Pressable
key={key}
onPress={() => {
navigation.navigate('Workout', {
image: item.image,
excersises: item.excersises,
id: item.id,
});
handleVibration();
}}
style={styles.cardContainer}>
<Image style={styles.image} source={{ uri: item.image }} />
<Text style={styles.title}>{item.name}</Text>
<MaterialCommunityIcons
         style={styles.icon}
         name="lightning-bolt"
         size={24}
         color="black"
       />
</Pressable>
))}
</View>
);
};
export default FitnessCards
const styles = StyleSheet.create({
cardContainer: {
alignItems: 'center',
justifyContent: 'center',
margin: 10,
},
image: {
width: '90%',
height: 140,
borderRadius: 7,
},
title: {
position: 'absolute',
color: 'white',
fontSize: 16,
fontWeight: 'bold',
left: 20,
top: 20,
},
icon: {
position: 'absolute',
color: 'white',
bottom: 15,
left: 20,
},
});

