import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormFields from "../FormFields";

jest.mock("../../FavoriteToggle/FavoriteToggle", () => (props) => (
  <div data-testid="favorite-toggle" onClick={props.onToggle}>
    {props.isFavorite ? "Favorited" : "Not Favorited"}
  </div>
));

describe("FormFields", () => {
  const mockFormik = {
    values: { title: "", backgroundColor: "", textColor: "", description: "" },
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    touched: { title: false, description: false },
    errors: { title: "", description: "" },
    submitCount: 0,
  };

  it("renders input and textarea correctly", () => {
    render(
      <FormFields
        mode="create"
        formik={mockFormik}
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
    );

    expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite aqui...")).toBeInTheDocument();
  });

  it("triggers handleChange on input change", () => {
    render(
      <FormFields
        mode="create"
        formik={mockFormik}
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "New Title" },
    });
    expect(mockFormik.handleChange).toHaveBeenCalled();
  });

  it("triggers handleAutoSave on input change in update mode", () => {
    const handleAutoSave = jest.fn();
    render(
      <FormFields
        mode="update"
        formik={mockFormik}
        handleAutoSave={handleAutoSave}
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "New Title" },
    });
    expect(handleAutoSave).toHaveBeenCalled();
  });

  it("displays error message for title when formik indicates an error", () => {
    const errorFormik = {
      ...mockFormik,
      touched: { ...mockFormik.touched, title: true },
      errors: { ...mockFormik.errors, title: "Error message" },
      submitCount: 1,
    };

    render(
      <FormFields
        mode="create"
        formik={errorFormik}
        isFavorite={false}
        onFavoriteToggle={() => {}}
      />
    );

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
