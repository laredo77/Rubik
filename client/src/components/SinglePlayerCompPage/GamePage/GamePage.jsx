import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Button from '@mui/material/Button';
import CubeContainer from "../../Cube/CubeContainer"
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
function GamePage() {
    const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
    <CubeContainer/>
</div>
<Button variant="contained" onClick={() => navigate("/singlePlayerCompPage/leaderBoard")}>LeaderBoard</Button>
</ThemeProvider>
  );
}

export default GamePage;