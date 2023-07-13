// store.ts
import { create } from "zustand";

export type Recipe = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  // Add other properties as needed
};

type Store = {
  recipes: Recipe[];
  selectedRecipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  fetchMoreRecipes: () => Promise<void>;
  selectRecipe: (recipe: Recipe) => void;
  deselectRecipe: (recipe: Recipe) => void;
  deleteSelectedRecipes: () => void;
};

const recipesPerPage: number = 15;

export const useStore = create<Store>((set) => ({
  recipes: [],
  selectedRecipes: [],
  fetchRecipes: async () => {
    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?per_page=${recipesPerPage}&page=1`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      const recipes = data.map((recipe: any) => ({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        image_url: recipe.image_url,
      }));
      set({ recipes });
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  },
  fetchMoreRecipes: async () => {
    try {
      //@ts-ignore
      const currentPage = set.getState().recipes.length / 15;

      const response = await fetch(
        `https://api.punkapi.com/v2/beers?per_page=${recipesPerPage}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch more recipes");
      }
      const data = await response.json();
      const moreRecipes = data.map((recipe: any) => ({
        id: recipe.id,
        name: recipe.name,
        // Map other properties as needed
      }));
      set((state) => ({ recipes: [...state.recipes, ...moreRecipes] }));
    } catch (error) {
      console.error(error);
      // Handle error state
    }
  },
  selectRecipe: (recipe) => {
    set((state) => ({
      selectedRecipes: [...state.selectedRecipes, recipe],
    }));
  },
  deselectRecipe: (recipe) => {
    set((state) => ({
      selectedRecipes: state.selectedRecipes.filter(
        (selectedRecipe) => selectedRecipe.id !== recipe.id
      ),
    }));
  },
  deleteSelectedRecipes: () => {
    set((state) => ({
      recipes: state.recipes.filter(
        (recipe) => !state.selectedRecipes.includes(recipe)
      ),
      selectedRecipes: [],
    }));
  },
}));
