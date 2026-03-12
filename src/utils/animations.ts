import { Animated, InteractionManager } from 'react-native';

export const AnimationPresets = {
  // Entrance animations
  fadeIn: (animatedValue: Animated.Value, duration = 300, delay = 0) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    });
  },

  slideInUp: (animatedValue: Animated.Value, duration = 400, delay = 0) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
    });
  },

  scaleIn: (animatedValue: Animated.Value, duration = 350, delay = 0) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    });
  },

  // Press animations
  pressIn: (animatedValue: Animated.Value, scale = 0.95) => {
    return Animated.spring(animatedValue, {
      toValue: scale,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    });
  },

  pressOut: (animatedValue: Animated.Value) => {
    return Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    });
  },

  // Focus animations (for color changes - requires useNativeDriver: false)
  focusIn: (animatedValue: Animated.Value, duration = 200) => {
    return Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      useNativeDriver: false, // Required for color interpolation
    });
  },

  focusOut: (animatedValue: Animated.Value, duration = 200) => {
    return Animated.timing(animatedValue, {
      toValue: 0,
      duration,
      useNativeDriver: false, // Required for color interpolation
    });
  },
};

// Safe animation runner with InteractionManager
export const runAnimationSafely = (animation: Animated.CompositeAnimation) => {
  InteractionManager.runAfterInteractions(() => {
    animation.start();
  });
};

// Staggered animation helper with InteractionManager
export const createStaggeredAnimation = (
  animations: Animated.CompositeAnimation[],
  stagger = 100
) => {
  return Animated.stagger(stagger, animations);
};

// Parallel animation helper with InteractionManager
export const createParallelAnimation = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.parallel(animations);
};

// Sequence animation helper with InteractionManager
export const createSequenceAnimation = (
  animations: Animated.CompositeAnimation[]
) => {
  return Animated.sequence(animations);
};

// Safe parallel animation runner
export const runParallelAnimationSafely = (
  animations: Animated.CompositeAnimation[]
) => {
  InteractionManager.runAfterInteractions(() => {
    Animated.parallel(animations).start();
  });
};

// Safe staggered animation runner
export const runStaggeredAnimationSafely = (
  animations: Animated.CompositeAnimation[],
  stagger = 100
) => {
  InteractionManager.runAfterInteractions(() => {
    Animated.stagger(stagger, animations).start();
  });
};

// Common animation configurations
export const AnimationConfig = {
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  spring: {
    tension: 300,
    friction: 10,
  },
  stagger: {
    fast: 50,
    normal: 100,
    slow: 200,
  },
};