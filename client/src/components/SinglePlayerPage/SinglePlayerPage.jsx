import * as React from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";

function SinglePlayerPage() {
  const navigate = useNavigate();

  // const freePlayHandler = (response) => {
  //   navigate("/singlePlayer/freePlay")
  // };
  //
  // const levelPageHandler = (response) => {
  // };

  // TODO
  // useEffect(() => {
  //   modeListener("single");
  // }, []);

  return (
    <Grid sx={{ display: "inline-block" }}>
      <Button
        variant="contained"
        onClick={() => navigate("/main/singlePlayer/freePlay")}
      >
        Free Play
      </Button>
      <Button variant="contained" onClick={() => navigate("/main/levelsPage")}>
        Levels Page
      </Button>
    </Grid>
  );
}

export default SinglePlayerPage;
