/**
 * Icon Name Mapper
 * Maps icon names from database to react-icons/md components
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

const ICON_MAP = {
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
};

/**
 * Get icon component by name
 * @param {string} iconName - Name of the icon (e.g., 'MdCheckroom')
 * @returns {React.Component} Icon component or null if not found
 */
export const getIconComponent = (iconName) => {
  if (!iconName) return null;
  return ICON_MAP[iconName] || null;
};

/**
 * Render icon with dynamic component
 * @param {string} iconName - Name of the icon
 * @param {number} size - Icon size
 * @param {string} color - Icon color
 * @returns {JSX.Element} Rendered icon or null
 */
export const renderIcon = (iconName, size = 24, color = '#FF6B35') => {
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) return null;
  return <IconComponent size={size} style={{ color }} />;
};

export default ICON_MAP;
