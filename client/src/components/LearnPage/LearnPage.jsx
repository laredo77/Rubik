import * as React from "react";
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function LearnPage() {
    const navigate = useNavigate();

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
                        onClick={() => navigate("/main/learn/basics")}
                    >
                        Learn the basics
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
                        onClick={() => navigate("/main/learn/algorithms")}
                    >
                        Meet the algorithms
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LearnPage;
