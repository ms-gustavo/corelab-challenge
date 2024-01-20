import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ToDoForm from "../ToDoForm";
import * as todoApi from "../../../../api/todoApi";

jest.mock("../../../../api/todoApi", () => ({
  createTodo: jest.fn(),
  updateTodo: jest.fn(),
  deleteTodo: jest.fn(),
  changeNoteColor: jest.fn(),
}));

const mockOnTodoCreated = jest.fn();
const mockOnTodoDeleted = jest.fn();
const mockOnUpdateTodoInList = jest.fn();

describe("<ToDoForm />", () => {
  const initialValues = {
    title: "Test",
    description: "Test",
    isFavorite: false,
    backgroundColor: "black",
    textColor: "white",
  };

  it("renders correctly in create mode", () => {
    const { getByText } = render(
      <ToDoForm
        mode="create"
        onTodoCreated={mockOnTodoCreated}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    expect(getByText("Create Note")).toBeInTheDocument();
  });

  it("renders correctly in update mode", () => {
    render(
      <ToDoForm
        mode="update"
        todoId="1"
        initialValues={initialValues}
        onTodoDeleted={mockOnTodoDeleted}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );
    expect(screen.getByAltText("Remove button")).toBeInTheDocument();
  });

  it("submits form to create a todo", async () => {
    todoApi.createTodo.mockImplementation(() => Promise.resolve());
    const { getByText } = render(
      <ToDoForm
        mode="create"
        onTodoCreated={mockOnTodoCreated}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Digite aqui..."), {
      target: { value: "Test" },
    });
    fireEvent.click(getByText("Create Note"));

    await waitFor(() =>
      expect(todoApi.createTodo).toHaveBeenCalledWith(initialValues)
    );
  });
});
