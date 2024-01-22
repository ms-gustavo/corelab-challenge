import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FavoriteToggle from "../FavoriteToggle";

// Mock the StarIcon component
jest.mock("../../StarIcon", () => (props) => (
  <div data-testid="star-icon" onClick={props.onClick}>
    {props.isFavorite ? "Starred" : "Unstarred"}
  </div>
));

describe("FavoriteToggle", () => {
  it("renders with the correct class based on isFavorite prop", () => {
    const { container } = render(
      <FavoriteToggle isFavorite={true} onToggle={() => {}} />
    );
    expect(container.firstChild).toHaveClass("favorite-toggle is-favorite");

    render(<FavoriteToggle isFavorite={false} onToggle={() => {}} />);
    expect(container.firstChild).toHaveClass("favorite-toggle");
  });

  it("calls onToggle when the StarIcon is clicked", () => {
    const mockOnToggle = jest.fn();
    render(<FavoriteToggle isFavorite={false} onToggle={mockOnToggle} />);

    fireEvent.click(screen.getByTestId("star-icon"));
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
