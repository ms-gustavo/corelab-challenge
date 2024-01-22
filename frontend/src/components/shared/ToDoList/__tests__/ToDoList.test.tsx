import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../ToDoList";

jest.mock("../../ToDoForm/ToDoForm", () => (props) => (
  <div data-testid="todo-form" data-todoid={props.todoId}></div>
));

describe("TodoList", () => {
  const mockTodos = [
    {
      _id: "1",
      title: "First Todo",
      description: "Description 1",
      isFavorite: false,
      backgroundColor: "white",
      textColor: "black",
    },
    {
      _id: "2",
      title: "Second Todo",
      description: "Description 2",
      isFavorite: true,
      backgroundColor: "blue",
      textColor: "white",
    },
  ];

  const mockOnTodoDeleted = jest.fn();
  const mockOnUpdateTodoInList = jest.fn();

  it("renders a ToDoForm for each todo", () => {
    render(
      <TodoList
        todos={mockTodos}
        onTodoDeleted={mockOnTodoDeleted}
        onUpdateTodoInList={mockOnUpdateTodoInList}
      />
    );

    const forms = screen.getAllByTestId("todo-form");
    expect(forms).toHaveLength(mockTodos.length);
    forms.forEach((form, index) => {
      expect(form).toHaveAttribute("data-todoid", mockTodos[index]._id);
    });
  });
});
