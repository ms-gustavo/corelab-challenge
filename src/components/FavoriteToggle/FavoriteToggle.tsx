import React from "react";
import StarIcon from "../StarIcon";
import { FavoriteToggleProps } from "../../types/todo";

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({
  isFavorite,
  onToggle,
}) => {
  return (
    <div className={`favorite-toggle ${isFavorite ? "is-favorite" : ""}`}>
      <StarIcon isFavorite={isFavorite} onClick={onToggle} />
    </div>
  );
};

export default FavoriteToggle;
