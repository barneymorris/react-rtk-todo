import { BACKGROUND_PRIMARY, WHITE_PRIMARY } from "./../../colors";
import { makeStyles } from "@mui/styles";
import { HINT_PRIMARY } from "../../colors";

export const useStyles = makeStyles({
  app: {
    minHeight: "100vh",
    backgroundColor: BACKGROUND_PRIMARY,
  },

  header: {
    "&&": {
      paddingTop: 16,
      fontSize: 36,
      fontWeight: 600,
      color: WHITE_PRIMARY,
    },
  },

  listItem: {
    color: WHITE_PRIMARY,
    fontSize: 26,
  },

  label: {
    "&&": {
      marginTop: 8,
      color: HINT_PRIMARY,
    },
  },

  addWrapper: {
    display: "flex",
    marginTop: 16,
  },

  input: {
    "&&": {
      width: "100%",

      "&& input": {
        color: WHITE_PRIMARY,
      },

      "&& label": {
        color: WHITE_PRIMARY,
      },
    },

    "&& fieldset": {
      border: `1px solid ${WHITE_PRIMARY}`,
    },

    "&& .Mui-focused fieldset": {
      border: `1px solid ${WHITE_PRIMARY}`,
    },
  },

  buttonDisabled: {
    "&&": {
      backgroundColor: `${HINT_PRIMARY} !important`,
    },
  },
});
