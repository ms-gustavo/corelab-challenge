import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ColorPickerTrigger from "../ColorPickerTrigger";

describe("ColorPickerTrigger", () => {
  it("should toggle color picker when trigger is clicked", () => {
    const togglePickerMock = jest.fn();
    const onSelectMock = jest.fn();
    const showPicker = false;

    const { getByAltText } = render(
      <ColorPickerTrigger
        type="textColor"
        onSelect={onSelectMock}
        showPicker={showPicker}
        togglePicker={togglePickerMock}
      />
    );

    fireEvent.click(getByAltText("Change text color"));

    expect(togglePickerMock).toHaveBeenCalledTimes(1);
  });
});
