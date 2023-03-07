import * as React from "react";

import Button from "@mui/material/Button";
import CubeContainer from "../Cube/CubeContainer";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StopWatch from "../StopWatch/StopWatch";

const theme = createTheme();

function SinglePlayerCompPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CubeContainer />
      </div>

      <StopWatch />
      <Button
        variant="contained"
        onClick={() => navigate("/main/singlePlayerCompPage/leaderBoard")}
      >
        LeaderBoard
      </Button>
      <Button
        variant="contained"
        sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
      >
        Level
      </Button>
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: 15, right: "38%" }}
      >
        Finish
      </Button>
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: 15, right: "52%" }}
      >
        Start Over
      </Button>
    </ThemeProvider>
  );
}

export default SinglePlayerCompPage;
