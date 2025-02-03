import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {data} from './allMaps'

export default function App() {
    const [map, setMap] = useState(null);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [imageIconIndex, setImageIconIndex] = useState(0);

    const imageIconLength = data.length;

    const chosenMap = () => {
        const randomMapId =  Math.floor(Math.random() * 7);
        const mapData = data[randomMapId];
        setMap(mapData);

        setAnimationFinished(false);
        setMap(null);


        let animationTimer = 0

    };

    return (
        <>
            <View style={styles.container}>
                { map ? (
                    <View>
                        <Text style={styles.NameText}>{map.name}</Text>
                        <Image style={styles.Icon} source={map.boardIcon}/>
                    </View>
                ) : (
                    <Image style={styles.Icon} source={require('../assets/pics/marioquestionmark.png')}/>
                )}
                <TouchableOpacity onPress={chosenMap}
                                  style={styles.TouchableButton}>
                    <Text style={styles.TouchableText}>Choisir une carte</Text>
                </TouchableOpacity>
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
    noText: {
        color:'red',
    },
    NameText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Icon:{
        marginVertical:30,
    }
});
