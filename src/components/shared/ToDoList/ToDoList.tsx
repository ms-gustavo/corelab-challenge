import React from "react";
import { TodoListProps } from "../../../types/todo";
import ToDoForm from "../ToDoForm";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onTodoDeleted,
  onUpdateTodoInList,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <ToDoForm
          key={todo._id}
          mode="update"
          todoId={todo._id}
          initialValues={{
            title: todo.title,
            description: todo.description,
            isFavorite: todo.isFavorite,
            backgroundColor: todo.backgroundColor,
            textColor: todo.textColor,
          }}
          onTodoDeleted={() => onTodoDeleted(todo._id)}
          onUpdateTodoInList={onUpdateTodoInList}
        />
      ))}
    </>
  );
};

export default TodoList;
