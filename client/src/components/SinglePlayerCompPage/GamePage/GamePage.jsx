import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Button from '@mui/material/Button';
// import CubeContainer from "../../Cube/CubeContainer"
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StopWatch from "../../StopWatch/StopWatch";
import { textAlign } from "@mui/system";

const theme = createTheme();
function GamePage() {
    const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
    <div className="app">
    {/* <CubeContainer/> */}
    </div>
<StopWatch />
<Button variant="contained" onClick={() => navigate("/singlePlayerCompPage/leaderBoard")}>LeaderBoard</Button>
<Button variant="contained" sx={{marginRight: 0, marginLeft: "auto", display: "block"}}>Level</Button>
<Button variant="contained" sx={{position: "absolute", bottom: 15, right: "38%"}}>Finish</Button>
<Button variant="contained" sx={{position: "absolute", bottom: 15, right: "52%"}}>Start Over</Button>
</ThemeProvider>
  );
}

export default GamePage;