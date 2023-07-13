import { FC, MouseEventHandler } from "react";

interface DeleteButtonProps {
  onClick: MouseEventHandler;
  className?: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-md bg-red-500 text-white ${className}`}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
