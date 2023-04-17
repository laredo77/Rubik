import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";


function MatchManager({ user, setMatch }) {
  const MySwal = withReactContent(Swal);
  let gameId = "";
  let gamePwd = "";
  let level = "";
  const navigate = useNavigate();
  const handleLevelChoose = (e) => {
    level = +e.target.innerText[6];
  };

  const newGameHandler = (response) => {
    MySwal.fire({
      title: "Choose Level",
      html: (
        <MenuList>
          <MenuItem onClick={handleLevelChoose}>
            <Typography variant="inherit">Level-1</Typography>
          </MenuItem>
          <MenuItem onClick={handleLevelChoose}>
            <Typography variant="inherit">Level-2</Typography>
          </MenuItem>
          <MenuItem onClick={handleLevelChoose}>
            <Typography variant="inherit">Level-3</Typography>
          </MenuItem>
        </MenuList>
      ),
      confirmButtonColor: "#50b7f5",
      showCloseButton: true,
      showCancelButton: true,
    }).then(async (response) => {
        if (response.isConfirmed) {
            //now navigate to game page
            await setMatch(user, level);
            navigate("/main/matchManager/match", {state: {Manager: user, Level: level}});
        } else if (response.isDenied) {
            // do nothing
        }
    });
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

export default MatchManager;
