import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WardrobeItem, Outfit, INITIAL_WARDROBE } from '../constants/theme';

interface StoreCtx {
  wardrobe:     WardrobeItem[];
  savedOutfits: Outfit[];
  shuffleCount: number;
  addItem:      (item: WardrobeItem) => void;
  removeItem:   (id: string) => void;
  saveOutfit:   (outfit: Outfit) => void;
  removeSaved:  (id: string) => void;
  incShuffle:   () => void;
  clearWardrobe: () => void;
  clearSaved:    () => void;
  generateSmartOutfit: (wardrobe: WardrobeItem[]) => Outfit;
}

const Store = createContext<StoreCtx>({} as StoreCtx);
const STORAGE_KEY = '@AuraMix:store';

// Color classification helpers
function getColorClass(itemName: string): 'dark' | 'light' | 'neutral' {
  const lower = itemName.toLowerCase();
  if (/black|dark|navy|brown|gray|charcoal|olive|maroon|burgundy|denim/.test(lower)) return 'dark';
  if (/white|cream|beige|tan|light|pale|pastel|ivory|khaki/.test(lower)) return 'light';
  return 'neutral';
}

function getColorScore(top: WardrobeItem, bottom: WardrobeItem): number {
  const topColor = getColorClass(top.name);
  const bottomColor = getColorClass(bottom.name);
  
  // Dark top + light bottom = good (classic contrast)
  if (topColor === 'dark' && bottomColor === 'light') return 100;
  if (topColor === 'light' && bottomColor === 'dark') return 100;
  // Neutral items match everything well
  if (topColor === 'neutral' || bottomColor === 'neutral') return 80;
  // Same color class (if not neutral) = moderate match
  if (topColor === bottomColor) return 60;
  return 50;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wardrobe, setWardrobe]         = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [shuffleCount, setShuffleCount] = useState(0);

  useEffect(() => {
    const restore = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as { wardrobe?: WardrobeItem[]; savedOutfits?: Outfit[]; shuffleCount?: number };
        if (parsed.wardrobe) setWardrobe(parsed.wardrobe);
        if (parsed.savedOutfits) setSavedOutfits(parsed.savedOutfits);
        if (typeof parsed.shuffleCount === 'number') setShuffleCount(parsed.shuffleCount);
      } catch (error) {
        console.warn('Could not restore app state', error);
      }
    };
    restore();
  }, []);

  useEffect(() => {
    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ wardrobe, savedOutfits, shuffleCount }));
      } catch (error) {
        console.warn('Could not save app state', error);
      }
    };
    persist();
  }, [wardrobe, savedOutfits, shuffleCount]);

  const bycat = (arr: WardrobeItem[], cat: string) => arr.filter(i => i.cat === cat);
  const rand = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateSmartOutfit = useCallback((w: WardrobeItem[]): Outfit => {
    const tops = bycat(w, 'Top');
    const bots = bycat(w, 'Bottom');
    const shoes = bycat(w, 'Shoes');
    const accs = bycat(w, 'Accessories');

    if (tops.length === 0) {
      return { id: Date.now().toString(), top: null, bottom: null, shoes: null, accessories: null };
    }

    // Pick a random top
    const top = rand(tops);

    // Pick bottom with best color match to top
    let bottom: WardrobeItem | null = null;
    if (bots.length > 0) {
      bottom = bots.reduce((best, curr) => 
        getColorScore(top, curr) > getColorScore(top, best) ? curr : best
      );
    }

    // Shoes: neutral shoes work with everything (look for 'neutral' color class)
    let shoes_item: WardrobeItem | null = null;
    if (shoes.length > 0) {
      const neutralShoes = shoes.filter(s => getColorClass(s.name) === 'neutral');
      shoes_item = neutralShoes.length > 0 ? rand(neutralShoes) : rand(shoes);
    }

    // Accessories: pick any random accessory
    const accessories = accs.length > 0 ? rand(accs) : null;

    return {
      id: Date.now().toString(),
      top,
      bottom,
      shoes: shoes_item,
      accessories,
    };
  }, []);

  const addItem    = useCallback((item: WardrobeItem) =>
    setWardrobe(p => [...p, item]), []);
  const removeItem = useCallback((id: string) =>
    setWardrobe(p => p.filter(i => i.id !== id)), []);
  const saveOutfit = useCallback((outfit: Outfit) =>
    setSavedOutfits(p => [outfit, ...p]), []);
  const removeSaved = useCallback((id: string) =>
    setSavedOutfits(p => p.filter(o => o.id !== id)), []);
  const incShuffle = useCallback(() =>
    setShuffleCount(p => p + 1), []);
  const clearWardrobe = useCallback(() => setWardrobe([]), []);
  const clearSaved = useCallback(() => setSavedOutfits([]), []);

  return (
    <Store.Provider value={{
      wardrobe, savedOutfits, shuffleCount,
      addItem, removeItem, saveOutfit, removeSaved, incShuffle,
      clearWardrobe, clearSaved,
      generateSmartOutfit,
    }}>
      {children}
    </Store.Provider>
  );
}

export const useStore = () => useContext(Store);

