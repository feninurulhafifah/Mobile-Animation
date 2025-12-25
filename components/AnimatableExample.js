import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatableExample = () => {
  const [animation, setAnimation] = useState('zoomIn');
  const [key, setKey] = useState(0);

  const animations = [
    'zoomIn',
    'zoomOut',
    'fadeIn',
    'fadeInDown',
    'fadeInUp',
    'slideInLeft',
    'slideInRight',
    'bounceIn',
    'pulse',
    'shake',
    'swing',
    'rubberBand',
  ];

  const changeAnimation = (anim) => {
    setAnimation(anim);
    setKey(key + 1); // Force re-render untuk restart animasi
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>9. React Native Animatable</Text>
      <Text style={styles.cardDescription}>
        Library untuk animasi sederhana dengan code minimal. Cocok untuk animasi cepat dan mudah.
      </Text>
      
      <View style={styles.animationContainer}>
        <Animatable.View
          key={key}
          animation={animation}
          duration={1000}
          style={styles.animatedBox}
        >
          <Text style={styles.animatedText}>Hello, Animations!</Text>
        </Animatable.View>
      </View>

      <View style={styles.controlsContainer}>
        <Text style={styles.controlsTitle}>Pilih Animasi:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonsRow}
        >
          {animations.map((anim) => (
            <TouchableOpacity
              key={anim}
              style={[
                styles.animButton,
                animation === anim && styles.animButtonActive,
              ]}
              onPress={() => changeAnimation(anim)}
            >
              <Text
                style={[
                  styles.animButtonText,
                  animation === anim && styles.animButtonTextActive,
                ]}
              >
                {anim}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => changeAnimation(animation)}
      >
        <Text style={styles.buttonText}>Ulangi Animasi</Text>
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
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
  },
  animatedBox: {
    padding: 20,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  animatedText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controlsContainer: {
    marginBottom: 15,
  },
  controlsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  animButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    marginRight: 8,
  },
  animButtonActive: {
    backgroundColor: '#3b82f6',
  },
  animButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  animButtonTextActive: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3b82f6',
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

export default AnimatableExample;

