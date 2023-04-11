import * as React from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CubeManager from "../Cube/CubeManager";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {StopWatchAnimation} from "../StopWatch/StopWatchAnimation";
import {CubeShuffle} from "../components-utils"
import {movesStack} from "../Cube/Controls";
import {useEffect} from "react"

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

function SinglePlayerCompMode({user, setGameLevel}) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        let startCheckbox = document.querySelector('#start');
        let pauseCheckbox = document.querySelector('#pause');
        let resetCheckbox = document.querySelector('#reset');
        startCheckbox.disabled = true;
        pauseCheckbox.disabled = true;
        resetCheckbox.disabled = true;
    }, []);

    const handleLevelButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLevelChoose = (e) => {
        setAnchorEl(null);
        let level = e.target.innerText;
        let digit_level = level.replace(/^\D+/g, ''); // Replace all leading non-digits with nothing
        CubeShuffle(digit_level);

        let startCheckbox = document.querySelector('#start');
        startCheckbox.disabled = true;

        // Delay the execution of the code by 8 * 500 * digit_level milliseconds
        setTimeout(() => {
            startCheckbox.disabled = false;
            startCheckbox.click();
            startCheckbox.disabled = true;
        }, 8 * 500 * digit_level);

        //setGameLevel({ player: user.email, level: level });
    };


    const handleStartOverClick = (event) => {
        // maybe better not refresh?
        window.location.reload(true);
    };

    const handleFinishButtonClick = (event) => {
        let pauseCheckbox = document.querySelector('#pause');
        pauseCheckbox.disabled = false;
        pauseCheckbox.click();
        pauseCheckbox.disabled = true;
        if (movesStack.length == 0) {
            // fire everything looks good! you are done.
            MySwal.fire({
                title: "Congratulations! You have successfully solved the cube",
                imageUrl: "https://media1.giphy.com/media/lPoOHG39XAlV4it61H/giphy.gif",
                imageHeight: 150,
                imageWidth: 350,
                confirmButtonColor: "#50b7f5",
                showCloseButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
            }).then((response) => {
                if (response.isConfirmed) {
                   // send to server the user details & time
                    // update the db and the leaderboard
                }
            });
        } else {
            MySwal.fire({
                title: "The cube is still unsolved! Return to the game!",
                confirmButtonColor: "#50b7f5",
                showCloseButton: false,
                showCancelButton: false,
                allowOutsideClick: false,
            }).then((response) => {
                if (response.isConfirmed) {
                    pauseCheckbox.disabled = false;
                    pauseCheckbox.click();
                    pauseCheckbox.disabled = true;
                }
            });

        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex">
                <CubeManager controlsStatus={true} isMatch={false}/>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{marginLeft: "-25rem", marginRight: "15rem", marginTop: "3rem", justifyContent: "flex-end"}}
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
