import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const GestureAnimation = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      
      onPanResponderGrant: () => {
        // Saat mulai touch, animasi scale
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }).start();
      },

      onPanResponderMove: (evt, gestureState) => {
        // Update posisi sesuai gesture
        pan.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },

      onPanResponderRelease: (evt, gestureState) => {
        // Kembalikan scale
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();

        // Jika di-drag cukup jauh, animasi ke posisi baru
        if (Math.abs(gestureState.dx) > 50 || Math.abs(gestureState.dy) > 50) {
          Animated.spring(pan, {
            toValue: { x: gestureState.dx, y: gestureState.dy },
            useNativeDriver: true,
          }).start();
        } else {
          // Kembali ke posisi awal
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>8. Gesture Animation</Text>
      <Text style={styles.cardDescription}>
        Animasi yang merespons gesture (drag/pan) menggunakan PanResponder
      </Text>
      
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [
                { translateX: pan.x },
                { translateY: pan.y },
                { scale },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        />
      </View>

      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>
          Drag kotak untuk memindahkannya
        </Text>
      </View>
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  animatedBox: {
    width: 80,
    height: 80,
    backgroundColor: '#14b8a6',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  instructionContainer: {
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: 8,
  },
  instructionText: {
    color: '#065f46',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default GestureAnimation;

