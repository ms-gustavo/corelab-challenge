import React from "react";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { container } from "@testing-library/react";

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

  it("updates input value", async () => {
    render(
      <ToDoForm
        mode="update"
        todoId="1"
        initialValues={{ title: "Initial Title" }}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    const titleInput = screen.getByPlaceholderText("Título");

    await act(async () => {
      fireEvent.change(titleInput, { target: { value: "Testing" } });
    });
    expect(titleInput).toHaveValue("Testing");

    const updatedValues = {
      ...initialValues,
      title: "Testing",
    };
    await todoApi.updateTodo("1", updatedValues);

    expect(todoApi.updateTodo).toHaveBeenCalledWith(
      "1",
      expect.objectContaining({ title: "Testing" })
    );
  });

  it("deletes a todo", async () => {
    todoApi.deleteTodo.mockImplementation(() => Promise.resolve());
    render(
      <ToDoForm
        mode="update"
        todoId="1"
        initialValues={initialValues}
        onTodoDeleted={mockOnTodoDeleted}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );
    fireEvent.click(screen.getByAltText("Remove button"));

    await waitFor(() => expect(todoApi.deleteTodo).toHaveBeenCalledWith("1"));
    expect(mockOnTodoDeleted).toHaveBeenCalled();
  });

  it("changes the color", async () => {
    todoApi.changeNoteColor.mockImplementation(() => Promise.resolve());
    render(
      <ToDoForm
        mode="update"
        todoId="1"
        initialValues={initialValues}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    const changeTextColorImg = screen.getByAltText("Change text color");
    await act(async () => {
      fireEvent.click(changeTextColorImg);
    });
    const redColorOption = document.querySelector(".color-option.red");
    await act(async () => {
      fireEvent.click(redColorOption);
    });
    const changeBackgroundColorImg = screen.getByAltText(
      "Change background color"
    );
    await act(async () => {
      fireEvent.click(changeBackgroundColorImg);
    });
    const whiteColorOption = document.querySelector(".color-option.white");
    await act(async () => {
      fireEvent.click(whiteColorOption);
    });
    await waitFor(() =>
      expect(todoApi.changeNoteColor).toHaveBeenCalledWith("1", "white", "red")
    );
  });
});
