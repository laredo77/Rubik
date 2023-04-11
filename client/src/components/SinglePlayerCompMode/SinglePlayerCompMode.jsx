import * as React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import StopWatch from "../StopWatch/StopWatch";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CubeManager from "../Cube/CubeManager";
import Box from "@mui/material/Box";
import {StopWatchAnimation} from "../StopWatch/StopWatchAnimation";
import {CubeShuffle} from "../components-utils"
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
    setAnchorEl(null);
    let level = e.target.innerText;
    let digit_level = level.replace(/^\D+/g, ''); // Replace all leading non-digits with nothing
      CubeShuffle(digit_level)

    //setGameLevel({ player: user.email, level: level });
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
            <Box display="flex">
                <CubeManager controlsStatus={true} isMatch={false} />
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ marginLeft: "-25rem", marginRight: "15rem", marginTop: "3rem", justifyContent: "flex-end" }}
                >
                    <Box>
                        <StopWatchAnimation></StopWatchAnimation>
                        {/*<StopWatch />*/}
                    </Box>
                    <Box m={2} display="flex">
                        <Box mr={2}>
                            <Button sx={{width: 130}} variant="contained" onClick={handleStartOverClick}>
                                Start Over
                            </Button>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handleFinishButtonClick}>
                                Finish
                            </Button>
                        </Box>
                    </Box>
                    <Box m={2}>
                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate("/main/singlePlayerCompPage/leaderBoard")
                            }
                            sx={{width: 230}}
                        >
                            LeaderBoard
                        </Button>
                    </Box>
                    <Box m={2}>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleLevelButtonClick}
                        >
                            Choose Level
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
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );

}

export default SinglePlayerCompMode;
