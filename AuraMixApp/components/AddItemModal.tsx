import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, StyleSheet, Image, Alert,
} from 'react-native';
import { C, CATEGORIES, CAT_EMOJI, CAT_BG, CAT_TC, Category, WardrobeItem } from '../constants/theme';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (item: WardrobeItem) => void;
}

export function AddItemModal({ visible, onClose, onSave }: Props) {
  const [name, setName] = useState('');
  const [cat, setCat] = useState<Category>('Top');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = () => {
    Alert.alert('Photos unavailable', 'Image picking is temporarily disabled until expo-image-picker is installed.');
  };

  const takePhoto = () => {
    Alert.alert('Camera unavailable', 'Camera capture is temporarily disabled until expo-image-picker is installed.');
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please enter a name for this item.');
      return;
    }

    onSave({
      id: Date.now().toString(),
      name: name.trim(),
      cat,
      emoji: CAT_EMOJI[cat],
      color: CAT_BG[cat],
      tc: CAT_TC[cat],
      imageUri: imageUri ?? undefined,
    });

    setName('');
    setCat('Top');
    setImageUri(null);
    onClose();
  };

  const handleClose = () => {
    setName('');
    setCat('Top');
    setImageUri(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={s.overlay}>
        <View style={s.card}>
          <View style={s.handle} />
          <Text style={s.title}>Add New Item</Text>

          <View style={s.photoRow}>
            <TouchableOpacity style={s.photoBox} onPress={takePhoto} activeOpacity={0.8}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={s.photoPreview} />
              ) : (
                <>
                  <Text style={s.photoIcon}>Camera</Text>
                  <Text style={s.photoLabel}>Disabled</Text>
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={[s.photoBox, s.photoBoxAlt]} onPress={pickImage} activeOpacity={0.8}>
              <Text style={s.photoIcon}>Gallery</Text>
              <Text style={s.photoLabel}>Disabled</Text>
            </TouchableOpacity>
            {imageUri && (
              <TouchableOpacity style={s.clearPhoto} onPress={() => setImageUri(null)}>
                <Text style={s.clearPhotoText}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={s.label}>Item Name</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Black Hoodie"
            placeholderTextColor={C.gray3}
            value={name}
            onChangeText={setName}
          />

          <Text style={s.label}>Category</Text>
          <View style={s.catRow}>
            {CATEGORIES.map((currentCategory) => (
              <TouchableOpacity
                key={currentCategory}
                style={[s.chip, cat === currentCategory && s.chipActive]}
                onPress={() => setCat(currentCategory)}
                activeOpacity={0.8}
              >
                <Text style={s.chipEmoji}>{CAT_EMOJI[currentCategory]}</Text>
                <Text style={[s.chipText, cat === currentCategory && s.chipTextActive]}>
                  {currentCategory}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={s.btnRow}>
            <TouchableOpacity style={s.cancelBtn} onPress={handleClose}>
              <Text style={s.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.saveBtn} onPress={handleSave}>
              <Text style={s.saveText}>Save Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  card: { backgroundColor: C.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 44 },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: C.gray2, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: '800', color: C.black, textAlign: 'center', marginBottom: 20 },
  photoRow: { flexDirection: 'row', gap: 12, marginBottom: 20, alignItems: 'center' },
  photoBox: { width: 80, height: 80, borderRadius: 16, backgroundColor: C.tealLight, borderWidth: 1.5, borderColor: C.teal, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  photoBoxAlt: { backgroundColor: C.gray1, borderColor: C.gray3 },
  photoPreview: { width: 80, height: 80, borderRadius: 16 },
  photoIcon: { fontSize: 14, marginBottom: 4, fontWeight: '700', color: C.black },
  photoLabel: { fontSize: 11, color: C.gray4, fontWeight: '600' },
  clearPhoto: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: C.gray1 },
  clearPhotoText: { fontSize: 12, color: C.gray5, fontWeight: '600' },
  label: { fontSize: 13, fontWeight: '700', color: C.gray5, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: C.gray2, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: C.black, marginBottom: 18, backgroundColor: C.gray1 },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 20, borderWidth: 1.5, borderColor: C.gray2, backgroundColor: C.white },
  chipActive: { borderColor: C.teal, backgroundColor: C.tealLight },
  chipEmoji: { fontSize: 14 },
  chipText: { fontSize: 12, fontWeight: '600', color: C.gray5 },
  chipTextActive: { color: C.tealDark },
  btnRow: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, borderWidth: 1.5, borderColor: C.gray2, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  cancelText: { fontSize: 14, fontWeight: '600', color: C.gray5 },
  saveBtn: { flex: 1, backgroundColor: C.teal, borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  saveText: { fontSize: 14, fontWeight: '700', color: C.white },
});
