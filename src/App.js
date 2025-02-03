import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {data} from './allMaps'
import {useFonts} from "expo-font";
import { Audio } from 'expo-av';

export default function App() {
    const [map, setMap] = useState(null);
    const [animationFinished, setAnimationFinished] = useState(false);
    const [imageIconIndex, setImageIconIndex] = useState(0);
    const [sound, setSound] = useState();

    const imageIconLength = data.length;
    const interval = useRef(null)

    const [fontsLoaded] = useFonts({
        'ShinGoProRegular': require('../assets/fonts/AOTFShinGoProRegular.otf'),
        'ShinGoProBold': require('../assets/fonts/AOTFShinGoProBold.otf'),
        'ShinGoProDeBold': require('../assets/fonts/AOTFShinGoProDeBold.otf'),
        'ShinGoProHeavy': require('../assets/fonts/AOTFShinGoProHeavy.otf'),
        'ShinGoProExLight': require('../assets/fonts/AOTFShinGoProExLight.otf'),
        'ShinGoProLight': require('../assets/fonts/AOTFShinGoProLight.otf'),
        'ShinGoProMedium': require('../assets/fonts/AOTFShinGoProMedium.otf'),
        'SuperMario256': require('../assets/fonts/SuperMario256.ttf'),
    });

    const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/Item Box.mp3'),
        );
        setSound(sound);
    };

    const playSound = async () => {
        if (sound) {
            await sound.replayAsync()
        }
    }

    const chosenMap = () => {
        const randomMapId = Math.floor(Math.random() * imageIconLength);
        const mapData = data[randomMapId];

        setAnimationFinished(false);
        setMap(null);
        let animationTimer = 0

        interval.current = setInterval(() => {
            setImageIconIndex((prevIndex) => (prevIndex + 1) % imageIconLength);
            playSound();
            animationTimer += 100;
            if (animationTimer >= 4000) {
                clearInterval(interval.current);
                setMap(mapData);
                setAnimationFinished(true);
            }
        }, 50);
    };

    useEffect(() => {
        loadSound();

        return () => clearInterval(interval.current);
        if (sound) {
            sound.unloadAsync();
        }
    }, []);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={chosenMap}
                                  style={styles.TouchableButton}>
                    <Text style={styles.TouchableText}>Choisir une carte</Text>
                </TouchableOpacity>
                {!animationFinished ? (
                    <View>
                        <Image style={styles.Icon} source={data[imageIconIndex].boardIcon}/>
                    </View>
                ) : (<View>
                        <Text style={styles.NameText}>{map.name}</Text>
                        <Image style={styles.Icon} source={map.boardIcon}/>
                    </View>
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
        fontFamily: 'ShinGoProExtraBold',
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    NameText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    Icon: {
        marginVertical: 30,
    },
});
