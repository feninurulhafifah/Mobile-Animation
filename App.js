import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import TimingAnimation from './components/TimingAnimation';
import SpringAnimation from './components/SpringAnimation';
import DecayAnimation from './components/DecayAnimation';
import SequenceAnimation from './components/SequenceAnimation';
import ParallelAnimation from './components/ParallelAnimation';
import InterpolationAnimation from './components/InterpolationAnimation';
import LayoutAnimationDemo from './components/LayoutAnimationDemo';
import GestureAnimation from './components/GestureAnimation';
import AnimatableExample from './components/AnimatableExample';
import ReanimatedExample from './components/ReanimatedExample';
import EduApp from './edu/EduApp';

export default function App() {
  const [mode, setMode] = useState('demo'); // 'demo' atau 'edu'

  // Jika mode adalah 'edu', tampilkan aplikasi edukasi
  if (mode === 'edu') {
    return <EduApp onBack={() => setMode('demo')} />;
  }

  // Mode demo - tampilkan demo animasi
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="dark" />
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Animasi React Native</Text>
        <Text style={styles.subtitle}>Demo Konsep Animasi</Text>
        
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setMode('edu')}
        >
          <Text style={styles.switchButtonText}>Buka Aplikasi Edukasi</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TimingAnimation />
        <SpringAnimation />
        <DecayAnimation />
        <SequenceAnimation />
        <ParallelAnimation />
        <InterpolationAnimation />
        <LayoutAnimationDemo />
        <GestureAnimation />
        <AnimatableExample />
        <ReanimatedExample />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    marginBottom: 15,
  },
  switchButton: {
    backgroundColor: '#10b981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  switchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
});
