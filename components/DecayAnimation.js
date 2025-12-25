import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const DecayAnimation = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    // Reset nilai
    translateX.setValue(0);
    translateY.setValue(0);

    // Decay animation - melambat secara bertahap
    Animated.decay(translateX, {
      velocity: 0.5,
      deceleration: 0.997,
      useNativeDriver: true,
    }).start();

    Animated.decay(translateY, {
      velocity: 0.3,
      deceleration: 0.998,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>3. Decay Animation</Text>
      <Text style={styles.cardDescription}>
        Animasi yang melambat secara bertahap seperti gesekan
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [
                { translateX },
                { translateY },
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
    backgroundColor: '#f59e0b',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#f59e0b',
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

export default DecayAnimation;

