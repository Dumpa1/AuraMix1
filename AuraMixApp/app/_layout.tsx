import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Dimensions, StatusBar,
} from 'react-native';
import { Slot } from 'expo-router';
import { StoreProvider } from '../hooks/useStore';
import { C } from '../constants/theme';

const { width: SW, height: SH } = Dimensions.get('window');

function LandingScreen({ onStart }: { onStart: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;

  const press = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.91, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1,    duration: 120, useNativeDriver: true }),
    ]).start(() => onStart());
  };

  return (
    <View style={s.landing}>
      <StatusBar barStyle="light-content" />
      <View style={s.stripe1} />
      <View style={s.stripe2} />

      <View style={s.heroArea}>
        <Text style={s.heroMain}>👟</Text>
        <Text style={s.heroLeft}>👕</Text>
        <Text style={s.heroRight}>🧢</Text>
      </View>

      <View style={s.titleBlock}>
        <Text style={s.appName}>AuraMix</Text>
        <Text style={s.tagline}>
          An automated wardrobe curator{'\n'}for Streetwear &amp; Aesthetic Fashion
        </Text>
      </View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity style={s.startBtn} onPress={press} activeOpacity={1}>
          <Text style={s.startText}>START</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={s.footerHint}>Tap to begin your style journey</Text>
    </View>
  );
}

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const handleStart = () => {
    setReady(true);
    Animated.timing(fadeIn, {
      toValue: 1, duration: 380, useNativeDriver: true,
    }).start();
  };

  if (!ready) return <LandingScreen onStart={handleStart} />;

  return (
    <StoreProvider>
      <Animated.View style={[{ flex: 1 }, { opacity: fadeIn }]}>
        <Slot />
      </Animated.View>
    </StoreProvider>
  );
}

const s = StyleSheet.create({
  landing:   { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 64 },
  stripe1:   { position: 'absolute', top: -60, left: -50, width: SW * 1.3, height: SH * 0.55, backgroundColor: C.teal, opacity: 0.09, transform: [{ rotate: '-14deg' }] },
  stripe2:   { position: 'absolute', top: 60,  left: -70, width: SW * 1.3, height: SH * 0.28, backgroundColor: C.teal, opacity: 0.05, transform: [{ rotate: '-14deg' }] },
  heroArea:  { position: 'absolute', top: SH * 0.1, alignItems: 'center', width: '100%' },
  heroMain:  { fontSize: 100, textShadowColor: 'rgba(0,198,203,0.35)', textShadowOffset: { width: 0, height: 10 }, textShadowRadius: 28 },
  heroLeft:  { fontSize: 54, position: 'absolute', top: 28, right: SW * 0.1, opacity: 0.72 },
  heroRight: { fontSize: 46, position: 'absolute', top: 90, left: SW * 0.08, opacity: 0.65 },
  titleBlock:{ alignItems: 'center', marginBottom: 40 },
  appName:   { fontSize: 50, fontWeight: '800', color: '#fff', letterSpacing: -1.5 },
  tagline:   { fontSize: 14, color: 'rgba(255,255,255,0.58)', textAlign: 'center', marginTop: 10, lineHeight: 22 },
  startBtn:  { width: 92, height: 92, borderRadius: 46, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', elevation: 10, shadowColor: C.teal, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.55, shadowRadius: 16 },
  startText: { color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 1.2 },
  footerHint:{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 22, letterSpacing: 0.5 },
});
