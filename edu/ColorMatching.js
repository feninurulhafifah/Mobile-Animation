import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const colors = [
  { name: 'Merah', color: '#ef4444', emoji: '🔴' },
  { name: 'Biru', color: '#3b82f6', emoji: '🔵' },
  { name: 'Hijau', color: '#10b981', emoji: '🟢' },
  { name: 'Kuning', color: '#f59e0b', emoji: '🟡' },
  { name: 'Ungu', color: '#8b5cf6', emoji: '🟣' },
  { name: 'Pink', color: '#ec4899', emoji: '🩷' },
];

const ColorMatching = () => {
  const [currentTargetColor, setCurrentTargetColor] = useState(null);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const targetScaleAnim = useRef(new Animated.Value(1)).current;
  
  // Celebration animation - sederhana
  const celebrationScale = useRef(new Animated.Value(0)).current;

  // Inisialisasi warna target pertama
  useEffect(() => {
    if (currentTargetColor === null) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setCurrentTargetColor(randomColor);
    }
  }, []);

  const getRandomColor = () => {
    // Selalu pilih warna random dari semua warna
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCurrentTargetColor(randomColor);
  };

  const handleColorPress = (selectedColor) => {
    if (showSuccess || showWrong) return;

    // Scale animation pada warna yang dipilih
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.9,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    if (selectedColor.name === currentTargetColor.name) {
      // Jawaban benar!
      const newScore = score + 10;
      setScore(newScore);
      setShowSuccess(true);

      // Success animation
      Animated.parallel([
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(1000),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(targetScaleAnim, {
          toValue: 1.3,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start(() => {
        targetScaleAnim.setValue(1);
        setShowSuccess(false);
        // Continue until score reaches 100
        if (newScore < 100) {
          getRandomColor();
        } else {
          // Score reached 100, start celebration
          startCelebrationAnimation();
        }
      });
    } else {
      // Jawaban salah - shake animation
      setShowWrong(true);
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowWrong(false);
      });
    }
  };

  const translateX = shakeAnim;

  const startCelebrationAnimation = () => {
    // Reset celebration animation
    celebrationScale.setValue(0);

    // Simple scale animation
    Animated.spring(celebrationScale, {
      toValue: 1,
      tension: 20,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };


  if (!currentTargetColor) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>⭐ Skor: {score} / 100</Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>Pilih warna yang sama:</Text>
        
        <View style={styles.targetColorContainer}>
          <Animated.View
            style={[
              styles.targetColorButton,
              {
                backgroundColor: currentTargetColor.color,
                transform: [{ scale: targetScaleAnim }],
              },
            ]}
          />
          <Text style={styles.targetColorName}>{currentTargetColor.name}</Text>
        </View>

        {showSuccess && (
          <Animated.View
            style={[
              styles.feedbackContainer,
              styles.feedbackSuccess,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.feedbackText}>🎉 Benar!</Text>
          </Animated.View>
        )}

        {showWrong && (
          <Animated.View
            style={[
              styles.feedbackContainer,
              styles.feedbackWrong,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            <Text style={styles.feedbackText}>❌ Coba lagi!</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.colorsGrid}>
        {colors.map((colorItem, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.colorCard,
                {
                  transform: [
                    { scale: showWrong && colorItem.name !== currentTargetColor.name ? scaleAnim : 1 },
                    { translateX: showWrong && colorItem.name !== currentTargetColor.name ? translateX : 0 },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.colorButton,
                  {
                    backgroundColor: colorItem.color,
                  },
                ]}
                onPress={() => handleColorPress(colorItem)}
                disabled={showSuccess || score >= 100}
              />
              <Text style={styles.colorName}>{colorItem.name}</Text>
            </Animated.View>
          );
        })}
      </View>

      {score >= 100 && (
        <Animated.View
          style={[
            styles.completionContainer,
            {
              transform: [{ scale: celebrationScale }],
            },
          ]}
        >
          <Text style={styles.completionText}>Selamat Score Kamu 100!!!</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setScore(0);
              setShowSuccess(false);
              setShowWrong(false);
              getRandomColor();
              celebrationScale.setValue(0);
            }}
          >
            <Text style={styles.resetButtonText}>Main Lagi</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {score < 100 && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setScore(0);
            setShowSuccess(false);
            setShowWrong(false);
            getRandomColor();
          }}
        >
          <Text style={styles.resetButtonText}>Main Lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f59e0b',
    textAlign: 'center',
    marginBottom: 10,
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    textAlign: 'center',
  },
  targetColorContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  targetColorButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 10,
  },
  targetColorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  feedbackContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 10,
    elevation: 3,
  },
  feedbackSuccess: {
    backgroundColor: '#10b981',
  },
  feedbackWrong: {
    backgroundColor: '#ef4444',
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  colorCard: {
    width: (SCREEN_WIDTH - 60) / 3,
    marginBottom: 20,
    alignItems: 'center',
  },
  colorButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  colorName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  completionContainer: {
    backgroundColor: '#10b981',
    padding: 30,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  completionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ColorMatching;

