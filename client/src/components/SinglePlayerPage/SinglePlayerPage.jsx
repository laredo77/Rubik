import * as React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function SinglePlayerPage() {
  const navigate = useNavigate();

  // const freePlayHandler = (response) => {
  //   navigate("/singlePlayer/freePlay")
  // };
  //
  // const levelPageHendler = (response) => {
  // };

  return (
    <Grid sx={{ display: "inline-block" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/singlePlayer/freePlay")}
      >
        Free Play
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/singlePlayer/levelsPage")}
      >
        Levels Page
      </Button>
    </Grid>
  );
}

export default SinglePlayerPage;
