import { MouseEvent } from "react";
import { useStore, Recipe } from "../../zustand/store.ts";

import RecipeItem from "./RecipeItem.tsx";
import DeleteButton from "../ui/buttons/DeleteButton.tsx";

//Component for rendering all the beers
const RecipeList = () => {
  const recipes = useStore((state: { recipes: Recipe[] }) => state.recipes);
  const selectedRecipes = useStore(
    (state: { selectedRecipes: Recipe[] }) => state.selectedRecipes
  );
  const selectRecipe = useStore((state) => state.selectRecipe);
  const deselectRecipe = useStore((state) => state.deselectRecipe);
  const deleteRecipe = useStore((state) => state.deleteSelectedRecipes);
  const clearSelected = useStore((state) => state.clearSelected);

  //Method for selecting and deselecting items
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
    <section className="w-full flex justify-around flex-wrap items-center">
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
            clearSelected();
          }}
        />
      )}
    </section>
  );
};

export default RecipeList;
