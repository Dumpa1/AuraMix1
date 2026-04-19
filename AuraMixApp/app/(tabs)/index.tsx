import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Animated,
} from 'react-native';
import { useStore } from '../../hooks/useStore';
import { OutfitCard } from '../../components/OutfitCard';
import { C, WardrobeItem, Outfit } from '../../constants/theme';

function rand<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function bycat(arr: WardrobeItem[], cat: string) { return arr.filter(i => i.cat === cat); }

export default function DashboardScreen() {
  const { wardrobe, savedOutfits, saveOutfit, incShuffle, shuffleCount } = useStore();

  const initOutfit = (): Outfit => ({
    id:          Date.now().toString(),
    top:         bycat(wardrobe, 'Top')[0]         ?? null,
    bottom:      bycat(wardrobe, 'Bottom')[0]      ?? null,
    shoes:       bycat(wardrobe, 'Shoes')[0]       ?? null,
    accessories: bycat(wardrobe, 'Accessories')[0] ?? null,
  });

  const [outfit,  setOutfit]  = useState<Outfit>(initOutfit);
  const [hearted, setHearted] = useState(false);
  const shakeX = useRef(new Animated.Value(0)).current;

  const doShuffle = () => {
    Animated.sequence([
      Animated.timing(shakeX, { toValue: 7,  duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: -7, duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 4,  duration: 55, useNativeDriver: true }),
      Animated.timing(shakeX, { toValue: 0,  duration: 55, useNativeDriver: true }),
    ]).start();

    const tops  = bycat(wardrobe, 'Top');
    const bots  = bycat(wardrobe, 'Bottom');
    const shoes = bycat(wardrobe, 'Shoes');
    const accs  = bycat(wardrobe, 'Accessories');

    setOutfit({
      id:          Date.now().toString(),
      top:         tops.length  ? rand(tops)  : null,
      bottom:      bots.length  ? rand(bots)  : null,
      shoes:       shoes.length ? rand(shoes) : null,
      accessories: accs.length  ? rand(accs)  : null,
    });
    incShuffle();
    setHearted(false);
  };

  const doSave = () => {
    if (hearted) return;
    saveOutfit({ ...outfit, id: Date.now().toString() });
    setHearted(true);
  };

  return (
    <ScrollView style={s.screen} showsVerticalScrollIndicator={false}>
      {/* Stats */}
      <View style={s.statsRow}>
        <View style={s.stat}>
          <Text style={s.statNum}>{shuffleCount}</Text>
          <Text style={s.statLbl}>Shuffles</Text>
        </View>
        <View style={[s.stat, s.statBorder]}>
          <Text style={s.statNum}>{savedOutfits.length}</Text>
          <Text style={s.statLbl}>Saved</Text>
        </View>
        <View style={s.stat}>
          <Text style={s.statNum}>{wardrobe.length}</Text>
          <Text style={s.statLbl}>My Items</Text>
        </View>
      </View>

      {/* Today's Outfit */}
      <View style={s.sectionRow}>
        <View style={s.dot} />
        <Text style={s.sectionTitle}>Todays Outfit</Text>
      </View>

      <Animated.View style={{ transform: [{ translateX: shakeX }] }}>
        <OutfitCard item={outfit.top} />
        <OutfitCard item={outfit.bottom} />
        <OutfitCard item={outfit.shoes} />
        <OutfitCard item={outfit.accessories} />
      </Animated.View>

      {/* Shuffle + Heart */}
      <View style={s.actionRow}>
        <TouchableOpacity style={s.shuffleBtn} onPress={doShuffle} activeOpacity={0.85}>
          <Text style={s.shuffleIcon}>⚡</Text>
          <Text style={s.shuffleText}>Shuffle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.heartBtn, hearted && s.heartBtnOn]}
          onPress={doSave}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 22 }}>{hearted ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Saved preview */}
      <View style={[s.sectionRow, { marginTop: 20 }]}>
        <Text style={s.pinkHeart}>♥</Text>
        <Text style={s.sectionTitle}>Saved Outfits</Text>
      </View>

      {savedOutfits.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>🤍</Text>
          <Text style={s.emptyTitle}>No saved outfits yet.</Text>
          <Text style={s.emptySub}>Shuffle and tap ♥ to save combinations!</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.pillList}
        >
          {savedOutfits.slice(0, 10).map((o, i) => (
            <TouchableOpacity
              key={o.id}
              style={s.pill}
              onPress={() => { setOutfit(o); setHearted(true); }}
              activeOpacity={0.75}
            >
              <View style={s.pillEmojis}>
                {[o.top, o.bottom, o.shoes, o.accessories].filter(Boolean).map((it, j) => (
                  <Text key={j} style={{ fontSize: 16 }}>{it!.emoji}</Text>
                ))}
              </View>
              <Text style={s.pillLabel} numberOfLines={1}>
                {o.top?.name.split(' ')[0]} + {o.bottom?.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  screen:     { flex: 1, backgroundColor: C.gray1 },
  statsRow:   { flexDirection: 'row', backgroundColor: C.white, borderBottomWidth: 0.5, borderColor: C.gray2 },
  stat:       { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statBorder: { borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: C.gray2 },
  statNum:    { fontSize: 24, fontWeight: '700', color: C.black },
  statLbl:    { fontSize: 11, color: C.gray4, marginTop: 2 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 14, paddingBottom: 8 },
  dot:        { width: 8, height: 8, borderRadius: 4, backgroundColor: C.teal, marginRight: 8 },
  sectionTitle:{ fontSize: 14, fontWeight: '700', color: C.black },
  pinkHeart:  { color: C.pink, fontSize: 16, marginRight: 8 },
  actionRow:  { flexDirection: 'row', gap: 8, marginHorizontal: 12, marginTop: 4 },
  shuffleBtn: { flex: 1, backgroundColor: C.black, borderRadius: 14, paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  shuffleIcon:{ fontSize: 16 },
  shuffleText:{ color: C.white, fontWeight: '700', fontSize: 15 },
  heartBtn:   { width: 52, height: 52, borderRadius: 14, borderWidth: 1.5, borderColor: C.gray2, backgroundColor: C.white, alignItems: 'center', justifyContent: 'center' },
  heartBtnOn: { backgroundColor: C.pinkLight, borderColor: C.pink },
  empty:      { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 20 },
  emptyIcon:  { fontSize: 40, marginBottom: 10 },
  emptyTitle: { fontSize: 14, fontWeight: '600', color: C.gray5 },
  emptySub:   { fontSize: 12, color: C.gray3, textAlign: 'center', marginTop: 4 },
  pillList:   { paddingHorizontal: 12, paddingVertical: 4 },
  pill:       { width: 128, borderWidth: 0.5, borderColor: C.gray2, borderRadius: 14, padding: 10, backgroundColor: C.white, marginRight: 8 },
  pillEmojis: { flexDirection: 'row', gap: 2, marginBottom: 6 },
  pillLabel:  { fontSize: 11, color: C.gray4 },
});
