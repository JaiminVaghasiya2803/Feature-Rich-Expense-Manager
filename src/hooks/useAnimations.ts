import { useRef, useCallback } from 'react';
import { Animated, InteractionManager } from 'react-native';

export const useAnimations = () => {
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  const runAnimation = useCallback((animation: Animated.CompositeAnimation) => {
    InteractionManager.runAfterInteractions(() => {
      animationsRef.current.push(animation);
      animation.start((finished) => {
        if (finished) {
          // Remove completed animation from ref
          const index = animationsRef.current.indexOf(animation);
          if (index > -1) {
            animationsRef.current.splice(index, 1);
          }
        }
      });
    });
  }, []);

  const runParallelAnimations = useCallback((animations: Animated.CompositeAnimation[]) => {
    const parallelAnimation = Animated.parallel(animations);
    runAnimation(parallelAnimation);
  }, [runAnimation]);

  const runStaggeredAnimations = useCallback((
    animations: Animated.CompositeAnimation[],
    stagger = 100
  ) => {
    const staggeredAnimation = Animated.stagger(stagger, animations);
    runAnimation(staggeredAnimation);
  }, [runAnimation]);

  const stopAllAnimations = useCallback(() => {
    animationsRef.current.forEach(animation => {
      animation.stop();
    });
    animationsRef.current = [];
  }, []);

  return {
    runAnimation,
    runParallelAnimations,
    runStaggeredAnimations,
    stopAllAnimations,
  };
};

// Hook for entrance animations
export const useEntranceAnimation = (
  animated = true,
  delay = 0
) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const { runParallelAnimations } = useAnimations();

  const startAnimation = useCallback(() => {
    if (animated) {
      const animations = [
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 450,
          delay,
          useNativeDriver: true,
        }),
      ];
      
      runParallelAnimations(animations);
    } else {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      scaleAnim.setValue(1);
    }
  }, [animated, delay, fadeAnim, slideAnim, scaleAnim, runParallelAnimations]);

  return {
    fadeAnim,
    slideAnim,
    scaleAnim,
    startAnimation,
    animatedStyle: {
      opacity: fadeAnim,
      transform: [
        { translateY: slideAnim },
        { scale: scaleAnim },
      ],
    },
  };
};

// Hook for press animations
export const usePressAnimation = (
  animated = true,
  scale = 0.95
) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { runAnimation } = useAnimations();

  const pressIn = useCallback(() => {
    if (animated) {
      const animation = Animated.spring(scaleAnim, {
        toValue: scale,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      });
      runAnimation(animation);
    }
  }, [animated, scale, scaleAnim, runAnimation]);

  const pressOut = useCallback(() => {
    if (animated) {
      const animation = Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      });
      runAnimation(animation);
    }
  }, [animated, scaleAnim, runAnimation]);

  return {
    scaleAnim,
    pressIn,
    pressOut,
    animatedStyle: {
      transform: [{ scale: scaleAnim }],
    },
  };
};