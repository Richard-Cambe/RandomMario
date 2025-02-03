import { StatusBar } from 'expo-status-bar';
import {Button, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import { data } from './allMaps'

export default function App() {

    const [index, setIndex] = useState(0);

    let chosenMap = (min, max) => {
        return Math.floor(Math.random() * (1-7));
    }
  return (
      <>
        <View style={styles.container}>
            <Button onPress={() => setIndex(chosenMap())}
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
