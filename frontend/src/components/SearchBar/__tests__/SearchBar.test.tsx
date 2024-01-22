import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders the search bar with logo and input field", () => {
    render(<SearchBar searchTerm="" handleSearchTermChange={() => {}} />);

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pesquisar notas")).toBeInTheDocument();
    expect(screen.getByAltText("SearchIcon")).toBeInTheDocument();
  });

  it("updates the search term on input change", () => {
    const handleSearchTermChange = jest.fn();
    render(
      <SearchBar
        searchTerm=""
        handleSearchTermChange={handleSearchTermChange}
      />
    );

    const input = screen.getByPlaceholderText("Pesquisar notas");
    fireEvent.change(input, { target: { value: "new search term" } });

    expect(handleSearchTermChange).toHaveBeenCalledTimes(1);
    expect(handleSearchTermChange).toHaveBeenCalledWith(expect.anything());
  });
});
