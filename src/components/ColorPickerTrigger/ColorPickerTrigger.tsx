import React, { useRef } from "react";
import ColorPicker from "../ColorPicker/ColorPicker";
import useOutsideClick from "../../hooks/useOutsideClick";
import changeText from "../../assets/changeText.svg";
import changeBG from "../../assets/changeBG.svg";

interface ColorPickerTriggerProps {
  type: "textColor" | "backgroundColor";
  onSelect: (color: string) => void;
  showPicker: boolean;
  togglePicker: () => void;
}

const ColorPickerTrigger: React.FC<ColorPickerTriggerProps> = ({
  type,
  onSelect,
  showPicker,
  togglePicker,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(pickerRef, () => {
    if (showPicker) {
      togglePicker();
    }
  });

  const imageSrc = type === "textColor" ? changeText : changeBG;
  const altText =
    type === "textColor" ? "Change text color" : "Change background color";

  return (
    <div className="color-picker-trigger">
      <div onClick={togglePicker}>
        <img src={imageSrc} alt={altText} />
      </div>
      {showPicker && (
        <div ref={pickerRef}>
          <ColorPicker onSelect={onSelect} />
        </div>
      )}
    </div>
  );
};

export default ColorPickerTrigger;
