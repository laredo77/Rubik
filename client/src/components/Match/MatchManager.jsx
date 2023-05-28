import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import {useEffect} from "react";

// MatchManager component
function MatchManager({user, setMatch, joinMatch}) {
    const MySwal = withReactContent(Swal);
    let gameId = "";
    let gamePwd = "";
    let level = "";
    const navigate = useNavigate();
    const matchStatus = useSelector((state) => state.matchReducer.status);
    const matchDetails = useSelector((state) => state.matchReducer);

    // Handle choosing the game level from the menu
    const handleLevelChoose = (e) => {
        level = +e.target.innerText[6];
    };

    // Effect for redirecting to the match page when the match status changes
    useEffect(() => {
        if (matchStatus) {
            navigate("/main/matchManager/match", {state: {Manager: "", Level: level}});
        }
    }, [matchStatus]);

    // Handle creating a new game
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
                // Now navigate to game page
                await setMatch(user, level);
                navigate("/main/matchManager/match", {
                    state: {
                        Manager: user,
                        Level: level,
                        gameId: matchDetails.gameId,
                        password: matchDetails.password,
                    },
                });
            } else if (response.isDenied) {
                // Do nothing
            }
        });
    };

    // Handle joining a game
    const joinGameHandler = (response) => {
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
        }).then(async (response) => {
            if (response.isConfirmed) {
                // Now navigate to game page
                await joinMatch({user: user.email, gameId: gameId, password: gamePwd});
            } else if (response.isDenied) {
                // Do nothing
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
