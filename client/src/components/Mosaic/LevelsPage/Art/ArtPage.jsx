import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import {getCubesImages, getCubeIdFromImg} from "../../../components-utils";
import "./ArtPage.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import MenuDetails from "./MenuDetails";
import {useSelector} from "react-redux";
import Client from "../../../../services/GameService"
import {useEffect, useState} from "react";

const theme = createTheme();

const dimensions = {1: [693, 567], 2: [990, 720], 3: [990, 810]}

function ArtPage({user, uploadImagesFunc, markSolved, getGameState}) {
    const MySwal = withReactContent(Swal);
    const [previousState, setPreviousState] = useState(null);
    const gameState = useSelector((state) => state.gameReducer);
    const levelDetails = useSelector((state) => state.mosaicReducer);
    const game_id = levelDetails.game_id;
    const level = levelDetails.level_id;
    const cubesImage = getCubesImages(level);
    const elements = document.querySelectorAll('img');

    useEffect(() => {
        const updateGameState = async () => {
            await getGameState(game_id);
            const cubes = gameState.gameState;
            if (cubes) {
                cubes.forEach((cube) => {
                    handleSolved(elements[cube.cube_id], true).then();
                });
            }
        }

        // Call the function every 5 seconds
        const interval = setInterval(() => {
            if (previousState !== gameState) {
                updateGameState();
                setPreviousState(gameState);
            }
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, [gameState, getGameState]);

    const handleSolved = async (selectedImage, isReceiving) => {
        if (!isReceiving) {
            if (selectedImage) {
                try {
                    let cube_id = getCubeIdFromImg(selectedImage); //todo: if it crashed, this cube not exist in DB!
                    await markSolved(user, level, cube_id, game_id);
                } catch (error) {
                    console.log(error);
                    console.log("Error marking cube as solved");
                }
                selectedImage.className = "image-solved";
            }
        } else {
            selectedImage.className = "image-solved";
        }
    };

    const actionCaptureHandler = async (response, clickedImage) => {
        const result = await Client.uploadImages({action: response.target.id, clickedImage});
        document.getElementById("result").innerHTML = result;
    };

    const handleImageClick = (response) => {
        const clickedImage = response.target;
        const test = response.target.src;
        const srcUrl = new URL(clickedImage.src);
        const relativePath = srcUrl.pathname;
        MySwal.fire({
            title: "Solver",
            html: (
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "inline-block", marginBottom: "10px"}}>
                        <Button
                            variant="contained"
                            onClick={() => handleUploadImageClick(test)}
                        >
                            Upload cube images to solve
                        </Button>
                    </Box>
                    <Box sx={{display: "inline-block"}}>
                        <Button
                            variant="contained"
                            onClick={() => handleSolved(clickedImage, false)}
                        >
                            Mark as solved
                        </Button>
                    </Box>
                </Box>

            ),
            imageUrl: response.target.src,
            imageHeight: 90,
            confirmButtonColor: "#50b7f5",
            showCloseButton: true,
            showCancelButton: true,
        });
    };

    // Define a function that will handle the upload image button click event
    const handleUploadImageClick = (clickedImage) => {
        // Show a popup dialog using SweetAlert2 library
        MySwal.fire({
            title: "Upload cube images to solve",
            // HTML content to be displayed inside the dialog
            html: (
                <div>
                    <Button id="top" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Top
                    </Button>
                    <br/>
                    <Button id="bottom" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Bottom
                    </Button>
                    <br/>
                    <Button id="front" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Front
                    </Button>
                    <br/>
                    <Button id="back" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Back
                    </Button>
                    <br/>
                    <Button id="left" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Left
                    </Button>
                    <br/>
                    <Button id="right" variant="contained" size="small"
                            onClick={(event) => actionCaptureHandler(event, clickedImage)}
                            style={{marginBottom: '5px'}}>
                        Right
                    </Button>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: '5px'}}>
                        <Button id="clear" variant="contained"
                                onClick={(event) => actionCaptureHandler(event, clickedImage)}>
                            Clear
                        </Button>
                        <span style={{width: '5px'}}></span>
                        <Button id="confirm" variant="contained"
                                onClick={(event) => actionCaptureHandler(event, clickedImage)}>
                            Confirm
                        </Button>
                    </div>
                    <br/>
                    <div id="result"></div>
                </div>
            ),

            // Button color for the confirmation button
            confirmButtonColor: "#50b7f5",
            // Whether to show a close button in the dialog
            showCloseButton: true,
            // Whether to show a cancel button in the dialog
            showCancelButton: true,
            // Whether to focus on the confirmation button by default
            focusConfirm: false,
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" flexDirection="row" sx={{marginTop: 1}}>
                <MenuDetails gameState={gameState}/>
                <ImageList
                    sx={{
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        width: dimensions[level][0], // 990 * 0.7 , 693
                        height: dimensions[level][1], // 810 * 0.7 567
                    }}
                    cols={30}
                    gap={0.5}
                >
                    {cubesImage.map((item) =>
                        item.solved ? (
                            <ImageListItem key={item.img}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    className={'image-solved'}
                                    onClick={handleImageClick}
                                />
                            </ImageListItem>
                        ) : (
                            <img
                                key={item.img}
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                className={'zoom'}
                                onClick={handleImageClick}
                            />
                        )
                    )}
                </ImageList>
            </Box>
        </ThemeProvider>
    )
}

export default ArtPage;
