import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TeamPlayPage({ user, modeListener, joinGame }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  let gameId = "";
  let gamePwd = "";

  useEffect(() => {
    modeListener("team");
  }, []);

  const newGameHandler = (response) => {
    // 1.choose level like single player
    // 2.send to DB and get in response Code+Password
    // 3.start to play (like in single player)
    navigate("/main/levelsPage");
  };

  const joinGameHandler = (response) => {
    // 1.ask for Code+Password
    // 2.fetch from DB the game state and display
    // 3.every change of the player will connect the DB and then update in all others players
    MySwal.fire({
      title: "Please Provide Game Details",
      html: (
        <i>
          <TextField
            id="gameId"
            label="Game ID"
            variant="outlined"
            onChange={(e) => {
              gameId = e.target.value;
            }}
          />
          <TextField
            id="gamePwd"
            label="Password"
            variant="outlined"
            onChange={(e) => {
              gamePwd = e.target.value;
            }}
          />
        </i>
      ),
      confirmButtonColor: "#50b7f5",
      showCloseButton: true,
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        joinGame(gameId, gamePwd, user);
      } else if (response.isDenied) {
        // do nothing
      }
    });
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
