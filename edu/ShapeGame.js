import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const shapes = [
  { name: 'Lingkaran', emoji: '⭕', color: '#ef4444' },
  { name: 'Segitiga', emoji: '🔺', color: '#3b82f6' },
  { name: 'Persegi', emoji: '⬜', color: '#10b981' },
  { name: 'Bintang', emoji: '⭐', color: '#f59e0b' },
  { name: 'Hati', emoji: '❤️', color: '#ec4899' },
  { name: 'Diamond', emoji: '💎', color: '#8b5cf6' },
];

const ShapeGame = () => {
  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // Celebration animation - sederhana
  const celebrationScale = useRef(new Animated.Value(0)).current;

  const getRandomShape = () => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
  };

  const animateShape = () => {
    // Parallel animations
    Animated.parallel([
      // Rotate animation
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Bounce animation
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Scale pulse
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const handleAnswer = (isCorrect) => {
    animateShape();

    if (isCorrect) {
      const newScore = score + 10;
      setScore(newScore);
      setStreak(streak + 1);
      setShowFeedback('correct');
      
      // Success animations
      Animated.parallel([
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(800),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(slideAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setShowFeedback(null);
        // Continue until score reaches 100
        if (newScore < 100) {
          setCurrentShape(getRandomShape());
        } else {
          // Score reached 100, start celebration
          startCelebrationAnimation();
        }
      });
    } else {
      setStreak(0);
      setShowFeedback('wrong');
      
      // Wrong answer animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(800),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowFeedback(null);
      });
    }
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const slideY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

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


  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>⭐ Skor: {score} / 100</Text>
        {streak > 0 && (
          <Text style={styles.streakText}>🔥 Streak: {streak}</Text>
        )}
      </View>

      <View style={styles.mainCard}>
        <Text style={styles.instructionText}>
          Pilih bentuk: {currentShape.name}
        </Text>

        <Animated.View
          style={[
            styles.shapeContainer,
            {
              transform: [
                { rotate },
                { scale: scaleAnim },
                { translateY },
              ],
            },
          ]}
        >
          <View style={[styles.shapeCircle, { backgroundColor: currentShape.color }]}>
            <Text style={styles.shapeEmoji}>{currentShape.emoji}</Text>
          </View>
        </Animated.View>

        {showFeedback === 'correct' && (
          <Animated.View
            style={[
              styles.feedbackContainer,
              styles.feedbackCorrect,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideY }],
              },
            ]}
          >
            <Text style={styles.feedbackText}>🎉 Benar!</Text>
          </Animated.View>
        )}

        {showFeedback === 'wrong' && (
          <Animated.View
            style={[
              styles.feedbackContainer,
              styles.feedbackWrong,
              {
                opacity: fadeAnim,
              },
            ]}
          >
            <Text style={styles.feedbackText}>❌ Coba lagi!</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.shapesGrid}>
        {shapes.map((shape, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.shapeButton,
              {
                backgroundColor: shape.color,
              },
            ]}
            onPress={() => handleAnswer(shape.name === currentShape.name)}
            disabled={score >= 100}
          >
            <Text style={styles.shapeButtonEmoji}>{shape.emoji}</Text>
            <Text style={styles.shapeButtonText}>{shape.name}</Text>
          </TouchableOpacity>
        ))}
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
              setStreak(0);
              setShowFeedback(null);
              setCurrentShape(getRandomShape());
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
            setStreak(0);
            setShowFeedback(null);
            setCurrentShape(getRandomShape());
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
    marginBottom: 5,
  },
  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    textAlign: 'center',
  },
  mainCard: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 250,
  },
  instructionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 30,
    textAlign: 'center',
  },
  shapeContainer: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  shapeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  shapeEmoji: {
    fontSize: 60,
  },
  feedbackContainer: {
    position: 'absolute',
    top: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 5,
  },
  feedbackCorrect: {
    backgroundColor: '#10b981',
  },
  feedbackWrong: {
    backgroundColor: '#ef4444',
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  shapesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  shapeButton: {
    width: (SCREEN_WIDTH - 60) / 3,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  shapeButtonEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  shapeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
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
});

export default ShapeGame;

