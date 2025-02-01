import { StyleSheet, Text, View } from 'react-native';
import MainContainer from './components/MainContainer';

export default function App() {
  return (
    <MainContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
