import { useSharedValue, withTiming, withRepeat, ReduceMotion } from 'react-native-reanimated';

export const useTranslateY = () => {
    const translateY = useSharedValue(-2);

    const startTranslateYAnimation = () => {
        translateY.value = withRepeat(
            withTiming(40, { duration: 1500 }),
            -1,
            true,
            () => {},
            ReduceMotion.System
        );
    };

    return { translateY, startTranslateYAnimation };
};
