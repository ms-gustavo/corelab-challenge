export interface Todo {
  _id: string;
  title: string;
  description: string;
  isFavorite: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface TodoCreateData {
  title: string;
  description: string;
  isFavorite: boolean;
  backgroundColor?: string;
  textColor?: string;
}

export interface ToDoCreationProps {
  onTodoCreated: () => void;
}

export type ToDoFormProps = {
  mode: "create" | "update";
  todoId?: string;
  initialValues?: ToDoInitialValues;
  onTodoCreated?: () => void;
  onTodoDeleted?: () => void;
};

export type ColorPickerProps = {
  onSelect: (color: string) => void;
};
