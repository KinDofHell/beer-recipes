import { create } from "zustand";

export type Recipe = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

type Store = {
  recipes: Recipe[];
  recipe: { [key: string]: any };
  selectedRecipes: Recipe[];
  fetchRecipes: (page: number) => Promise<void>;
  fetchOneRecipe: (id: string) => Promise<{ [key: string]: any }>;
  selectRecipe: (recipe: Recipe) => void;
  deselectRecipe: (recipe: Recipe) => void;
  deleteSelectedRecipes: () => void;
  clearSelected: () => void;
};

export const useStore = create<Store>((set) => ({
  recipes: [],
  recipe: {},
  selectedRecipes: [],
  //state for fetching all the recipes
  fetchRecipes: async (page: number) => {
    try {
      const response = await fetch(
        `https://api.punkapi.com/v2/beers?page=${page}`
      );
      if (!response.ok) new Error("Failed to fetch recipes");

      const data = await response.json();

      //new respond data will append to previous(this is for "always 15 recipes rendered")
      set((prevState) => ({
        recipes: [
          ...prevState.recipes,
          ...data.map((recipe: any) => ({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            image_url: recipe.image_url,
          })),
        ],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  //state for fetching recipe by id
  fetchOneRecipe: async (id: string) => {
    try {
      const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);

      if (!response.ok) new Error("Failed to fetch recipe");

      return await response.json();
    } catch (error) {
      console.error(error);
    }
  },
  //state for selecting recipe in list
  selectRecipe: (recipe) => {
    set((state) => ({
      selectedRecipes: [...state.selectedRecipes, recipe],
    }));
  },
  //state for deselecting recipe in list
  deselectRecipe: (recipe) => {
    set((state) => ({
      selectedRecipes: state.selectedRecipes.filter(
        (selectedRecipe) => selectedRecipe.id !== recipe.id
      ),
    }));
  },
  //state for deleting selected recipe from list
  deleteSelectedRecipes: () => {
    set((state) => ({
      recipes: state.recipes.filter(
        (recipe) => !state.selectedRecipes.includes(recipe)
      ),
      selectedRecipes: [],
    }));
  },
  //state for clearing selected list
  clearSelected: () => {
    set({ selectedRecipes: [] });
  },
}));
