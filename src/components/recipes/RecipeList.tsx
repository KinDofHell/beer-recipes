// RecipeList.tsx
import { MouseEvent } from "react";
import { useStore, Recipe } from "../../zustand/store.ts";
import RecipeItem from "./RecipeItem.tsx"; // Import the Recipe type from the store

const RecipeList = () => {
  const recipes = useStore((state: { recipes: Recipe[] }) => state.recipes); // Provide the correct type for state
  const selectedRecipes = useStore(
    (state: { selectedRecipes: Recipe[] }) => state.selectedRecipes
  ); // Provide the correct type for state
  const selectRecipe = useStore((state) => state.selectRecipe); // Keep the selectRecipe function as is
  const deselectRecipe = useStore((state) => state.deselectRecipe); // Keep the deselectRecipe function as is

  const handleRecipeClick = (
    event: MouseEvent<HTMLDivElement>,
    recipe: Recipe
  ) => {
    event.preventDefault();
    if (event.button === 2) {
      if (selectedRecipes.includes(recipe)) {
        deselectRecipe(recipe);
      } else {
        selectRecipe(recipe);
      }
    }
  };

  return (
    <section className="w-full">
      {recipes.map((recipe) => (
        <div
          className="flex justify-center"
          key={recipe.id}
          onClick={(event) => handleRecipeClick(event, recipe)}
          style={{
            backgroundColor: selectedRecipes.includes(recipe)
              ? "lightblue"
              : "transparent",
          }}
        >
          <RecipeItem
            key={recipe.id}
            name={recipe.name}
            description={recipe.description}
            image_url={recipe.image_url}
          />
        </div>
      ))}
    </section>
  );
};

export default RecipeList;
