import * as React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Client from "../../../../services/GameService"
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function MenuDetails({gameState}) {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGameDetails = () => {
        MySwal.fire({
            title: "Game Details",
            html: (
                <>
                    <Typography variant="inherit">Game ID: {gameState.gameId}</Typography>
                    <Typography variant="inherit">Password: {gameState.password}</Typography>
                </>
            ),
            confirmButtonColor: "#50b7f5",
            showCloseButton: true,
            showCancelButton: true,
        })
        setAnchorEl(null);
    };

    const handleQuit = async () => {
        navigate("/main");
        setAnchorEl(null);
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

export default MenuDetails;
