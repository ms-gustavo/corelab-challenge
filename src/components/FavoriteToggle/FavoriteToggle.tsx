import React from "react";
import StarIcon from "../StarIcon";

interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

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
