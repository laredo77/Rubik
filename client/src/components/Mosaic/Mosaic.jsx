import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function TeamPlayPage({ user, joinGame }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  let gameId = "";
  let gamePwd = "";

  const newGameHandler = (response) => {
    // 1.choose level like single player
    // 2.send to DB and get in response Code+Password
    // 3.start to play (like in single player)
    navigate("/main/game/mosaic/levels");
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
        //now navigate to game page
      } else if (response.isDenied) {
        // do nothing
      }
    });
  };
  return (
      <Box
          sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
          }}
      >
          <Grid container spacing={3} justifyContent="center">
              <Grid item>
                  <Button
                      variant="contained"
                      size="large"
                      sx={{
                          color: "#fff",
                          "&:hover": {
                              backgroundColor: "#023e8a",
                          },
                          height: 125,
                          width: 180,
                      }}
                      onClick={newGameHandler}
                  >
                      New Game
                  </Button>
              </Grid>
              <Grid item>
                  <Button
                      variant="contained"
                      size="large"
                      sx={{
                          color: "#fff",
                          "&:hover": {
                              backgroundColor: "#023e8a",
                          },
                          height: 125,
                          width: 180,
                      }}
                      onClick={joinGameHandler}
                  >
                      Join Game
                  </Button>
              </Grid>
          </Grid>
      </Box>
  );
}

export default TeamPlayPage;
