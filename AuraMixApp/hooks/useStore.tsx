import React, { createContext, useContext, useState, useCallback } from 'react';
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
}

const Store = createContext<StoreCtx>({} as StoreCtx);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wardrobe, setWardrobe]         = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);
  const [shuffleCount, setShuffleCount] = useState(0);

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

  return (
    <Store.Provider value={{
      wardrobe, savedOutfits, shuffleCount,
      addItem, removeItem, saveOutfit, removeSaved, incShuffle,
    }}>
      {children}
    </Store.Provider>
  );
}

export const useStore = () => useContext(Store);
