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
