import React, {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function MenuDetails() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [anchorEl, setAnchorEl] = useState(null); // State to track the anchor element for the menu
    const open = Boolean(anchorEl); // Flag to determine if the menu is open or closed
    const levelDetails = useSelector((state) => state.mosaicReducer); // Accessing data from the Redux store

    // Event handler for opening the menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Event handler for closing the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Event handler for displaying game details using a Swal modal
    const handleGameDetails = () => {
        MySwal.fire({
            title: "Game Details",
            html: (
                <>
                    <Typography variant="inherit">
                        Game ID: {levelDetails.game_id}
                    </Typography>
                    <Typography variant="inherit">
                        Password: {levelDetails.password}
                    </Typography>
                </>
            ),
            confirmButtonColor: "#50b7f5",
            showCloseButton: true,
            showCancelButton: true,
        });

        setAnchorEl(null); // Closing the menu after displaying the details
    };

    // Event handler for quitting the game and navigating to the main page
    const handleQuit = async () => {
        navigate("/main");
        setAnchorEl(null); // Closing the menu after quitting
    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Menu
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <MenuItem onClick={handleGameDetails}>Game Details</MenuItem>
                <MenuItem onClick={handleQuit}>Quit</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuDetails;
