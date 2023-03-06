import "./MainPage.css";
import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { TabList, Tab } from "monday-ui-react-core";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MainPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/*{Array.from(Array(6)).map((_, index) => (*/}
        {/*  <Grid item xs={2} sm={4} md={4} key={index}>*/}
        {/*    <Item sx={{ height: 200 }}>Tool</Item>*/}
        {/*  </Grid>*/}
        {/*))}*/}
        <Grid item xs={2} sm={4} md={4}>
          <Item
            sx={{ height: 200 }}
            onClick={() => navigate("/main/singlePlayer")}
          >
            Single Player
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }} onClick={() => navigate("/main/teamPlay")}>
            Team Play
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item
            sx={{ height: 200 }}
            onClick={() => navigate("/main/singlePlayerCompPage")}
          >
            Single Player, Competitional Mode
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }}>Team Player, Competitional Mode</Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }} onClick={() => navigate("/main/about")}>
            Rubik's Cube Algorithms
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MainPage;