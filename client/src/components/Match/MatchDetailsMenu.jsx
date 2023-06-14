import * as React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Client from "../../services/GameService"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

// GameDetailsMenu component
function MatchDetailsMenu({user, matchID, matchPWD}) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const matchDetails = useSelector((state) => state.matchReducer);

    // Handle click event of the menu button
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Handle close event of the menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Handle displaying game details using SweetAlert
    const handleGameDetails = () => {
        MySwal.fire({
            title: "Match Details",
            html: (
                <>
                    <Typography variant="inherit">Match ID: {matchID}</Typography>
                    <Typography variant="inherit">Password: {matchPWD}</Typography>
                </>
            ),
            confirmButtonColor: "#50b7f5",
            showCloseButton: true,
            showCancelButton: true,
        })
        setAnchorEl(null);
    };

    // Handle quitting the game and redirecting to the main page
    const handleQuit = async () => {
        const response = await Client.quitMatch(user)
        setAnchorEl(null);
        navigate("/main");
        window.location.reload(true);
    };

    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
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
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleGameDetails}>Game Details</MenuItem>
                <MenuItem onClick={handleQuit}>Quit</MenuItem>
            </Menu>
        </div>
    );
}

export default MatchDetailsMenu;
