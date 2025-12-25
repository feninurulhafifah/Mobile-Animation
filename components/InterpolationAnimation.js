import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const InterpolationAnimation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    // Reset nilai
    animatedValue.setValue(0);

    // Animasi dari 0 ke 1
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // Kembali ke 0
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
  };

  // Interpolasi untuk translateX (0 -> 200)
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  // Interpolasi untuk rotate (0 -> 360 derajat)
  const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Interpolasi untuk scale (1 -> 1.5 -> 1)
  const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  // Interpolasi untuk opacity (1 -> 0.3 -> 1)
  const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.3, 1],
  });

  // Interpolasi untuk background color
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#ec4899', '#3b82f6', '#ec4899'],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>6. Interpolation Animation</Text>
      <Text style={styles.cardDescription}>
        Mengubah nilai animasi menjadi range nilai lain (translateX, rotate, scale, opacity, color)
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [
                { translateX },
                { rotate },
                { scale },
              ],
              opacity,
              backgroundColor,
            },
          ]}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={startAnimation}>
        <Text style={styles.buttonText}>Jalankan Animasi</Text>
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
    height: 100,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  animatedBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#ec4899',
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

export default InterpolationAnimation;

