import * as React from "react";
import Button from "@mui/material/Button";
import CubeContainer from "../Cube/CubeContainer";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StopWatch from "../StopWatch/StopWatch";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

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

function SinglePlayerCompMode({ user, setGameLevel }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleLevelButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLevelChoose = (e) => {
    // should render the cube as level choose
    // 1. send to server level choose
    // 2. get the steps
    // 3. mix the cube
    setAnchorEl(null);
    let level = e.target.innerText;
    setGameLevel({ player: user.email, level: level });
  };

  const handleStartOverClick = (event) => {
    // maybe better not refresh?
    window.location.reload(true);
  };

  const handleFinishButtonClick = (event) => {
    // send to server cube string
    // server check if its equal to finish state
    // if yes congrats
    // if no pop-up and say it's not finished yet are you sure you want to quit?
  };

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
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleLevelButtonClick}
        >
          Level
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleLevelChoose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === "Level-1"}
              onClick={handleLevelChoose}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: 15, right: "38%" }}
        onClick={handleFinishButtonClick}
      >
        Finish
      </Button>
      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: 15, right: "52%" }}
        onClick={handleStartOverClick}
      >
        Start Over
      </Button>
    </ThemeProvider>
  );
}

export default SinglePlayerCompMode;
