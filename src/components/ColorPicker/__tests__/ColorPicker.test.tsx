import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ColorPicker from "../ColorPicker";

test("ColorPicker allows color selection", () => {
  const onSelectMock = jest.fn();
  const { container } = render(<ColorPicker onSelect={onSelectMock} />);
  const colorOption = container.querySelector(".color-option.red");
  expect(colorOption).toBeInTheDocument();
  fireEvent.click(colorOption);
  expect(onSelectMock).toHaveBeenCalledWith("red");
});
