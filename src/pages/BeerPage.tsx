import { useStore } from "../zustand/store.ts";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type IngredientHopsItem = {
  name: string;
  amount: { value: string; unit: string };
  add: string;
  attribute: string;
};

type IngredientMaltItem = {
  name: string;
  amount: { value: string; unit: string };
};

const BeerPage = () => {
  const fetchOneRecipe = useStore((state) => state.fetchOneRecipe);
  const { id } = useParams();
  const [data, setData] = useState<{ [key: string]: any }>();

  //Fetch one recipe by id and store it in "data"
  useEffect(() => {
    if (id) fetchOneRecipe(id).then((res) => setData(res.shift()));
  }, [id]);

  //destructuring from data object for convenience using
  const {
    name,
    image_url,
    description,
    first_brewed,
    contributed_by,
    ingredients,
  } = data || {};

  //Variable for reusable styles for table
  const borderStyle: string = "border border-solid border-black";

  return (
    <section className="flex justify-around items-center w-full">
      <article className="flex flex-col items-center h-auto w-1/2">
        <h1 className="text-4xl max-w-lg font-bold p-2 bg-amber-500 rounded my-10">
          {name}
          <span className="bg-blue-500 rounded p-1 text-lg ml-2 relative top-3">
            <i>first brewed in</i>
            &nbsp;
            <u>{first_brewed}</u>
          </span>
        </h1>
        <img src={image_url} alt={name} className="h-[500px]" />
        <p className="p-1 mt-5 border border-solid border-black rounded text-lg">
          Contributed by <i>{contributed_by}</i>
        </p>
      </article>
      <section className="flex flex-col items-center self-start w-1/2">
        <article className="flex flex-col items-center p-4">
          <h1 className="text-3xl mb-2">About</h1>
          <p className="font-bold">{description}</p>
        </article>
        <section className="w-[80%] text-center">
          <h1 className="text-3xl mb-2">Hops</h1>
          <table className={`w-full ${borderStyle}`}>
            <thead className={`${borderStyle}`}>
              <tr className="bg-cyan-500">
                <th className={`${borderStyle}`}>Name</th>
                <th className={`${borderStyle}`}>Amount</th>
                <th className={`${borderStyle}`}>Add</th>
                <th className={`${borderStyle}`}>Attribute</th>
              </tr>
            </thead>
            <tbody>
              {ingredients &&
                ingredients.hops.map((item: IngredientHopsItem, index: Key) => (
                  <tr className={`text-center ${borderStyle}`} key={index}>
                    <td className={`${borderStyle}`}>{item.name}</td>
                    <td className={`${borderStyle}`}>
                      {item.amount.value}&nbsp;{item.amount.unit}
                    </td>
                    <td className={`${borderStyle}`}>{item.add}</td>
                    <td className={`${borderStyle}`}>{item.attribute}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
        <section className="w-[80%] text-center">
          <h1 className="text-3xl my-2">Melt</h1>
          <table className={`w-full ${borderStyle}`}>
            <thead className={`${borderStyle}`}>
              <tr className="bg-cyan-500">
                <th className={`${borderStyle}`}>Name</th>
                <th className={`${borderStyle}`}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {ingredients &&
                ingredients.malt.map((item: IngredientMaltItem, index: Key) => (
                  <tr className={`text-center ${borderStyle}`} key={index}>
                    <td className={`${borderStyle}`}>{item.name}</td>
                    <td className={`${borderStyle}`}>
                      {item.amount.value}&nbsp;{item.amount.unit}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
};

export default BeerPage;
