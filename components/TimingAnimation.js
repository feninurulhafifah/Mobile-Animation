import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const TimingAnimation = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    // Reset nilai
    translateX.setValue(0);
    opacity.setValue(1);

    // Timing animation dengan duration dan easing
    Animated.timing(translateX, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0.3,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>1. Timing Animation</Text>
      <Text style={styles.cardDescription}>
        Animasi dengan durasi dan easing yang dapat dikontrol
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [{ translateX }],
              opacity,
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
    backgroundColor: '#6366f1',
    borderRadius: 10,
    marginLeft: 20,
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

export default TimingAnimation;

