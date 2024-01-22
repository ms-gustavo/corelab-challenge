import React from "react";
import { render, screen } from "@testing-library/react";
import SubmitButton from "../SubmitButton";

describe("SubmitButton", () => {
  it("renders a submit button", () => {
    render(<SubmitButton />);

    const button = screen.getByRole("button", { name: /criar nota/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("submit-button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
