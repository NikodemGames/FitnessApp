import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import HomeScreen from './screens/HomeScreen';
import { FitnessContext } from './Context';

export default function App() {
  return (
    <FitnessContext>
      <StackNavigator/>
    </FitnessContext>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
