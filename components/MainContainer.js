import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Switch, StyleSheet, Animated, Alert } from 'react-native';

export default function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState('');
  const [grade, setGrade] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const titleInputRef = useRef(null);

  const addAssignment = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Assignment name cannot be empty.");
      return;
    }
    if (!grade.trim() || isNaN(grade) || parseFloat(grade) < 0) {
      Alert.alert("Error", "Please enter a valid grade.");
      return;
    }
    setAssignments([...assignments, { id: Date.now().toString(), title, grade: parseFloat(grade) }]);
    setTitle('');
    setGrade('');
    titleInputRef.current?.focus();
  };

  const calculateGrade = () => {
    if (assignments.length === 0) {
      Alert.alert("Error", "No assignments entered to calculate the grade.");
      return;
    }
    const total = assignments.reduce((acc, item) => acc + item.grade, 0);
    const avg = total / assignments.length;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Alert.alert("Current Grade", `Your course grade is ${avg.toFixed(2)}%`);
  };

  const clearAssignments = () => {
    setAssignments([]);
    setTitle('');
    setGrade('');
    titleInputRef.current?.focus();
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.title, darkMode && styles.darkText]}>Assignment Grade Calculator</Text>
        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
        </View>
      </View>
      <TextInput
        ref={titleInputRef}
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Assignment Name"
        placeholderTextColor={darkMode ? '#ccc' : '#666'}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, darkMode && styles.darkInput]}
        placeholder="Grade"
        placeholderTextColor={darkMode ? '#ccc' : '#666'}
        keyboardType="numeric"
        value={grade}
        onChangeText={setGrade}
      />
      <Button title="Add Assignment" color={darkMode ? '#BB86FC' : '#6200EE'} onPress={addAssignment} />
      <FlatList
        data={assignments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={[styles.item, darkMode && styles.darkText]}>{item.title}: {item.grade}%</Text>}
      />
      <TouchableOpacity style={styles.calculateButton} onPress={calculateGrade}>
        <Text style={styles.buttonText}>Calculate Grade</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearAssignments}>
        <Text style={styles.buttonText}>Clear Assignments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f0f0f0' 
  },
  darkContainer: { 
    backgroundColor: '#121212' 
  },
  headerContainer: { 
    paddingTop: 30, 
    alignItems: 'center', 
    marginBottom: 20 
  },
  switchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'flex-start', 
    marginLeft: 20, 
    marginTop: 10 
  },
  switchLabel: { 
    fontSize: 18, 
    marginRight: 10, 
    color: '#007BFF', 
    fontWeight: 'bold' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginTop: 20, 
    marginBottom: 12, 
    color: '#007BFF' 
  },
  darkText: { 
    color: '#fff' 
  },
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
    backgroundColor: '#fff', 
    borderColor: '#007BFF' 
  },
  darkInput: { 
    backgroundColor: '#333', 
    color: '#fff', 
    borderColor: '#BB86FC' 
  },
  item: { 
    fontSize: 18, 
    marginVertical: 5, 
    color: '#333' 
  },
  calculateButton: { 
    backgroundColor: '#007BFF', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  clearButton: { 
    backgroundColor: '#FF3B30', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18 
  },
});
