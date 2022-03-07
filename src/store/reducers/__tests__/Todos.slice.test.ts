import { todosMock } from "../../../mocks/todos.mocks";
import { fetchTodos } from "../Todos.actions";
import reducer, { TodosSlice } from "./../Todos.slice";

const initialState = {
  todos: todosMock,
  isLoading: false,
  error: "",
};

describe("TodosSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "UNDEFINED_ACTION" })).toEqual({
      todos: [],
      isLoading: true,
      error: "",
    });
  });

  it("should add a new todo by correspondig action", () => {
    const lastIndex = reducer(initialState, {
      type: "UNDEFINED_ACTION",
    }).todos.slice(-1)[0].id;

    expect(
      reducer(initialState, TodosSlice.actions.addTodo("New todo"))
    ).toEqual({
      todos: [
        ...todosMock,
        {
          id: lastIndex + 1,
          userId: lastIndex + 1,
          title: "New todo",
          completed: false,
        },
      ],
      isLoading: false,
      error: "",
    });
  });

  it("should remove a todo by correspondig action", () => {
    const lastIndex = reducer(initialState, {
      type: "UNDEFINED_ACTION",
    }).todos.slice(-1)[0].id;

    expect(
      reducer(initialState, TodosSlice.actions.removeTodo(lastIndex))
    ).toEqual({
      todos: todosMock.filter((item) => item.id !== lastIndex),
      isLoading: false,
      error: "",
    });
  });

  it("should toogle a todo by correspondig action", () => {
    const lastIndex = reducer(initialState, {
      type: "UNDEFINED_ACTION",
    }).todos.slice(-1)[0].id;

    const lastElement = todosMock.slice(-1)[0];

    expect(
      reducer(initialState, TodosSlice.actions.toggleDone(lastIndex))
    ).toEqual({
      todos: [
        ...todosMock.slice(0, 2),
        {
          id: lastElement.id,
          userId: lastElement.userId,
          title: lastElement.title,
          completed: true,
        },
      ],
      isLoading: false,
      error: "",
    });
  });

  it("should have a loading = true and empty array of todos when todos is fetching", () => {
    expect(
      reducer(initialState, {
        type: fetchTodos.pending.type,
      })
    ).toEqual({
      todos: [],
      isLoading: true,
      error: "",
    });
  });

  it("should have a loading = false and some error when fetching todos is rejected with an error", () => {
    expect(
      reducer(initialState, {
        type: fetchTodos.rejected.type,
        payload: "Cannot fetch todos from jsonplaceholder api",
      })
    ).toEqual({
      todos: [],
      isLoading: false,
      error: "Cannot fetch todos from jsonplaceholder api",
    });
  });

  it("should return some todos when fetching todos is done", () => {
    expect(
      reducer(initialState, {
        type: fetchTodos.fulfilled.type,
        payload: [
          {
            id: 0,
            userId: 0,
            title: "New todo",
            completed: false,
          },
        ],
      })
    ).toEqual({
      todos: [
        {
          id: 0,
          userId: 0,
          title: "New todo",
          completed: false,
        },
      ],
      isLoading: false,
      error: "",
    });
  });
});
