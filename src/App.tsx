import { useEffect } from "react";
import { useStore } from "./zustand/store.ts";

import Header from "./layouts/Header.tsx";
import Home from "./pages/Home.tsx";

function App() {
  const fetchRecipes = useStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes().then(() => console.log("Recipes loaded!"));
  }, [fetchRecipes]);

  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
