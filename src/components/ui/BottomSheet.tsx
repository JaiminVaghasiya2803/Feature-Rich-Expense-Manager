import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import { theme } from '../../constants/theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[];
  initialSnapIndex?: number;
  enablePanDownToClose?: boolean;
  backdropOpacity?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  snapPoints = [0.4, 0.7, 0.9],
  initialSnapIndex = 1,
  enablePanDownToClose = true,
  backdropOpacity = 0.5,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity_ = useRef(new Animated.Value(0)).current;
  const currentSnapIndex = useRef(initialSnapIndex);

  const snapPointsInPixels = snapPoints.map(point => SCREEN_HEIGHT * (1 - point));

  const animateToSnapPoint = useCallback((index: number) => {
    const snapPoint = snapPointsInPixels[index];
    currentSnapIndex.current = index;
    
    InteractionManager.runAfterInteractions(() => {
      Animated.spring(translateY, {
        toValue: snapPoint,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    });
  }, [snapPointsInPixels, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        const currentSnapPoint = snapPointsInPixels[currentSnapIndex.current];
        const newTranslateY = currentSnapPoint + gestureState.dy;
        
        // Prevent dragging above the highest snap point
        if (newTranslateY >= snapPointsInPixels[snapPointsInPixels.length - 1]) {
          translateY.setValue(newTranslateY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const currentSnapPoint = snapPointsInPixels[currentSnapIndex.current];
        const newTranslateY = currentSnapPoint + gestureState.dy;
        
        // Determine which snap point to animate to
        let targetIndex = currentSnapIndex.current;
        
        if (gestureState.dy > 50 && gestureState.vy > 0.5) {
          // Dragging down with sufficient velocity
          if (currentSnapIndex.current > 0) {
            targetIndex = currentSnapIndex.current - 1;
          } else if (enablePanDownToClose) {
            onClose();
            return;
          }
        } else if (gestureState.dy < -50 && gestureState.vy < -0.5) {
          // Dragging up with sufficient velocity
          if (currentSnapIndex.current < snapPointsInPixels.length - 1) {
            targetIndex = currentSnapIndex.current + 1;
          }
        } else {
          // Find closest snap point
          let minDistance = Math.abs(newTranslateY - snapPointsInPixels[0]);
          targetIndex = 0;
          
          for (let i = 1; i < snapPointsInPixels.length; i++) {
            const distance = Math.abs(newTranslateY - snapPointsInPixels[i]);
            if (distance < minDistance) {
              minDistance = distance;
              targetIndex = i;
            }
          }
        }
        
        animateToSnapPoint(targetIndex);
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity_, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: snapPointsInPixels[initialSnapIndex],
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }),
        ]).start();
      });
      currentSnapIndex.current = initialSnapIndex;
    } else {
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity_, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, [visible, translateY, backdropOpacity_, snapPointsInPixels, initialSnapIndex]);

  const animatedBackdropOpacity = backdropOpacity_.interpolate({
    inputRange: [0, 1],
    outputRange: [0, backdropOpacity],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          activeOpacity={1}
          onPress={onClose}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'black',
                opacity: animatedBackdropOpacity,
              },
            ]}
          />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.bottomSheet,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.handle} />
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    minHeight: SCREEN_HEIGHT * 0.4,
    maxHeight: SCREEN_HEIGHT * 0.95,
    ...theme.shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.border.medium,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
});

export default BottomSheet;