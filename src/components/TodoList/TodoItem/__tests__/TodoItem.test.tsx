import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { todosMock } from "../../../../mocks/todos.mocks";
import { TodoItem } from "../TodoItem";
import todosReducer from "./../../../../store/reducers/Todos.slice";

describe("TodoItem", () => {
  it("can be successfully deleted", () => {
    const store = configureStore({
      reducer: todosReducer,
      preloadedState: {
        isLoading: false,
        error: "",
        todos: todosMock,
      },
    });

    render(
      <Provider store={store}>
        <TodoItem
          id={todosMock[2].id}
          userId={todosMock[2].userId}
          completed={todosMock[2].completed}
          title={todosMock[2].title}
        />
      </Provider>
    );

    const deleteIcon = screen.queryByTestId("handle-delete");

    if (deleteIcon) {
      fireEvent.click(deleteIcon);
    }

    expect(store.getState()).toEqual({
      isLoading: false,
      error: "",
      todos: todosMock.slice(0, 2),
    });
  });

  it("can be successfully toggled", () => {
    const store = configureStore({
      reducer: todosReducer,
      preloadedState: {
        isLoading: false,
        error: "",
        todos: todosMock,
      },
    });

    render(
      <Provider store={store}>
        <TodoItem
          id={todosMock[2].id}
          userId={todosMock[2].userId}
          completed={todosMock[2].completed}
          title={todosMock[2].title}
        />
      </Provider>
    );

    const doneIcon = screen.queryByTestId("handle-done");

    if (doneIcon) {
      fireEvent.click(doneIcon);
    }

    expect(store.getState()).toEqual({
      isLoading: false,
      error: "",
      todos: [
        ...todosMock.slice(0, 2),
        {
          title: todosMock[2].title,
          id: todosMock[2].id,
          userId: todosMock[2].userId,
          completed: true,
        },
      ],
    });
  });
});
