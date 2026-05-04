import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { WardrobeItem, C } from '../constants/theme';

interface Props {
  item:     WardrobeItem;
  onDelete: (id: string) => void;
}

export function WardrobeItemCard({ item, onDelete }: Props) {
  return (
    <View style={s.card}>
      <View style={[s.iconBox, { backgroundColor: item.color }]}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={s.image} />
        ) : (
          <Text style={s.emoji}>{item.emoji}</Text>
        )}
      </View>
      <Text style={s.name} numberOfLines={2}>{item.name}</Text>
      <View style={[s.tag, { backgroundColor: item.color }]}>
        <Text style={[s.tagText, { color: item.tc }]}>{item.cat}</Text>
      </View>
      <TouchableOpacity style={s.deleteBtn} onPress={() => onDelete(item.id)} activeOpacity={0.7}>
        <Text style={s.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  card:      { flex: 1, backgroundColor: C.white, borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 0.5, borderColor: C.gray2, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, position: 'relative' },
  iconBox:   { width: 68, height: 68, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  image:     { width: 68, height: 68, borderRadius: 14 },
  emoji:     { fontSize: 36 },
  name:      { fontSize: 12, fontWeight: '600', color: C.black, textAlign: 'center', marginBottom: 6 },
  tag:       { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  tagText:   { fontSize: 10, fontWeight: '700' },
  deleteBtn: { position: 'absolute', top: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: C.gray2, alignItems: 'center', justifyContent: 'center' },
  deleteIcon:{ fontSize: 9, color: C.gray5, fontWeight: '700' },
});
