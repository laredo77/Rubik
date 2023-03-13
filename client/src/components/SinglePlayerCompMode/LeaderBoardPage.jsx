import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CubeContainer from "../Cube/CubeContainer";

const theme = createTheme();

function LeaderBoardPage({ user, setGameLevel }) {
  const navigate = useNavigate();

  const handleStartOverClick = (event) => {
    // maybe better not refresh?
  };

  return <ThemeProvider theme={theme}></ThemeProvider>;
}

export default LeaderBoardPage;
