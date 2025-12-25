import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ReanimatedExample = () => {
  // Shared values untuk berbagai animasi
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const progress = useSharedValue(0);

  // Animated style untuk translateX dan opacity
  const translateXStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      opacity: opacity.value,
    };
  });

  // Animated style untuk scale dan rotate
  const scaleRotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        {
          rotate: `${rotate.value * 360}deg`,
        },
      ],
    };
  });

  // Animated style untuk progress bar
  const progressStyle = useAnimatedStyle(() => {
    
    return {
      width: progress.value * 100 +'%',
    };
  });

  const startTimingAnimation = () => {
    translateX.value = 0;
    opacity.value = 1;
    
    translateX.value = withTiming(150, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
    
    opacity.value = withTiming(0.5, {
      duration: 1000,
    });
  };

  const startSpringAnimation = () => {
    scale.value = withSpring(1.5, {
      damping: 10,
      stiffness: 100,
    }, () => {
      scale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    });

    rotate.value = withSpring(1, {
      damping: 8,
      stiffness: 80,
    }, () => {
      rotate.value = withSpring(0, {
        damping: 8,
        stiffness: 80,
      });
    });
  };

  const startRepeatAnimation = () => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      3,
      true
    );
  };

  const startProgressAnimation = () => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const resetAll = () => {
    translateX.value = withTiming(0);
    scale.value = withTiming(1);
    rotate.value = withTiming(0);
    opacity.value = withTiming(1);
    progress.value = withTiming(0);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>10. React Native Reanimated</Text>
      <Text style={styles.cardDescription}>
        Library yang lebih powerful dan modern. Cocok untuk animasi kompleks dengan performa tinggi.
      </Text>
      
      <View style={styles.animationContainer}>
        {/* Timing Animation */}
        <View style={styles.animationSection}>
          <Text style={styles.sectionTitle}>Timing Animation</Text>
          <Animated.View style={[styles.animatedBox, styles.box1, translateXStyle]}>
            <Text style={styles.boxText}>Timing</Text>
          </Animated.View>
          <TouchableOpacity
            style={[styles.smallButton, styles.button1]}
            onPress={startTimingAnimation}
          >
            <Text style={styles.smallButtonText}>Jalankan</Text>
          </TouchableOpacity>
        </View>

        {/* Spring Animation */}
        <View style={styles.animationSection}>
          <Text style={styles.sectionTitle}>Spring Animation</Text>
          <Animated.View style={[styles.animatedBox, styles.box2, scaleRotateStyle]}>
            <Text style={styles.boxText}>Spring</Text>
          </Animated.View>
          <TouchableOpacity
            style={[styles.smallButton, styles.button2]}
            onPress={startSpringAnimation}
          >
            <Text style={styles.smallButtonText}>Jalankan</Text>
          </TouchableOpacity>
        </View>

        {/* Repeat Animation */}
        <View style={styles.animationSection}>
          <Text style={styles.sectionTitle}>Repeat Animation</Text>
          <Animated.View style={[styles.animatedBox, styles.box3, { transform: [{ scale }] }]}>
            <Text style={styles.boxText}>Repeat</Text>
          </Animated.View>
          <TouchableOpacity
            style={[styles.smallButton, styles.button3]}
            onPress={startRepeatAnimation}
          >
            <Text style={styles.smallButtonText}>Jalankan</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.animationSection}>
          <Text style={styles.sectionTitle}>Progress Animation</Text>
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
          <TouchableOpacity
            style={[styles.smallButton, styles.button4]}
            onPress={startProgressAnimation}
          >
            <Text style={styles.smallButtonText}>Jalankan</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={resetAll}>
        <Text style={styles.buttonText}>Reset Semua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 15,
  },
  animationContainer: {
    marginBottom: 15,
  },
  animationSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  animatedBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  box1: {
    backgroundColor: '#8b5cf6',
  },
  box2: {
    backgroundColor: '#ec4899',
  },
  box3: {
    backgroundColor: '#f59e0b',
  },
  boxText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 10,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#8b5cf6',
  },
  button2: {
    backgroundColor: '#ec4899',
  },
  button3: {
    backgroundColor: '#f59e0b',
  },
  button4: {
    backgroundColor: '#10b981',
  },
  smallButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReanimatedExample;

