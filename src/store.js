import { create } from 'zustand';
import { useSharedValue, withTiming, withRepeat, ReduceMotion } from 'react-native-reanimated';
import { data } from './allMaps';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';

export const useStore = create((set, get) => ({
    map: null,
    animationFinished: false,
    imageIconIndex: 0,
    sound: null,
    sound2: null,
    buttonColor: "#00bfff",
    colors: ["#ff1493", "#9acd32", "#ffa500", "#00bfff"],

    getTranslateY: () => useSharedValue(-2),

    setMap: (newMap) => set({ map: newMap }),
    setAnimationFinished: (status) => set({ animationFinished: status }),
    setImageIconIndex: (index) => set({ imageIconIndex: index }),
    setSound: (newSound) => set({ sound: newSound }),
    setSound2: (newSound) => set({ sound2: newSound }),

    changeColor: () => set((state) => ({
        buttonColor: state.colors[Math.floor(Math.random() * state.colors.length)]
    })),

    startTranslateYAnimation: () => {
        const translateY = get().getTranslateY();
        translateY.value = withRepeat(
            withTiming(40, { duration: 1500 }),
            -1,
            true,
            () => {},
            ReduceMotion.System
        );

    },
    loadSounds: async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/sounds/Box.mp3')
        );
        const { sound: sound2 } = await Audio.Sound.createAsync(
            require('../assets/sounds/randomize-mee-101soundboards.mp3')
        );
        set({ sound, sound2 });
    },
    playSound: async () => {
        const { sound } = get();
        if (sound) {
            await sound.replayAsync();
        }
    },

    playSound2: async () => {
        const { sound2 } = get();
        if (sound2) {
            await sound2.replayAsync();
        }
    },

    chosenMap: (data) => {
        const randomMapId = Math.floor(Math.random() * data.length);
        const mapData = data[randomMapId];

        set({ animationFinished: false, map: null });

        let animationTimer = 0;
        const interval = setInterval(() => {
            set((state) => ({
                imageIconIndex: (state.imageIconIndex + 1) % data.length
            }));
            animationTimer += 100;
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            if (animationTimer >= 6000) {
                clearInterval(interval);
                set({ map: mapData, animationFinished: true });

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 200);
                setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 250);
                setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 300);
                setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 350);
            }
        }, 50);

        set({ intervalId: interval });
    }
}));


