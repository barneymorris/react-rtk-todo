import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchTodos } from "../../store/reducers/Todos.actions";
import { TodoItem } from "./TodoItem/TodoItem";
import { useStyles } from "./TodoList.styles";

export const TodoList = () => {
  const styles = useStyles();
  const todos = useAppSelector((store) => store.todosReducer.todos);
  const isLoading = useAppSelector((store) => store.todosReducer.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (!todos || !todos.length) && dispatch(fetchTodos());

    // For prevent network infinity flood
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Box className={styles.list}>
      {isLoading && (
        <Box data-testid="todolist-loading-spinner">
          <CircularProgress size={20} />
        </Box>
      )}

      {!isLoading && (
        <Box data-testid="todolist-content">
          {todos.map((todo) => (
            <TodoItem
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              key={todo.id}
              userId={todo.userId}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
