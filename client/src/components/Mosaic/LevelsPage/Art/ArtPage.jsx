import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import Box from "@mui/material/Box";
import ImageListItem from "@mui/material/ImageListItem";
import {cubesImage} from "../../../cubesImage";
import "./ArtPage.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";
import MenuDetails from "./MenuDetails";

const theme = createTheme();

function ArtPage({user, uploadImagesFunc}) {
    const MySwal = withReactContent(Swal);

    const handleSolved = (selectedImage) => {
        if (selectedImage) {
            selectedImage.classList.add("image-solved");
        }
        MySwal.close();
    };


    const handleImageClick = (response) => {
        const clickedImage = response.target;
        MySwal.fire({
            title: "Solver",
            html: (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "inline-block", marginBottom: "10px" }}>
                        <Button
                            variant="contained"
                            onClick={handleUploadImageClick}
                        >
                            Upload cube images to solve
                        </Button>
                    </Box>
                    <Box sx={{ display: "inline-block" }}>
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
                    <label htmlFor="top">Top:</label>
                    <input type="file" id="top" name="top"/><br/>

                    <label htmlFor="bottom">Bottom:</label>
                    <input type="file" id="bottom" name="bottom"/><br/>

                    <label htmlFor="front">Front:</label>
                    <input type="file" id="front" name="front"/><br/>

                    <label htmlFor="back">Back:</label>
                    <input type="file" id="back" name="back"/><br/>

                    <label htmlFor="left">Left:</label>
                    <input type="file" id="left" name="left"/><br/>

                    <label htmlFor="right">Right:</label>
                    <input type="file" id="right" name="right"/><br/>
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
        }).then((response) => {
            if (response.isConfirmed) {
                // Callback function to be called when the confirmation button is clicked
                    // Initialize an empty array to hold the uploaded images
                    const uploadedImages = [];
                    // Loop through all six file input elements to check if any files have been selected
                    for (let i = 0; i < 6; i++) {
                        const fileInputId = ["top", "bottom", "front", "back", "left", "right"][i];
                        const fileInput = document.getElementById(fileInputId);
                        // If a file has been selected, add it to the array of uploaded images, otherwise add a null value
                        if (fileInput.files[0]) {
                            uploadedImages.push(fileInput.files[0]);
                        } else {
                            uploadedImages.push(null);
                        }
                    }

                uploadImagesFunc(uploadedImages);

            }
        })
    };

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" flexDirection="row" sx={{marginTop: 1}}>
                <MenuDetails user={user} />
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
