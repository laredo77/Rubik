import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./LeaderBoardPage.css";
import List from "./List";
import Button from "@mui/material/Button";

const theme = createTheme();

const temp_data = [
  {
    userID: "44e1f164-831d-4732-8e49-0cda24369000",
    displayName: "ImWord",
    picture:
      "https://assets-17app.akamaized.net/THUMBNAIL_4f761f7d-0b85-45dd-90ad-1444c548abd6.jpg",
    score: 17300,
  },
  {
    userID: "416089f2-f66a-411a-b275-2151d86dcaeb",
    displayName: "Dophine",
    picture:
      "https://assets-17app.akamaized.net/THUMBNAIL_59946513-FC72-4444-8CC9-991BFFF19C22.jpg",
    score: 15400,
  },
];

function LeaderBoardPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <List data={temp_data} />
      </div>
      <Button variant="contained" onClick={() => navigate("/main")}>
        Return
      </Button>
    </ThemeProvider>
  );
}

export default LeaderBoardPage;
