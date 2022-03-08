import { Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { useStyles } from "./TodoItem.styles";
import DoneIcon from "@mui/icons-material/Done";
import cx from "classnames";
import { WHITE_PRIMARY } from "../../../colors";
import { ITodoItem } from "../../../models/ITodoItem";
import { useAppDispatch } from "../../../hooks/redux";
import { TodosSlice } from "./../../../store/reducers/Todos.slice";
import DeleteIcon from "@mui/icons-material/Delete";

export const TodoItem: React.FC<ITodoItem> = ({ title, completed, id }) => {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const { toggleDone, removeTodo } = TodosSlice.actions;

  const handleDone = useCallback(() => {
    dispatch(toggleDone(id));
  }, [dispatch, id, toggleDone]);

  const handleRemove = useCallback(() => {
    dispatch(removeTodo(id));
  }, [dispatch, id, removeTodo]);

  return (
    <Box className={styles.todo}>
      <Typography
        className={cx(styles.title, { [styles.titleDone]: completed })}
      >
        {title}
      </Typography>
      <Box>
        <Icon
          className={styles.todoWrapper}
          onClick={handleDone}
          data-testid="handle-done"
        >
          <DoneIcon htmlColor={WHITE_PRIMARY} fontSize="medium" />
        </Icon>

        <Icon
          className={styles.todoWrapper}
          onClick={handleRemove}
          data-testid="handle-delete"
        >
          <DeleteIcon htmlColor={WHITE_PRIMARY} fontSize="medium" />
        </Icon>
      </Box>
    </Box>
  );
};
