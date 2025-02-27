export type SaladCategory = 'base' | 'crunch' | 'soft' | 'unexpected' | 'protein' | 'dressing';

export interface SaladIngredient {
  name: string;
  image: string;
  category: SaladCategory;
}

export const saladData = {
  base: ['lettuce', 'spinach', 'kale', 'chard', 'collards', 'arugula', 'pea_shoots', 'cabbage'],
  crunch: ['carrots', 'sprouts', 'cucumber', 'croutons', 'zucchini', 'bell_pepper', 'apple', 'seeds'],
  soft: ['roasted_sweet_potatoes', 'cheese', 'avocado', 'tomatoes', 'rice', 'olives'],
  unexpected: ['watermelon_cubes', 'cottage_cheese', 'hummus', 'bacon', 'pickled_veggies', 'herbs', 'dried_fruit'],
  protein: ['beans', 'eggs', 'tuna', 'chicken', 'steak', 'tofu', 'peas', 'quinoa', 'nuts'],
  dressing: ['mustard_based', 'tahini_based', 'dairy_based', 'vinaigrette', 'pesto_based', 'fruity']
};

export const badCombos = [
  ['pea_shoots', 'sprouts'],
  ['cheese', 'cottage_cheese'],
  ['dairy_based', 'cottage_cheese'],
  ['steak', 'fruity'],
  ['croutons', 'rice'],
  ['vinaigrette', 'cottage_cheese']
]; 