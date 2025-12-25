import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const ParallelAnimation = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    // Reset nilai
    translateX.setValue(0);
    translateY.setValue(0);
    rotate.setValue(0);
    scale.setValue(1);

    // Parallel animation - menjalankan beberapa animasi secara bersamaan
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.3,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Kembali ke posisi awal
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>5. Parallel Animation</Text>
      <Text style={styles.cardDescription}>
        Menjalankan beberapa animasi secara bersamaan (paralel)
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [
                { translateX },
                { translateY },
                { rotate: rotateInterpolate },
                { scale },
              ],
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
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  animatedBox: {
    width: 60,
    height: 60,
    backgroundColor: '#8b5cf6',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#8b5cf6',
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

export default ParallelAnimation;

