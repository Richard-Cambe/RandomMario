import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {data} from './allMaps'

export default function App() {
    const [map, setMap] = useState(null);

    const chosenMap = () => {
        const randomMapId =  Math.floor(Math.random() * 7);
        const mapData = data[randomMapId];
        setMap(mapData);
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={chosenMap}
                                  style={styles.TouchableButton}>
                    <Text style={styles.TouchableText}>Choisir une carte</Text>
                </TouchableOpacity>

                {map ? (
                    <View>
                        <Text>{map.name}</Text>
                        <Image source={map.boardIcon}/>
                    </View>
                ) : (
                    <Text> Choisir une map !!! </Text>
                )}
            </View>
        </>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TouchableButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TouchableText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
