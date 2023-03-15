import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const options = [
  "Level-1",
  "Level-2",
  "Level-3",
  "Level-4",
  "Level-5",
  "Level-6",
  "Level-7",
];
const ITEM_HEIGHT = 48;

function OneVsOne({ user, setMatch }) {
  const MySwal = withReactContent(Swal);
  let gameId = "";
  let gamePwd = "";
  let level = "";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleLevelButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLevelChoose = (e) => {
    setAnchorEl(null);
    level = e.target.innerText;
  };

  const newGameHandler = (response) => {
    MySwal.fire({
      title: "Choose Level",
      html: (
        <i>
          {/*<div>*/}
          {/*  <IconButton*/}
          {/*    aria-label="more"*/}
          {/*    id="long-button"*/}
          {/*    aria-controls={open ? "long-menu" : undefined}*/}
          {/*    aria-expanded={open ? "true" : undefined}*/}
          {/*    aria-haspopup="true"*/}
          {/*    onClick={handleLevelButtonClick}*/}
          {/*  >*/}
          {/*    Level*/}
          {/*  </IconButton>*/}
          {/*  <Menu*/}
          {/*    id="long-menu"*/}
          {/*    MenuListProps={{*/}
          {/*      "aria-labelledby": "long-button",*/}
          {/*    }}*/}
          {/*    anchorEl={anchorEl}*/}
          {/*    open={open}*/}
          {/*    onClose={handleLevelChoose}*/}
          {/*    PaperProps={{*/}
          {/*      style: {*/}
          {/*        maxHeight: ITEM_HEIGHT * 4.5,*/}
          {/*        width: "20ch",*/}
          {/*      },*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {options.map((option) => (*/}
          {/*      <MenuItem*/}
          {/*        key={option}*/}
          {/*        selected={option === "Level-1"}*/}
          {/*        onClick={handleLevelChoose}*/}
          {/*      >*/}
          {/*        {option}*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </Menu>*/}
          {/*</div>*/}
        </i>
      ),
      confirmButtonColor: "#50b7f5",
      showCloseButton: true,
      showCancelButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        //now navigate to game page
        level = "level-1"; // temp line should remove after fixing level
        setMatch(user, level);
        navigate("/main/competition/match");
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

export default OneVsOne;
