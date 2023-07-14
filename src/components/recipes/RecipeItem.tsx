import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface RecipeItemProps {
  id: number;
  name: string;
  description: string;
  image_url: string;
  onContextMenu: MouseEventHandler;
  isSelected: boolean;
}

const RecipeItem: FC<RecipeItemProps> = ({
  id,
  name,
  description,
  image_url,
  onContextMenu,
  isSelected,
}) => {
  return (
    <Link
      to={`/beer-item/${id}`}
      className={`h-min-[700px] w-[400px] flex flex-col items-center justify-center mb-5 p-4 rounded ${
        isSelected ? "bg-blue-500" : "bg-amber-400"
      }`}
      onContextMenu={onContextMenu}
    >
      <img src={image_url} alt={name} className="h-[300px] mb-10" />
      <article className="text-center w-full">
        <h2 className="text-4xl ">{name}</h2>
        <p>{description}</p>
      </article>
    </Link>
  );
};

export default RecipeItem;
