import {Button, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {data} from './allMaps'

export default function App() {

    const [index, setIndex] = useState(0);

    let chosenMap = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return (
        <>
            <View style={styles.container}>
                <Image
                    source ={require("../assets/board-icons/super-mario-party-jamboree-board-icon-2.png")}
                    style={{width: 200, height: 200}}
                    resizeMode={"contain"}
                />
                <Button onPress={() => setIndex(chosenMap())}
                        title="Choisir une carte"
                        color={"orange"}
                />
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
});
