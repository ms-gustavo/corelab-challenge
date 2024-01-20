import React from "react";
import { StarIconProps } from "../types/todo";

const StarIcon: React.FC<StarIconProps> = ({ isFavorite, onClick }) => {
  const fillColor = isFavorite ? "#FFFF00" : "#FFFFFF";

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fillColor}
      stroke="gray"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default StarIcon;
