import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button } from 'react-native'
import React, {useContext} from 'react'
import FitnessCards from '../components/FitnessCards'
import { FitnessItems } from '../Context'

const HomeScreen = ({navigation}) => {
    const { minutes,  calories, workout } = useContext(FitnessItems);
    return (
        <ScrollView style={{marginTop:50}}>
            <View style={styles.container}>
  <Text style={styles.title}>HOME WORKOUT</Text>
  <Button style={styles.button} title="Step Counter" onPress={() => navigation.navigate('StepCounter')} />
  <View style={styles.row}>
    <View style={styles.workoutInfo}>
      <Text style={styles.workoutTitle}>{workout}</Text>
      <Text style={styles.workoutSubtitle}>WORKOUT</Text>
      <Button title="ProfileScreen" onPress={() => navigation.navigate('ProfileScreen')} />
    </View>
    <View style={styles.workoutInfo}>
      <Text style={styles.workoutTitle}>{calories}</Text>
      <Text style={styles.workoutSubtitle}>KCAL</Text>
    </View>
    <View style={styles.workoutInfo}>
      <Text style={styles.workoutTitle}>{minutes}</Text>
      <Text style={styles.workoutSubtitle}>MINUTES</Text>
    </View>
  </View>
  <View style={styles.imageContainer}>
    <Image style={styles.image} source={{uri:"https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_842,ar_1.2,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/sku-card-widget/gold2.png",}}/>
  </View>
  <FitnessCards/>
</View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD853F',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  workoutInfo: {
    alignItems: 'center',
  },
  workoutTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
    marginBottom: 6,
  },
  workoutSubtitle: {
    color: '#D0D0D0',
    fontSize: 17,
    marginTop: 6,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: '90%',
    height: 120,
    borderRadius: 7,
  },
});

