/**
 * Categories Data
 * Centralized categories list with icons and translations
 * 
 * Each category has:
 * - id: unique identifier (matches DB)
 * - key: translation key (pages.categories.{key})
 * - icon: React Icons component name from react-icons/md
 * - color: Brand color for icon
 * - description: Category description key (pages.categories.{key}_desc)
 */

import {
  MdCheckroom,
  MdLaptop,
  MdSchool,
  MdMenuBook,
  MdLocalGroceryStore,
  MdHome,
  MdSportsBasketball,
  MdFaceRetouchingNatural,
  MdGames,
  MdDiamond,
  MdDirectionsCar,
  MdPets,
  MdFavorite,
  MdNotepad,
  MdKitchen,
  MdChair,
  MdMusicNote,
  MdPalette,
  MdOutlineShopping,
  MdChildCare,
  MdFastfood,
  MdVideogameAsset,
  MdWatchLater,
  MdCamera,
  MdGifts,
  MdFitness,
  MdOutdoors,
  MdLocalLibrary,
  MdPlantPot,
} from 'react-icons/md';

export const CATEGORIES = [
  {
    id: 1,
    key: 'clothing',
    icon: MdCheckroom,
    color: '#FF6B35',
  },
  {
    id: 2,
    key: 'electronics',
    icon: MdLaptop,
    color: '#FF6B35',
  },
  {
    id: 3,
    key: 'education',
    icon: MdSchool,
    color: '#FF6B35',
  },
  {
    id: 4,
    key: 'books',
    icon: MdMenuBook,
    color: '#FF6B35',
  },
  {
    id: 5,
    key: 'groceries',
    icon: MdLocalGroceryStore,
    color: '#FF6B35',
  },
  {
    id: 6,
    key: 'home_decor',
    icon: MdHome,
    color: '#FF6B35',
  },
  {
    id: 7,
    key: 'sports_equipment',
    icon: MdSportsBasketball,
    color: '#FF6B35',
  },
  {
    id: 8,
    key: 'beauty_personal_care',
    icon: MdFaceRetouchingNatural,
    color: '#FF6B35',
  },
  {
    id: 9,
    key: 'toys_games',
    icon: MdGames,
    color: '#FF6B35',
  },
  {
    id: 10,
    key: 'jewelry_accessories',
    icon: MdDiamond,
    color: '#FF6B35',
  },
  {
    id: 11,
    key: 'automotive',
    icon: MdDirectionsCar,
    color: '#FF6B35',
  },
  {
    id: 12,
    key: 'pet_supplies',
    icon: MdPets,
    color: '#FF6B35',
  },
  {
    id: 13,
    key: 'health_wellness',
    icon: MdFavorite,
    color: '#FF6B35',
  },
  {
    id: 14,
    key: 'office_supplies',
    icon: MdNotepad,
    color: '#FF6B35',
  },
  {
    id: 15,
    key: 'home_appliances',
    icon: MdKitchen,
    color: '#FF6B35',
  },
  {
    id: 16,
    key: 'furniture',
    icon: MdChair,
    color: '#FF6B35',
  },
  {
    id: 17,
    key: 'music_instruments',
    icon: MdMusicNote,
    color: '#FF6B35',
  },
  {
    id: 18,
    key: 'art_craft_supplies',
    icon: MdPalette,
    color: '#FF6B35',
  },
  {
    id: 19,
    key: 'shoes',
    icon: MdOutlineShopping,
    color: '#FF6B35',
  },
  {
    id: 20,
    key: 'baby_kids',
    icon: MdChildCare,
    color: '#FF6B35',
  },
  {
    id: 21,
    key: 'food_beverages',
    icon: MdFastfood,
    color: '#FF6B35',
  },
  {
    id: 22,
    key: 'video_games',
    icon: MdVideogameAsset,
    color: '#FF6B35',
  },
  {
    id: 23,
    key: 'watches',
    icon: MdWatchLater,
    color: '#FF6B35',
  },
  {
    id: 24,
    key: 'cameras_photography',
    icon: MdCamera,
    color: '#FF6B35',
  },
  {
    id: 25,
    key: 'gifts_souvenirs',
    icon: MdGifts,
    color: '#FF6B35',
  },
  {
    id: 26,
    key: 'fitness_equipment',
    icon: MdFitness,
    color: '#FF6B35',
  },
  {
    id: 27,
    key: 'outdoor_gear',
    icon: MdOutdoors,
    color: '#FF6B35',
  },
  {
    id: 28,
    key: 'stationery',
    icon: MdLocalLibrary,
    color: '#FF6B35',
  },
  {
    id: 29,
    key: 'garden_plants',
    icon: MdPlantPot,
    color: '#FF6B35',
  },
];

/**
 * Get category by ID
 */
export const getCategoryById = (id) => {
  return CATEGORIES.find((cat) => cat.id === id);
};

/**
 * Get category by key
 */
export const getCategoryByKey = (key) => {
  return CATEGORIES.find((cat) => cat.key === key);
};

export default CATEGORIES;
