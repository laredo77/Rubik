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

export default function ResponsiveGrid() {
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
          <Item sx={{ height: 200 }} onClick={() => navigate("/tools/bsc")}>
            Breadth Search Crawler
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }} onClick={() => navigate("/tools22")}>
            Depth Search Crawler
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }}>
            Google Visible score:
            https://github.com/sundios/google-visibility-score
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }}>
            keyword tool generator:
            https://github.com/sundios/Keyword-generator-SEO
          </Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Item sx={{ height: 200 }}>
            keyword tool generator:
            https://github.com/sundios/Keyword-generator-SEO
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
