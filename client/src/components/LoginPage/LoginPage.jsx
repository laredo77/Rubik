import GoogleLogin from "react-google-login"; // itamar: do not delete
import gapi from "gapi-script"; // itamar: do not delete

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginPageAnimation from "./LoginPageAnimation";

const theme = createTheme();

function LoginPage({ addNewUser }) {
  const navigate = useNavigate();

  const handleLogin = async (response) => {
    const user = {
      email: response.profileObj.email,
        img: response.profileObj.imageUrl,
      isLoading: false,
      isError: false,
    };

    try {
      await addNewUser(user);
    } catch (e) {
      //console.log(e);
    }
    navigate("./main");
  };

  const handleLoginFail = (response) => {
    //console.log(response);
    // itamar: TODO handeling failur login to google
  };

  // TEMP BUTTON AND THIS FUNCTION SHOULD BE REMOVED WHEN FINISH
  const tempButtonHandler = async (response) => {
    const user = {
      email: "MyUser@gmail.com",
      isLoading: false,
      isError: false,
    };

    try {
      await addNewUser(user);
    } catch (e) {

    }
    navigate("./main");
  };

    // TEMP BUTTON AND THIS FUNCTION SHOULD BE REMOVED WHEN FINISH
    const tempButtonHandler2 = async (response) => {
        const user = {
            email: "TempUser2@gmail.com",
            isLoading: false,
            isError: false,
        };

        try {
            await addNewUser(user);
        } catch (e) {

        }
        navigate("./main");
    };

  return (
      <ThemeProvider theme={theme}>
          <Grid
              container
              component="main"
              sx={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  paddingTop: "80px",
              }}
          >
              <Box
                  sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: 130,
                      left: 0,
                      right: 0,
                      bottom: "80vh",
                  }}
              >
                  <LoginPageAnimation />
              </Box>
              <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                  sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#e6ecf0",
                      paddingBottom: "50px",
                      top: 120,
                      width: 550,
                      height: 60,
                  }}
              >
                  <Box
                      sx={{
                          my: 4,
                          mx: 4,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center",
                          top: 15,
                      }}
                  >
                      <Avatar
                          sx={{ m: 0.5, bgcolor: "secondary.main", width: 50, height: 50 }}
                      >
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
                          clientId="789241549760-hq6o3ovgaq1q4jjjp97pq00984317m0a.apps.googleusercontent.com"
                          buttonText="Log in with Google"
                          onSuccess={handleLogin}
                          onFailure={handleLoginFail}
                          cookiePolicy={"single_host_origin"}
                          style={{
                              fontFamily: "Alef",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                          iconStyle={{ display: "flex", alignItems: "center", justifyContent: "center", }}
                          sx={{ mt: 2 }}
                      />
                  </Box>
              </Grid>
          </Grid>
          <Box sx={{ position: "absolute", top: 0, left: 0, m: 2 }}>
              <Button variant="contained" onClick={tempButtonHandler}>
                  TEMP BUTTON
              </Button>
          </Box>
          <Box sx={{ position: "absolute", top: 0, left: 150, m: 2 }}>
              <Button variant="contained" onClick={tempButtonHandler2}>
                  TEMP BUTTON 2
              </Button>
          </Box>

      </ThemeProvider>
  );
}

export default LoginPage;
