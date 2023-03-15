import * as React from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CubeContainer from "../Cube/CubeContainer";
import "./MatchPage.css";

const theme = createTheme();

function MatchPage() {
  return (
    <>
      <div className="split left">
        <div className="centered">
          <h2>Jane Flex</h2>
          <p>Some text.</p>
        </div>
      </div>

      <div className="split right">
        <div className="app">
          <CubeContainer />
        </div>
      </div>
    </>
  );
}

export default MatchPage;
