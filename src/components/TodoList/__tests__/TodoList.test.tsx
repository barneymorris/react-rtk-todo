import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { TodoList } from "../TodoList";
import { initialState as initialStateWithoutPreloadData } from "./../../../store/reducers/Todos.slice";
import { todosMock } from "../../../mocks/todos.mocks";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialStateWithPreloadData = {
  todos: todosMock,
  isLoading: false,
  error: "",
};

describe("TodoList", () => {
  it("successfully renders with loader at first time", () => {
    const store = mockStore({ todosReducer: initialStateWithoutPreloadData });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(screen.queryByTestId("todolist-loading-spinner")).toBeDefined();
    expect(screen.queryByTestId("todolist-content")).toBe(null);
    expect(store.getActions().length).toEqual(1);
    expect(
      store.getActions().find((item) => item.type === "todos/fetchAll/pending")
    ).toBeDefined();
  });

  it("successfully renders with some data", () => {
    const store = mockStore({ todosReducer: initialStateWithPreloadData });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(screen.queryByTestId("todolist-loading-spinner")).toBe(null);
    expect(screen.queryByTestId("todolist-content")).toBeDefined();
    expect(store.getActions().length).toEqual(0);
    expect(
      store.getActions().find((item) => item.type === "todos/fetchAll/pending")
    ).not.toBeDefined();
  });
});
