// export type SaladCategory = 'base' | 'crunch' | 'soft' | 'unexpected' | 'protein' | 'dressing';

// export type WonderJarCategory = 'protein' | 'veggies' | 'starch' | 'sauce';

// export interface SaladIngredient {
//   name: string;
//   image: string;
  category: SaladCategory;
// }
// 
// export const saladBadCombos = [
//   ['pea_shoots', 'sprouts'],
//   ['cheese', 'cottage_cheese'],
//   ['dairy_based', 'cottage_cheese'],
//   ['steak', 'fruity'],
//   ['croutons', 'rice'],
//   ['vinaigrette', 'cottage_cheese']
// ];

// export const wonderJarBadCombos = [
//   ['peas', 'california']
// ];

export type SpinnerMode = 'salad' | 'wonder_jar';

export interface SpinnerModeConfig {
  name: string;
  categories: string[];
  data: Record<string, string[]>;
}

export const modeConfigs: Record<SpinnerMode, SpinnerModeConfig> = {
  salad: {
    name: 'Salad',
    categories: ['base', 'crunch', 'soft', 'unexpected', 'protein', 'dressing'],
    data: {
      base: ['lettuce', 'spinach', 'kale', 'chard', 'collards', 'arugula', 'pea_shoots', 'cabbage'],
      crunch: ['carrots', 'sprouts', 'cucumber', 'croutons', 'zucchini', 'bell_pepper', 'apple', 'seeds'],
      soft: ['roasted_sweet_potatoes', 'cheese', 'avocado', 'tomatoes', 'rice', 'olives'],
      unexpected: ['watermelon_cubes', 'cottage_cheese', 'hummus', 'bacon', 'pickled_veggies', 'herbs', 'dried_fruit'],
      protein: ['beans', 'eggs', 'tuna', 'chicken', 'steak', 'tofu', 'peas', 'quinoa', 'nuts'],
      dressing: ['mustard_based', 'tahini_based', 'dairy_based', 'vinaigrette', 'pesto_based', 'fruity']
    }
  },
  wonder_jar: {
    name: 'Wonder Jar',
    categories: ['protein', 'veggies', 'starch', 'sauce'],
    data: {
      protein: ['beans', 'lentils', 'peas', 'tofu', 'chicken', 'turkey'],
      veggies: ['california', 'broccoli', 'mixed_veg', 'stir_fry', 'zucchini_and_tomatoes', 'eggplant'],
      starch: ['rice', 'potatoes', 'pasta', 'quinoa', 'bread'],
      sauce: ['vinaigrette', 'hot_sauce', 'soy_sauce', 'sour_cream', 'mayonnaise', 'cheese']
    }
  }
};
