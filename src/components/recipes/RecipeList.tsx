// RecipeList.tsx
import { MouseEvent } from "react";
import { useStore, Recipe } from "../../zustand/store.ts";
import RecipeItem from "./RecipeItem.tsx";
import DeleteButton from "../ui/buttons/DeleteButton.tsx"; // Import the Recipe type from the store

const RecipeList = () => {
  const recipes = useStore((state: { recipes: Recipe[] }) => state.recipes); // Provide the correct type for state
  const selectedRecipes = useStore(
    (state: { selectedRecipes: Recipe[] }) => state.selectedRecipes
  ); // Provide the correct type for state
  const selectRecipe = useStore((state) => state.selectRecipe); // Keep the selectRecipe function as is
  const deselectRecipe = useStore((state) => state.deselectRecipe); // Keep the deselectRecipe function as is
  const deleteRecipe = useStore((state) => state.deleteSelectedRecipes); //
  const clear = useStore((state) => state.clear); // Access the clear function

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
    <section className="w-full flex flex-col items-center">
      {recipes.slice(0, 15).map((recipe) => (
        <RecipeItem
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          description={recipe.description}
          image_url={recipe.image_url}
          onContextMenu={(event: MouseEvent<HTMLDivElement>) =>
            handleRecipeClick(event, recipe)
          }
          isSelected={selectedRecipes.includes(recipe)}
        />
      ))}
      {selectedRecipes.length > 0 && (
        <DeleteButton
          className="fixed right-20 top-7"
          onClick={() => {
            deleteRecipe();
            clear();
          }}
        />
      )}
    </section>
  );
};

export default RecipeList;
