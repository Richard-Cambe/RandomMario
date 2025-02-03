import { StatusBar } from 'expo-status-bar';
import {Button, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { data } from './allMaps'

export default function App() {

    const [index, setIndex] = useState(0);

    let chosenMap = () => {
        return Math.floor(Math.random() * (data.length));
    }
  return (
      <>
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIndex(chosenMap())}
                              title="Choisir une carte"
            />
      </View>
      </>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
