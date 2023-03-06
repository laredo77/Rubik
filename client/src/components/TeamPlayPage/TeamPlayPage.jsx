import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

function TeamPlayPage() {
  const navigate = useNavigate();

  const newGameHandler = (response) => {
    // 1.choose level like single player
    // 2.send to DB and get in response Code+Password
    // 3.start to play (like in single player)
    navigate("/main/teamPlay/levelsPage");
  };

  const joinGameHandler = (response) => {
    // 1.ask for Code+Password
    // 2.fetch from DB the game state and display
    // 3.every change of the player will connect the DB and then update in all others players
  };
  return (
    <Grid sx={{ display: "inline-block" }}>
      <Button variant="contained" onClick={newGameHandler}>
        New Game
      </Button>
      <Button variant="contained" onClick={joinGameHandler}>
        Join Game
      </Button>
    </Grid>
  );
}

export default TeamPlayPage;
