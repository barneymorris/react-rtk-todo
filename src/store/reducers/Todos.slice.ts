import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { todosMock } from "../../mocks/todos.mocks";
import { ITodoItem } from "./../../models/ITodoItem";
import { fetchTodos } from "./Todos.actions";

interface TodosState {
  todos: ITodoItem[];
  isLoading: boolean;
  error: string;
}

const initialState: TodosState = {
  todos: todosMock,
  isLoading: false,
  error: "",
};

export const TodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    toggleDone(state, action: PayloadAction<number>) {
      const neededIndex = state.todos.findIndex(
        (item) => item.id === action.payload
      );

      state.todos[neededIndex].completed = !state.todos[neededIndex].completed;
    },

    addTodo(state, action: PayloadAction<string>) {
      const lastIndex = state.todos.slice(-1)[0].id;
      state.todos.push({
        userId: lastIndex + 1,
        id: lastIndex + 1,
        title: action.payload,
        completed: false,
      });
    },

    removeTodo(state, action: PayloadAction<number>) {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
    },
  },

  extraReducers: {
    [fetchTodos.pending.type]: (state) => {
      state.isLoading = true;
      state.todos = [];
      state.error = "";
    },

    [fetchTodos.fulfilled.type]: (
      state,
      action: PayloadAction<ITodoItem[]>
    ) => {
      state.isLoading = false;
      state.todos = action.payload;
      state.error = "";
    },

    [fetchTodos.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.todos = [];
      state.error = action.payload;
    },
  },
});

export default TodosSlice.reducer;
