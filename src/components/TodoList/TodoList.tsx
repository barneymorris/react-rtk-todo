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
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Box className={styles.list}>
      {isLoading && <CircularProgress size={20} />}

      {!isLoading &&
        todos.map((todo) => (
          <TodoItem
            title={todo.title}
            completed={todo.completed}
            id={todo.id}
            key={todo.id}
            userId={todo.userId}
          />
        ))}
    </Box>
  );
};
