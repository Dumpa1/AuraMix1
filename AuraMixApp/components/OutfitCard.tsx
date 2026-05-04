import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WardrobeItem, C } from '../constants/theme';

export function OutfitCard({ item }: { item: WardrobeItem | null }) {
  if (!item) return null;
  return (
    <View style={s.card}>
      <View style={[s.iconBox, { backgroundColor: item.color }]}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={s.image} />
        ) : (
          <Text style={s.emoji}>{item.emoji}</Text>
        )}
      </View>
      <View style={s.info}>
        <Text style={[s.cat, { color: item.tc }]}>{item.cat.toUpperCase()}</Text>
        <Text style={s.name}>{item.name}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card:    { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, marginHorizontal: 12, marginBottom: 8, borderRadius: 14, padding: 12, borderWidth: 0.5, borderColor: C.gray2, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  iconBox: { width: 58, height: 58, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  image:   { width: 58, height: 58, borderRadius: 12 },
  emoji:   { fontSize: 30 },
  info:    { flex: 1 },
  cat:     { fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  name:    { fontSize: 15, fontWeight: '600', color: C.black },
});
