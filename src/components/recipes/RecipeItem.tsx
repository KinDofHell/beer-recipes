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
      className={`w-[60%] h-80 flex items-center justify-around px-16 py-6 rounded-2xl mb-5 ${
        isSelected ? "bg-blue-500" : "bg-amber-400"
      }`}
      onContextMenu={onContextMenu}
    >
      <article className="text-center w-1/2">
        <h2 className="text-4xl ">{name}</h2>
        <p>{description}</p>
      </article>
      <img src={image_url} alt={name} className="h-[80%]" />
    </Link>
  );
};

export default RecipeItem;
