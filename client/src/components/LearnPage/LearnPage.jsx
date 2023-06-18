import React from "react";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LearnPage() {
    const navigate = useNavigate();

    const handleLearnBasicsClick = () => {
        navigate("/main/learn/basics");
    };

    const handleLearnAlgorithmsClick = () => {
        navigate("/main/learn/algorithms");
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
                        sx={buttonStyles}
                        onClick={handleLearnBasicsClick}
                    >
                        Learn the basics
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        size="large"
                        sx={buttonStyles}
                        onClick={handleLearnAlgorithmsClick}
                    >
                        Meet the algorithms
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

const buttonStyles = {
    color: "#fff",
    "&:hover": {
        backgroundColor: "#023e8a",
    },
    height: 125,
    width: 180,
};

export default LearnPage;
