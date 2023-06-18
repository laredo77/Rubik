import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {isEqual} from "lodash";

function TeamPlayPage({user, joinMosaicMatch}) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const gameData = useSelector((state) => state.mosaicReducer);
    const [prevGameData] = useState(gameData);
    let gameId = "";
    let gamePwd = "";

    // Handler for starting a new game
    const newGameHandler = () => {
        navigate("/main/game/mosaic/levels");
    };

    useEffect(() => {
        // Check if gameData object has changed
        if (isEqual(gameData, prevGameData)) {
            return; // Exit early if the gameData object hasn't changed
        }

        // Check if level_id is available in the gameData
        if (gameData.level_id) {
            navigate(`/main/game/mosaic/levels/${gameData.level_id}`);
        }
    }, [gameData, navigate, prevGameData]);

    // Handler for joining a game
    const joinGameHandler = () => {
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
                try {
                    const result = await joinMosaicMatch(gameId, gamePwd, user);
                    if (result) {
                        navigate(`/main/game/mosaic/levels/${result.level_id}`);
                    } else {
                        navigate("/main/game/mosaic");
                    }
                } catch (error) {
                    console.error(error);
                }
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

export default TeamPlayPage;
