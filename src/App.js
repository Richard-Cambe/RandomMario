import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {data} from './allMaps'

export default function App() {

    const [map, setMap] = useState(null);

    const chosenMap = () => {
        const randomMapId =  Math.floor(Math.random() * 7);
        const mapIcon = data[randomMapId];
        setMap(map);
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={chosenMap}
                                  style={styles.TouchableButton}>/>
                    <Text style={styles.TouchableText}>Choisir une carte</Text>
                </TouchableOpacity>
                <View>
                    <Text>{setMap.name}</Text>
                    <Image source={setMap.boardView}/>
                </View>

                    {/*<Text>{index}</Text>*/}
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
