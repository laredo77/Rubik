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
import {StopWatchAnimation} from "./StopWatch/StopWatchAnimation";
import {CubeShuffle} from "../components-utils"
import {movesStack} from "../Cube/Controls";
import {useEffect, useState} from "react"
import Client from "../../services/GameService";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";

const theme = createTheme();

function SinglePlayerCompMode({user, setGameLevel}) {
    const navigate = useNavigate();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    const MySwal = withReactContent(Swal);
    const [startTiming, setStartTiming] = React.useState(0);
    const [level, setLevel] = React.useState(0);
    let digit_level = 0;

    useEffect(() => {
        let startCheckbox = document.querySelector('#start');
        startCheckbox.disabled = true;
        let pauseCheckbox = document.querySelector('#pause');
        pauseCheckbox.disabled = true;
        let resetCheckbox = document.querySelector('#reset');
        resetCheckbox.disabled = true;
        MySwal.fire({
            title: "Choose Level",
            confirmButtonColor: "#50b7f5",
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            html: (
                <MenuList>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-1</Typography>
                    </MenuItem>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-2</Typography>
                    </MenuItem>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-3</Typography>
                    </MenuItem>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-4</Typography>
                    </MenuItem>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-5</Typography>
                    </MenuItem>
                    <MenuItem onClick={parseLevel}>
                        <Typography variant="inherit">Level-6</Typography>
                    </MenuItem>
                </MenuList>),
        }).then((response) => {
            if (response.isConfirmed) {
                if (digit_level != 0) {
                    handleLevelChoose(digit_level)
                } else {
                    window.location.reload(true);
                }
            }
        });
    }, []);


    const parseLevel = (e) => {
        let str_level = e.target.innerText;
        let d_level = parseInt(str_level.replace(/^\D+/g, '')); // Replace all leading non-digits with nothing
        setLevel(d_level)
        digit_level = d_level;
    };

    const handleLevelChoose = (argLevel) => {
        CubeShuffle(argLevel);
        //CubeShuffle(0.25);
        let startCheckbox = document.querySelector('#start');

        // Delay the execution of the code by 8 * 500 * digit_level milliseconds
        setTimeout(() => {
            startCheckbox.disabled = false;
            startCheckbox.click();
            startCheckbox.disabled = true;
            setStartTiming(new Date().getTime())
        }, 8 * 500 * argLevel);
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
            let end_time = new Date().getTime();
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
                    Client.postCompScore({
                        user: user.email,
                        level: level,
                        time: (end_time - startTiming) / 1000,
                    })
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
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default SinglePlayerCompMode;
