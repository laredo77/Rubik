import * as React from "react";
import Button from "@mui/material/Button";
import CubeContainer from "../Cube/CubeContainer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function FreePlayPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CubeContainer />
      </div>
      <Button
        variant="contained"
        sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
      >
        Finish
      </Button>
      <Button
        variant="contained"
        sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
      >
        Hint
      </Button>
    </ThemeProvider>
  );
}

export default FreePlayPage;
