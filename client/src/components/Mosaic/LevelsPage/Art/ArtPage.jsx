import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import {cubesImage} from "../../../components-utils";
import "./ArtPage.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import MenuDetails from "./MenuDetails";
import {useSelector} from "react-redux";
import Client from "../../../../services/GameService"

const theme = createTheme();

function ArtPage({user, uploadImagesFunc}) {
    const MySwal = withReactContent(Swal);
    const gameState = useSelector((state) => state.gameReducer);

    const handleSolved = (selectedImage) => {
        if (selectedImage) {
            selectedImage.classList.add("image-solved");
        }
        MySwal.close();
    };

    const actionCaptureHandler = async (response) => {
        await Client.uploadImages({action: response.target.id})
    }


    const handleImageClick = (response) => {
        const clickedImage = response.target;
        MySwal.fire({
            title: "Solver",
            html: (
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "inline-block", marginBottom: "10px"}}>
                        <Button
                            variant="contained"
                            onClick={handleUploadImageClick}
                        >
                            Upload cube images to solve
                        </Button>
                    </Box>
                    <Box sx={{display: "inline-block"}}>
                        <Button
                            variant="contained"
                            onClick={handleSolved(clickedImage)}
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
    const handleUploadImageClick = () => {
        // Show a popup dialog using SweetAlert2 library
        MySwal.fire({
            title: "Upload cube images to solve",
            // HTML content to be displayed inside the dialog
            html: (
                <div>
                    <Button id="top" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Top
                    </Button>
                    <br/>
                    <Button id="bottom" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Bottom
                    </Button>
                    <br/>
                    <Button id="front" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Front
                    </Button>
                    <br/>
                    <Button id="back" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Back
                    </Button>
                    <br/>
                    <Button id="left" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Left
                    </Button>
                    <br/>
                    <Button id="right" variant="contained" size="small" onClick={actionCaptureHandler}
                            style={{marginBottom: '5px'}}>
                        Right
                    </Button>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center", marginBottom: '5px'}}>
                        <Button id="clear" variant="contained" onClick={actionCaptureHandler}>
                            Clear
                        </Button>
                        <span style={{width: '5px'}}></span>
                        <Button id="confirm" variant="contained" onClick={actionCaptureHandler}>
                            Confirm
                        </Button>
                    </div>
                    <br/>
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
                        width: 693, // 990 * 0.7
                        height: 567, // 810 * 0.7
                    }}
                    cols={30}
                    gap={0.5}
                >
                    {cubesImage.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={item.img}
                                alt={item.title}
                                loading="lazy"
                                className={'zoom'}
                                onClick={handleImageClick}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </ThemeProvider>
    );
}

export default ArtPage;
