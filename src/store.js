import { create } from 'zustand';
import { useSharedValue, withTiming, withRepeat, ReduceMotion } from 'react-native-reanimated';

const translatyY = useSharedValue(-2);

export const useStore = create((set) => ({
    map: null,
    animationFinished: false,
    imageIconIndex: 0,
    sound: null,
    sound2: null,
    buttonColor: "#00bfff",
    colors: ["#ff1493", "#9acd32", "#ffa500", "#00bfff"],
    translateY,

    setMap: (newMap) => set({ map: newMap }),
    setAnimationFinished: (status) => set({ animationFinished: status }),
    setImageIconIndex: (index) => set({ imageIconIndex: index }),
    setSound: (newSound) => set({ sound: newSound }),
    setSound2: (newSound) => set({ sound2: newSound }),
    changeColor: () => set((state) => ({
        buttonColor: state.colors[Math.floor(Math.random() * state.colors.length)]
    })),
    startTranslateYAnimation: () => {
        set((state) => {
            state.translateY.value = withRepeat(
                withTiming(40, { duration: 1500 }),
                -1,
                true,
                () => {},
                ReduceMotion.System
            );
        });
    }
}));
