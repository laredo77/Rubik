import "./MainPage.css";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import MainPageAnimation from "./MainPageAnimation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MainPage({ user }) {
  const navigate = useNavigate();

  return (
      <Box sx={{ flexGrow: 1, position: "relative", marginTop: 1}}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Item
              sx={{      height: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "24px",
                fontFamily: "Arial, sans-serif",
                  transition: "transform 0.2s",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  ":hover": {
                      transform: "scale(1.05)",
                  },}}
              onClick={() => navigate("/main/game/freePlay")}
          >
            <Box fontWeight="bold">Free Game</Box>
            <Box display="block">
              <img
                  src="/FreeGame.png"
                  alt="FreeGame"
                  //style={{ height: "80%", marginLeft: "1rem" }}
                  style={{ width: "35%", height: "auto", marginTop: 15 }}
              />
            </Box>
          </Item>
        </Grid>
          <MainPageAnimation/>
          <Grid item xs={2} sm={4} md={4}>
              <Item
                  sx={{      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      fontFamily: "Arial, sans-serif",
                      transition: "transform 0.2s",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      ":hover": {
                          transform: "scale(1.05)",
                      },}}
                  onClick={() => navigate("/main/game/mosaic")}
              >
                  <Box fontWeight="bold">Cube Mosaics</Box>
                  <Box display="block">
                      <img
                          src="/MosaicProject.png"
                          alt="Mosaic"
                          style={{ width: "35%", height: "auto", marginTop: 15 }}
                      />
                  </Box>
              </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <Item
                  sx={{      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      fontFamily: "Arial, sans-serif",
                      transition: "transform 0.2s",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      ":hover": {
                          transform: "scale(1.05)",
                      },}}
                  onClick={() => navigate("/main/learn")}
              >
                  <Box fontWeight="bold">Rubik Cube Algorithms</Box>
                  <Box display="block">
                      <img
                          src="/RubikCubeAlgorithms.png"
                          alt="algorithms"
                          style={{ width: "35%", height: "auto", marginTop: 15 }}
                      />
                  </Box>
              </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <Item
                  sx={{      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      fontFamily: "Arial, sans-serif",
                      transition: "transform 0.2s",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      ":hover": {
                          transform: "scale(1.05)",
                      },}}
                  onClick={() => navigate("/main/singlePlayerCompPage")}
              >
                  <Box fontWeight="bold">Competition Mode</Box>
                  <Box display="block">
                      <img
                          src="/Timer.png"
                          alt="timer"
                          style={{ width: "35%", height: "auto", marginTop: 15 }}
                      />
                  </Box>
              </Item>
          </Grid>
          {/*<MainPageAnimation></MainPageAnimation>*/}
          <Grid item xs={2} sm={4} md={4}>
              <Item
                  sx={{      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "24px",
                      fontFamily: "Arial, sans-serif",
                      transition: "transform 0.2s",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      ":hover": {
                          transform: "scale(1.05)",
                      },}}
                  onClick={() => navigate("/main/matchManager")}
              >
                  <Box fontWeight="bold">Match Game</Box>
                  <Box display="block">
                      <img
                          src="/Versus.png"
                          alt="versus"
                          style={{ width: "75%", height: "auto", marginTop: 15 }}
                      />
                  </Box>
              </Item>
          </Grid>
      </Grid>
    </Box>
  );
}

export default MainPage;
