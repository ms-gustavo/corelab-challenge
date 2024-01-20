import React from "react";
import "./ColorPicker.scss";
import { ColorPickerProps } from "../../types/todo";

const ColorPicker: React.FC<ColorPickerProps> = ({ onSelect }) => {
  const colors = [
    "black",
    "palegoldenrod",
    "lightpink",
    "peachpuff",
    "white",
    "lavender",
    "gray",
    "lightskyblue",
    "khaki",
    "gainsboro",
  ];

  return (
    <div className="color-picker-popup">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${color}`}
          onClick={() => onSelect(color)}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
