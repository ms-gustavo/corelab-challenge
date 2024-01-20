import React from "react";

const ColorPickerMock: React.FC = () => {
  return (
    <div data-testid="color-picker-mock">
      <div
        className="color-option"
        data-color="red"
        onClick={() => onSelect("red")}
      >
        Red
      </div>
      <div
        className="color-option"
        data-color="blue"
        onClick={() => onSelect("blue")}
      >
        Blue
      </div>
      <div
        className="color-option"
        data-color="green"
        onClick={() => onSelect("green")}
      >
        Green
      </div>

      {/* Add more color options as needed */}
    </div>
  );
};

export default ColorPickerMock;
