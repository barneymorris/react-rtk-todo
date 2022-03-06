import { makeStyles } from "@mui/styles";
import { GREEN_PRIMARY, HINT_PRIMARY } from "../../../colors";

export const useStyles = makeStyles({
  todo: {
    display: "flex",
    justifyContent: "space-between",
    border: `1px solid ${HINT_PRIMARY}`,
    padding: 16,
  },

  title: {
    "&&": {
      color: GREEN_PRIMARY,
      fontSize: 24,
      fontWeight: 600,
    },
  },

  titleDone: {
    "&&": {
      textDecoration: "line-through",
    },
  },

  todoWrapper: {
    cursor: "pointer",
  },
});
