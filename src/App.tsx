import { useEffect, useState } from "react";
import { useStore } from "./zustand/store.ts";

import Header from "./layouts/Header.tsx";
import Home from "./pages/Home.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  const fetchRecipes = useStore((state) => state.fetchRecipes);
  const recipes = useStore((state) => state.recipes);

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (recipes.length < 15) {
      setPage(page + 1);
      fetchRecipes(page).then(() => console.log("Recipes loaded!"));
    }
  }, [recipes]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
