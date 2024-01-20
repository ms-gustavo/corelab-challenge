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

export interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export interface FormFieldsProps {
  mode: "create" | "update";
  formik: FormikProps<TodoCreateData>;
  handleAutoSave?: () => void;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

export interface StarIconProps {
  isFavorite: boolean;
  onClick: () => void;
}

export interface TodoListContainerProps {
  todos: Todo[];
  onTodoDeleted: () => void;
  onUpdateTodoInList: (updatedTodo: Todo) => void;
}

export interface SearchBarProps {
  searchTerm: string;
  handleSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ColorPickerTriggerProps {
  type: "textColor" | "backgroundColor";
  onSelect: (color: string) => void;
  showPicker: boolean;
  togglePicker: () => void;
}

export interface ToDoCreationProps {
  onTodoCreated: () => void;
}

export interface TodoListProps {
  todos: Todo[];
  onTodoDeleted: (todoId: string) => void;
  onUpdateTodoInList: (updatedTodo: Todo) => void;
}

export interface ToDoFormProps {
  mode: "create" | "update";
  todoId?: string;
  initialValues?: ToDoInitialValues;
  onTodoCreated?: () => void;
  onTodoDeleted?: () => void;
  onUpdateTodoInList: (updatedTodo: Todo) => void;
}

export type ColorPickerProps = {
  onSelect: (color: string) => void;
};
