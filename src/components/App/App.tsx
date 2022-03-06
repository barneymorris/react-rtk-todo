import React, { useCallback, useState } from "react";
import { useStyles } from "./App.styles";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { TodoList } from "../TodoList/TodoList";
import { useAppDispatch } from "../../hooks/redux";
import { TodosSlice } from "../../store/reducers/Todos.slice";

export const App = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleAddTodo = useCallback(() => {
    dispatch(TodosSlice.actions.addTodo(inputValue));
    setInputValue("");
  }, [dispatch, inputValue]);

  return (
    <Box className={styles.app}>
      <Container>
        <Typography classes={{ root: styles.header }}>
          ToDo App with following stack:
        </Typography>
        <ul>
          <li className={styles.listItem}>React + Redux</li>
          <li className={styles.listItem}>Redux Toolkit</li>
          <li className={styles.listItem}>
            Testing all this stuff with react-testing-library
          </li>
        </ul>

        <Typography classes={{ root: styles.label }}>
          Made by Lebedev
        </Typography>

        <TodoList />

        <Box className={styles.addWrapper}>
          <TextField
            onChange={handleChange}
            value={inputValue}
            className={styles.input}
            label="New Todo"
          />
          <Button
            disabled={!inputValue.trim().length}
            onClick={handleAddTodo}
            variant="contained"
            color="primary"
            classes={{ disabled: styles.buttonDisabled }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
