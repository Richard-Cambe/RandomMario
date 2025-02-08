import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { data } from './allMaps';
import { useFonts } from "expo-font";
import { Audio } from 'expo-av';
import Animated from "react-native-reanimated";
import * as Haptics from 'expo-haptics';
import { useStore } from "./store";

export default function App() {
    const {
        map, setMap,
        animationFinished, setAnimationFinished,
        imageIconIndex, setImageIconIndex,
        sound, setSound,
        sound2, setSound2,
        buttonColor, changeColor,
        translateY, startTranslateYAnimation
    } = useStore();

    const imageIconLength = data.length;
    const interval = useRef(null);

    const [loaded, error] = useFonts({
        'SuperMario256': require('../assets/fonts/SuperMario256.ttf'),
    });

    const loadSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/Box.mp3')
        );
        setSound(sound);
    };

    const loadSound2 = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/randomize-mee-101soundboards.mp3')
        );
        setSound2(sound);
    };

    const playSound = async () => {
        if (sound) {
            await sound.stopAsync();
            await sound.playAsync();
        }
    };

    useEffect(() => {
        loadSound();
        loadSound2();
        startTranslateYAnimation();

        if (sound) {
            sound.unloadAsync();
        } else if (sound2) {
            sound2.unloadAsync();
        }

        return () => clearInterval(interval.current);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.Logo} source={require('../assets/pics/Logo.png')} />
            </View>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    playSound2();
                }}>
                    <Animated.Image style={[styles.Title, { transform: [{ translateY }] }]} source={require('../assets/pics/randomize-me-2-4-2025.png')} />
                </TouchableOpacity>
            </View>

            <View>
                {!animationFinished ? (
                    <View>
                        <Image style={styles.Icon} source={data[imageIconIndex].boardIcon} />
                    </View>
                ) : (
                    <View>
                        <Text style={styles.NameText}>{map.name}</Text>
                        <Image style={styles.Icon} source={map.boardIcon} />
                    </View>
                )}
            </View>

            <View style={styles.touchableContainer}>
                <TouchableOpacity
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        chosenMap();
                        changeColor();
                    }}
                    style={[styles.TouchableButton, { backgroundColor: buttonColor }]}
                >
                    <Text style={styles.TouchableText}>RANDOMIZE ME</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e4000f',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    logoContainer: {
        position: 'absolute',
        top: 15,
        zIndex: 1,
    },
    Logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    Title: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginTop: 27,
    },
    touchableContainer: {
        position: 'absolute',
        bottom: 100,
        zIndex: 1,
    },
    TouchableButton: {
        backgroundColor: '#00bfff',
        padding: 10,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TouchableText: {
        fontFamily: 'SuperMario256',
        color: '#fff',
        fontSize: 20,
    },
    NameText: {
        fontFamily: 'SuperMario256',
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 10,
        color: '#fff',
    },
    Icon: {
        position: 'relative',
        alignSelf: 'center',
    },
});
