import * as React from "react";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function LearnPage() {
    const navigate = useNavigate();

    return (
        <Grid sx={{display: "inline-block"}}>
            <Button
                variant="contained"
                onClick={() => navigate("/main/learn/basics")}
            >
                Learn the basics
            </Button>
            <Button variant="contained" onClick={() => navigate("/main/learn/algorithms")}>
                Meet the algorithms
            </Button>
        </Grid>
    );
}

export default LearnPage;
