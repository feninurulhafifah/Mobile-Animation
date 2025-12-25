import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const SpringAnimation = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    // Reset nilai
    scale.setValue(1);
    rotate.setValue(0);

    // Spring animation dengan tension dan friction
    Animated.spring(scale, {
      toValue: 1.5,
      tension: 50,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      // Kembali ke ukuran normal setelah selesai
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });

    Animated.spring(rotate, {
      toValue: 1,
      tension: 40,
      friction: 2,
      useNativeDriver: true,
    }).start(() => {
      rotate.setValue(0);
    });
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>2. Spring Animation</Text>
      <Text style={styles.cardDescription}>
        Animasi dengan efek pegas (bouncy) menggunakan tension dan friction
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [
                { scale },
                { rotate: rotateInterpolate },
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
  },
  animatedBox: {
    width: 60,
    height: 60,
    backgroundColor: '#10b981',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#10b981',
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

export default SpringAnimation;

