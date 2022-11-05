import "./MainPage.css";
import * as React from "react";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar/SearchBar";
import Grid from "@mui/material/Grid";

function MainPage() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#d6d6d6", pt: "500px" }}>
      <Grid
        position={"fixed"}
        top={120}
        width={"90%"}
        bgcolor={"#1976d2"}
        marginLeft={2}
      >
        <SearchBar></SearchBar>
      </Grid>
    </Box>
  );
}

export default MainPage;
