import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { todosMock } from "../../../mocks/todos.mocks";
import todosReducer from "./../../../store/reducers/Todos.slice";
import { configureStore } from "@reduxjs/toolkit";
import { App } from "../App";
import { Provider } from "react-redux";

describe("App", () => {
  it("add new todo at the list", () => {
    const store = configureStore({
      reducer: { todosReducer },
      preloadedState: {
        todosReducer: { isLoading: false, error: "", todos: todosMock },
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.queryByTestId("app-input");
    const button = screen.queryByTestId("success-btn");

    if (input) {
      fireEvent.change(input, { target: { value: "NEW TODO!!!" } });
    }

    if (button) {
      fireEvent.click(button);
    }

    expect(store.getState().todosReducer.todos).toEqual([
      ...todosMock,
      { userId: 3, id: 3, title: "NEW TODO!!!", completed: false },
    ]);
  });
});
