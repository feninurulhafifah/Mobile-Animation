import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const NumberLearning = () => {
  const [currentNumber, setCurrentNumber] = useState(null);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Celebration animation - sederhana
  const celebrationScale = useRef(new Animated.Value(0)).current;

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Generate random number
  const getRandomNumber = () => {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  };

  // Initialize first number
  useEffect(() => {
    if (currentNumber === null) {
      setCurrentNumber(getRandomNumber());
    }
  }, []);

  const animateNumber = () => {
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
    ]).start();

    // Scale animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotate animation
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnim.setValue(0);
    });
  };

  const handleNumberPress = (number) => {
    animateNumber();
    
    if (number === currentNumber) {
      // Correct answer
      setScore(score + 10);
      setShowSuccess(true);
      
      // Success animation
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowSuccess(false);
        // Continue until score reaches 100
        if (score + 10 < 100) {
          setCurrentNumber(getRandomNumber());
        } else {
          // Score reached 100, show completion
          setScore(100);
          startCelebrationAnimation();
        }
      });
    }
  };

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
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


  if (!currentNumber) {
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

      <View style={styles.mainCard}>
        <Text style={styles.instructionText}>
          Tekan angka {currentNumber}
        </Text>

        <View style={styles.numberDisplay}>
          <Animated.View
            style={[
              styles.numberCircle,
              {
                transform: [
                  { scale: scaleAnim },
                  { rotate },
                  { translateY },
                ],
              },
            ]}
          >
            <Text style={styles.numberText}>{currentNumber}</Text>
          </Animated.View>
        </View>

        {showSuccess && (
          <Animated.View
            style={[
              styles.successContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim }],
              },
            ]}
          >
            <Text style={styles.successText}>🎉 Benar!</Text>
          </Animated.View>
        )}
      </View>

      <View style={styles.numbersGrid}>
        {numbers.map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.numberButton}
            onPress={() => handleNumberPress(number)}
            disabled={score >= 100}
          >
            <Text style={styles.numberButtonText}>
              {number}
            </Text>
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
              setCurrentNumber(getRandomNumber());
              setScore(0);
              setShowSuccess(false);
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
            setCurrentNumber(getRandomNumber());
            setScore(0);
            setShowSuccess(false);
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
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
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
  },
  instructionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 30,
    textAlign: 'center',
  },
  numberDisplay: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  numberCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  numberText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  successContainer: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#10b981',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    elevation: 5,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  numberButton: {
    width: (SCREEN_WIDTH - 60) / 5,
    height: (SCREEN_WIDTH - 60) / 5,
    margin: 5,
    borderRadius: 15,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
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

export default NumberLearning;

