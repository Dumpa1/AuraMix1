import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';
import { useStore } from '../../hooks/useStore';
import { C, Outfit } from '../../constants/theme';

function SavedCard({ outfit, onDelete }: { outfit: Outfit; onDelete: () => void }) {
  const items = [outfit.top, outfit.bottom, outfit.shoes, outfit.accessories].filter(Boolean);
  return (
    <View style={s.card}>
      <View style={s.cardEmojis}>
        {items.map((it, i) => (
          <View key={i} style={[s.emojiBox, { backgroundColor: it!.color }]}>
            <Text style={s.emojiText}>{it!.emoji}</Text>
          </View>
        ))}
      </View>
      <View style={s.cardInfo}>
        {items.map((it, i) => (
          <View key={i} style={s.itemRow}>
            <Text style={[s.itemCat, { color: it!.tc }]}>{it!.cat.toUpperCase()}</Text>
            <Text style={s.itemName}>{it!.name}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={s.deleteBtn} onPress={onDelete} activeOpacity={0.75}>
        <Text style={s.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function SavedScreen() {
  const { savedOutfits, removeSaved } = useStore();

  const confirmDelete = (id: string) => {
    Alert.alert('Remove outfit?', 'This will delete it from your saved list.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => removeSaved(id) },
    ]);
  };

  return (
    <View style={s.screen}>
      <View style={s.topBar}>
        <Text style={s.heading}>Saved Outfits</Text>
        <Text style={s.count}>{savedOutfits.length} saved</Text>
      </View>

      {savedOutfits.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🤍</Text>
          <Text style={s.emptyTitle}>No saved outfits yet.</Text>
          <Text style={s.emptySub}>
            Go to Dashboard, shuffle an outfit,{'\n'}and tap ♥ to save it here!
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        >
          {savedOutfits.map((outfit) => (
            <SavedCard
              key={outfit.id}
              outfit={outfit}
              onDelete={() => confirmDelete(outfit.id)}
            />
          ))}
          <View style={{ height: 32 }} />
        </ScrollView>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  screen:    { flex: 1, backgroundColor: C.gray1 },
  topBar:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, backgroundColor: C.white, borderBottomWidth: 0.5, borderColor: C.gray2 },
  heading:   { fontSize: 17, fontWeight: '700', color: C.black },
  count:     { fontSize: 13, color: C.gray4, fontWeight: '600' },
  list:      { padding: 12 },
  card:      { backgroundColor: C.white, borderRadius: 16, padding: 14, marginBottom: 12, borderWidth: 0.5, borderColor: C.gray2, flexDirection: 'row', alignItems: 'flex-start', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  cardEmojis:{ flexDirection: 'column', gap: 6, marginRight: 14 },
  emojiBox:  { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  emojiText: { fontSize: 22 },
  cardInfo:  { flex: 1, gap: 6, justifyContent: 'center' },
  itemRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  itemCat:   { fontSize: 9, fontWeight: '700', letterSpacing: 0.8, minWidth: 80 },
  itemName:  { fontSize: 13, fontWeight: '500', color: C.black },
  deleteBtn: { padding: 6, alignSelf: 'flex-start' },
  deleteIcon:{ fontSize: 18 },
  empty:     { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle:{ fontSize: 16, fontWeight: '600', color: C.gray5 },
  emptySub:  { fontSize: 13, color: C.gray3, textAlign: 'center', marginTop: 6, lineHeight: 20 },
});
