import { FC } from "react";

interface RecipeItemProps {
  name: string;
  description: string;
  image_url: string;
}

const RecipeItem: FC<RecipeItemProps> = ({ name, description, image_url }) => {
  return (
    <section className="w-[60%] h-80 flex items-center justify-around bg-amber-400 px-16 py-6 rounded-2xl mb-5">
      <article className="text-center w-1/2">
        <h2 className="text-4xl ">{name}</h2>
        <p>{description}</p>
      </article>
      <img src={image_url} alt={name} className="h-[80%]" />
    </section>
  );
};

export default RecipeItem;
