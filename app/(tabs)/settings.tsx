import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  Switch, Alert,
} from 'react-native';
import { useStore } from '../../hooks/useStore';
import { C } from '../../constants/theme';

export default function SettingsScreen() {
  const { wardrobe, savedOutfits, clearWardrobe, clearSaved } = useStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleClearWardrobe = () => {
    Alert.alert(
      'Clear Wardrobe',
      'Are you sure you want to delete all items? This cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            clearWardrobe();
            Alert.alert('Wardrobe cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleClearSaved = () => {
    Alert.alert(
      'Clear Saved Outfits',
      'Are you sure you want to delete all saved outfits? This cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            clearSaved();
            Alert.alert('Saved outfits cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      {/* Profile Section */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Profile</Text>
        <View style={s.profileCard}>
          <View style={s.avatarPlaceholder}>
            <Text style={s.avatarText}>👤</Text>
          </View>
          <View style={s.profileInfo}>
            <Text style={s.profileName}>My Profile</Text>
            <Text style={s.profileEmail}>user@auramix.app</Text>
          </View>
        </View>
        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingLabel}>Edit Profile</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Appearance Section */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Appearance</Text>
        <View style={s.settingItem}>
          <Text style={s.settingLabel}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: C.gray2, true: C.teal }}
            thumbColor={darkMode ? C.tealDark : C.white}
          />
        </View>
        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingLabel}>Theme Color</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Notifications</Text>
        <View style={s.settingItem}>
          <Text style={s.settingLabel}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: C.gray2, true: C.teal }}
            thumbColor={notifications ? C.tealDark : C.white}
          />
        </View>
      </View>

      {/* Data Section */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>Data & Storage</Text>
        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statNumber}>{wardrobe.length}</Text>
            <Text style={s.statLabel}>Items</Text>
          </View>
          <View style={s.statBox}>
            <Text style={s.statNumber}>{savedOutfits.length}</Text>
            <Text style={s.statLabel}>Saved</Text>
          </View>
        </View>
        <TouchableOpacity style={[s.settingItem, s.dangerItem]} onPress={handleClearWardrobe}>
          <Text style={s.dangerText}>Clear All Wardrobe Items</Text>
          <Text style={[s.arrow, s.dangerArrow]}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[s.settingItem, s.dangerItem]} onPress={handleClearSaved}>
          <Text style={s.dangerText}>Clear Saved Outfits</Text>
          <Text style={[s.arrow, s.dangerArrow]}>→</Text>
        </TouchableOpacity>
      </View>

      {/* About Section */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>About</Text>
        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingLabel}>Version</Text>
          <Text style={s.settingValue}>1.0.0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingLabel}>Privacy Policy</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.settingItem}>
          <Text style={s.settingLabel}>Terms of Service</Text>
          <Text style={s.arrow}>→</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:        { flex: 1, backgroundColor: C.gray1 },
  section:       { paddingHorizontal: 14, paddingVertical: 16, backgroundColor: C.white, marginTop: 10, marginHorizontal: 10, borderRadius: 16 },
  sectionTitle:  { fontSize: 16, fontWeight: '700', color: C.black, marginBottom: 14 },
  profileCard:   { flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderColor: C.gray2 },
  avatarPlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: C.tealLight, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText:    { fontSize: 32 },
  profileInfo:   { flex: 1 },
  profileName:   { fontSize: 16, fontWeight: '700', color: C.black },
  profileEmail:  { fontSize: 12, color: C.gray4, marginTop: 2 },
  settingItem:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 0.5, borderColor: C.gray2 },
  settingLabel:  { fontSize: 14, fontWeight: '600', color: C.black },
  settingValue:  { fontSize: 14, color: C.gray4 },
  arrow:         { fontSize: 16, color: C.gray3 },
  statsRow:      { flexDirection: 'row', gap: 10, marginBottom: 12 },
  statBox:       { flex: 1, backgroundColor: C.tealLight, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  statNumber:    { fontSize: 20, fontWeight: '700', color: C.tealDark },
  statLabel:     { fontSize: 11, color: C.gray4, marginTop: 4 },
  dangerItem:    { paddingHorizontal: 0, paddingVertical: 14, borderBottomWidth: 0 },
  dangerText:    { fontSize: 14, fontWeight: '600', color: C.pink },
  dangerArrow:   { color: C.pink },
});
