import { useStore } from "../zustand/store.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BeerPage = () => {
  const fetchOneRecipe = useStore((state) => state.fetchOneRecipe);
  const { id } = useParams();
  const [data, setData] = useState<{ [key: string]: any }>();

  useEffect(() => {
    if (id)
      fetchOneRecipe(id).then((res) => {
        console.log(res);
        setData(res);
      });
  }, [id]);

  return <article>{data && data[0].name}</article>;
};

export default BeerPage;
