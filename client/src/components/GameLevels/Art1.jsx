import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {cubesImage} from "../cubesImage";
import "./Art1.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Button from "@mui/material/Button";

const theme = createTheme();

function Art1() {
    const MySwal = withReactContent(Swal);
    //const generateImage = (response) => {};
    const handleImageClick = (response) => {
        MySwal.fire({
            title: "Solver",
            html: (
                <i>
                    {/*{`hihihi`}*/}
                    {/*<br />*/}
                    <Button
                        variant="contained" onClick={handleUploadImageClick}
                        // sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
                    >
                        Upload cube images to solve
                    </Button>
                </i>
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
            // Callback function to be called when the confirmation button is clicked
            preConfirm: () => {
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
                // Create a new FormData object to hold the uploaded images
                const formData = new FormData();

                // Loop through all uploaded images and append them to the FormData object
                for (let i = 0; i < uploadedImages.length; i++) {
                    const file = uploadedImages[i];
                    if (file) {
                        formData.append(`file-${i}`, file);
                    }
                }

                // Send a POST request to the server-side script that handles file uploads
                fetch('/upload-images', {
                    method: 'POST',
                    body: formData
                })
                    // If the response is successful, log a success message to the console
                    .then(response => {
                        if (response.ok) {
                            console.log('Images uploaded successfully!');
                        } else {
                            console.error('Failed to upload images.');
                        }
                    })
                    // If an error occurs during the file upload process, log an error message to the console
                    .catch(error => {
                        console.error('An error occurred while uploading images:', error);
                    });
            },

        });
    };


    return (
        <ThemeProvider theme={theme}>
            <ImageList
                sx={{
                    marginRight: "auto",
                    marginLeft: "auto",
                    marginTop: "auto",
                    marginBottom: "auto",
                    width: 693, // 990 * 0.7
                    height: 567, // 810 * 0.7
                }}
                cols={30}
                //rowHeight={0}
                gap={0.5}
            >
                {cubesImage.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                            className={"zoom"}
                            onClick={handleImageClick}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </ThemeProvider>
    );
}

export default Art1;
