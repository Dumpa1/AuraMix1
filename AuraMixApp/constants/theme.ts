export const C = {
  teal:       '#00C6CB',
  tealDark:   '#008F93',
  tealLight:  '#E0F9FA',
  black:      '#111111',
  white:      '#FFFFFF',
  gray1:      '#F7F7F7',
  gray2:      '#EEEEEE',
  gray3:      '#CCCCCC',
  gray4:      '#999999',
  gray5:      '#555555',
  pink:       '#FF6B9D',
  pinkLight:  '#FFE0EC',
  topBg:      '#E8F5FF',
  topText:    '#1A6FA8',
  bottomBg:   '#EEE8FF',
  bottomText: '#6040BB',
  shoesBg:    '#FFF0E8',
  shoesText:  '#C05020',
  accBg:      '#EAFFF0',
  accText:    '#1A7A40',
};

export const Colors = {
  light: {
    text: C.black,
    background: C.white,
    tint: C.teal,
    icon: C.gray4,
    tabIconDefault: C.gray4,
    tabIconSelected: C.teal,
  },
  dark: {
    text: C.white,
    background: C.black,
    tint: C.teal,
    icon: C.gray3,
    tabIconDefault: C.gray3,
    tabIconSelected: C.teal,
  },
};

export const Fonts = {
  rounded: undefined,
  mono: undefined,
};

export type Category = 'Top' | 'Bottom' | 'Shoes' | 'Accessories';

export interface WardrobeItem {
  id: string;
  name: string;
  cat: Category;
  emoji: string;
  color: string;
  tc: string;
  imageUri?: string;
}

export interface Outfit {
  id: string;
  top:         WardrobeItem | null;
  bottom:      WardrobeItem | null;
  shoes:       WardrobeItem | null;
  accessories: WardrobeItem | null;
}

export const CAT_EMOJI: Record<Category, string> = {
  Top: '👕', Bottom: '👖', Shoes: '👟', Accessories: '📿',
};
export const CAT_BG: Record<Category, string> = {
  Top: C.topBg, Bottom: C.bottomBg, Shoes: C.shoesBg, Accessories: C.accBg,
};
export const CAT_TC: Record<Category, string> = {
  Top: C.topText, Bottom: C.bottomText, Shoes: C.shoesText, Accessories: C.accText,
};
export const CATEGORIES: Category[] = ['Top', 'Bottom', 'Shoes', 'Accessories'];

export const INITIAL_WARDROBE: WardrobeItem[] = [
  { id: '1', name: 'Compression Shirt',     cat: 'Top',         emoji: '👕', color: C.topBg,    tc: C.topText    },
  { id: '2', name: 'Oversized Graphic Tee', cat: 'Top',         emoji: '👕', color: C.topBg,    tc: C.topText    },
  { id: '3', name: 'Cargo Pants',           cat: 'Bottom',      emoji: '👖', color: C.bottomBg, tc: C.bottomText },
  { id: '4', name: 'Wide Leg Jeans',        cat: 'Bottom',      emoji: '👖', color: C.bottomBg, tc: C.bottomText },
  { id: '5', name: 'Nike Journey Running',  cat: 'Shoes',       emoji: '👟', color: C.shoesBg,  tc: C.shoesText  },
  { id: '6', name: 'Air Force 1',           cat: 'Shoes',       emoji: '👟', color: C.shoesBg,  tc: C.shoesText  },
  { id: '7', name: 'Dog Tag Necklace',      cat: 'Accessories', emoji: '📿', color: C.accBg,    tc: C.accText    },
  { id: '8', name: 'Bucket Hat',            cat: 'Accessories', emoji: '🧢', color: C.accBg,    tc: C.accText    },
];

