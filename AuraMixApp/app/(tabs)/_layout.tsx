import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import { C } from '../../constants/theme';

function Header() {
  return (
    <View style={s.header}>
      <StatusBar barStyle="light-content" backgroundColor={C.teal} />
      <Text style={s.title}>AuraMix</Text>
      <Text style={s.sub}>Manage your style with ease.</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: C.teal,
          tabBarInactiveTintColor: C.gray4,
          tabBarStyle: {
            backgroundColor: C.white,
            borderTopColor: C.gray2,
            borderTopWidth: 0.5,
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>⚡</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="wardrobe"
          options={{
            title: 'My Wardrobe',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>👕</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="saved"
          options={{
            title: 'Saved',
            tabBarIcon: ({ color }) => (
              <Text style={{ fontSize: 20, color }}>❤️</Text>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: C.teal, paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14 },
  title:  { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  sub:    { fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 2 },
});
