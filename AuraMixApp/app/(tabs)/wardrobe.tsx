import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';
import { useStore } from '../../hooks/useStore';
import { WardrobeItemCard } from '../../components/WardrobeItemCard';
import { AddItemModal } from '../../components/AddItemModal';
import { C } from '../../constants/theme';

export default function WardrobeScreen() {
  const { wardrobe, addItem, removeItem } = useStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={s.screen}>
      {/* Top bar */}
      <View style={s.topBar}>
        <Text style={s.heading}>Wardrobe</Text>
        <TouchableOpacity style={s.addBtn} onPress={() => setShowModal(true)} activeOpacity={0.85}>
          <Text style={s.addBtnText}>+ Add Item</Text>
        </TouchableOpacity>
      </View>

      {wardrobe.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>👕</Text>
          <Text style={s.emptyTitle}>Your wardrobe is empty.</Text>
          <Text style={s.emptySub}>Tap + Add Item to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={wardrobe}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <WardrobeItemCard item={item} onDelete={removeItem} />
          )}
          numColumns={2}
          columnWrapperStyle={s.row}
          contentContainerStyle={s.grid}
          showsVerticalScrollIndicator={false}
        />
      )}

      <AddItemModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={(item) => { addItem(item); setShowModal(false); }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  screen:  { flex: 1, backgroundColor: C.gray1 },
  topBar:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, backgroundColor: C.white, borderBottomWidth: 0.5, borderColor: C.gray2 },
  heading: { fontSize: 17, fontWeight: '700', color: C.black },
  addBtn:  { backgroundColor: C.teal, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  addBtnText:{ color: C.white, fontWeight: '700', fontSize: 13 },
  grid:    { padding: 12 },
  row:     { gap: 10, marginBottom: 10 },
  empty:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 80 },
  emptyIcon:{ fontSize: 48, marginBottom: 12 },
  emptyTitle:{ fontSize: 16, fontWeight: '600', color: C.gray5 },
  emptySub:  { fontSize: 13, color: C.gray3, marginTop: 6 },
});
