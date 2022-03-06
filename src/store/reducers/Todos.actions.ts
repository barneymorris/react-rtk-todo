import { ITodoItem } from "./../../models/ITodoItem";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ITodoItem[]>(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
      );

      return response.data;
    } catch (e) {
      console.error("Cannot fetch todos from jsonplaceholder api", e);
      thunkAPI.rejectWithValue("Cannot fetch todos from jsonplaceholder api");
    }
  }
);
