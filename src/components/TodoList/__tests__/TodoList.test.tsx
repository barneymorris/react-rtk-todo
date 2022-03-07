import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { TodoList } from "../TodoList";
import { initialState } from "./../../../store/reducers/Todos.slice";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("TodoList", () => {
  it("successfully renders", () => {
    const store = mockStore({ todosReducer: initialState });

    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );

    expect(store.getActions()).toBeDefined();
  });
});
