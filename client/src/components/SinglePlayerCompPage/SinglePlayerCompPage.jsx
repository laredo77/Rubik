import GoogleLogin from "react-google-login"; // itamar: do not delete
import gapi from "gapi-script"; // itamar: do not delete

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function SinglePlayerCompPage() {

    const handleLogin = async (response) => {
        console.log(response);
        // itamar: TODO add the user to db ...
    };

    const handleLoginFail = (response) => {
        console.log(response);
        // itamar: TODO handeling failur login to google
    };


    return (
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "80vh", display: "flex", alignItems: "center",
     justifyContent: "center"}}>
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                backgroundColor="#e6ecf0"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 50, height: 50 }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography
                        component="h1"
                        variant="h5"
                        marginBottom={"50px"}
                        color="black"
                        fontFamily={"Alef"}
                    >
                        Sign in
                    </Typography>
                    <GoogleLogin
                        // clientId should store in .env file
                        // clientId="390322363347-qb4ec69oeknbbjnnv52gns2n4nmv09od.apps.googleusercontent.com"
                        clientId="789241549760-hq6o3ovgaq1q4jjjp97pq00984317m0a.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLoginFail}
                        cookiePolicy={"single_host_origin"}
                        style={{ fontFamily: "Alef" }}
                    ></GoogleLogin>
                </Box>
            </Grid>
        </Grid>
    </ThemeProvider>
    );
  }
  
  export default SinglePlayerCompPage;