// Category Slider Variants Guide
// ==============================
//
// Two carousel variants are available for displaying categories:
//
// 1. PAGINATED CAROUSEL (Original - CatgorySlider)
//    Shows 4 items per page with pagination dots
//    Best for: Limited screen space, focused browsing
//    Usage:
//    <CatgorySlider data={categoriesData} />
//
// 2. FULL VIEW CAROUSEL (New - CatgorySliderFullView)
//    Shows all categories with continuous horizontal scrolling
//    Responsive: 8 items (desktop), 6 items (tablet), 4 items (mobile)
//    Best for: Showcasing all categories, discovery experience
//    Usage:
//    <CatgorySliderFullView data={categoriesData} />
//
// Both variants:
// - Display category icons with colors from database
// - Filter out "Others" category
// - Show loading skeleton while data fetches
// - Are fully responsive
// - Support smooth animations and transitions
//
// Example:
// --------
// import CatgorySlider from './categories_slider/CatgorySlider';
// import CatgorySliderFullView from './categories_slider/CatgorySliderFullView';
//
// const WelcomePage = () => {
//   const categoriesData = useSelector((state) => state.storeCategoriesReducer);
//
//   return (
//     <div>
//       {/* Option 1: Paginated carousel (4 per page) */}
//       <CatgorySlider data={categoriesData} />
//
//       {/* Option 2: Full view carousel (all visible with scroll) */}
//       <CatgorySliderFullView data={categoriesData} />
//     </div>
//   );
// };
//
// Component Props:
// ----------------
// Both components accept:
// - data: Array of category objects from Redux storeCategoriesReducer
//   Each category object must have:
//   {
//     id: number,
//     name: string,
//     key: string (translation key),
//     icon_name: string (React Icon component name),
//     icon_color: string (hex color code)
//   }
//
// Styling:
// --------
// CSS Variables used (from theme-variables.css):
// - --oasis-orange: Primary brand color for hover/focus
// - --text-primary: Main text color
// - --border-light/dark: Border colors
// - --border-radius-md/lg: Border radius values
// - --transition-smooth: Animation timing
// - --background-light/subtle: Background colors
//
// To customize appearance, edit:
// - src/client/welcome_page/categories_slider/CatgorySlider.css (paginated)
// - src/client/welcome_page/categories_slider/CatgorySliderFullView.css (full view)
