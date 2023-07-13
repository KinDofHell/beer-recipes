import { useEffect } from "react";
import { useStore } from "./zustand/store.ts";

import Header from "./layouts/Header.tsx";
import Home from "./pages/Home.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  const fetchRecipes = useStore((state) => state.fetchRecipes);

  useEffect(() => {
    fetchRecipes().then(() => console.log("Recipes loaded!"));
  }, [fetchRecipes]);

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
