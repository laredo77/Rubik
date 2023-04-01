import * as React from "react";
import Button from "@mui/material/Button";
import CubeManager from "../Cube/CubeManager";
import {movesStack} from "../Cube/Controls/index";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const theme = createTheme();

function FreePlayPage() {
    const MySwal = withReactContent(Swal);
  const hindButtonHandler = (response) => {
      if (movesStack.length == 0) {
          // fire everything looks good! your done.
          MySwal.fire({
              title: "Congratulations! You have successfully solved the cube",
              imageUrl: "https://media1.giphy.com/media/lPoOHG39XAlV4it61H/giphy.gif",
              imageHeight: 150,
              imageWidth: 350,
              confirmButtonColor: "#50b7f5",
              showCloseButton: true,
          });
      } else {
          // fire movestack.pop()
          let move = movesStack[movesStack.length - 1]
          let moveString = move[1].toString() + move[2].toString()
          MySwal.fire({
              title: "Here's a hint for the next step",
              imageUrl:`${response.view.origin}/cube-hints/${moveString}.png`,
              imageHeight: 150,
              imageWidth: 150,
              confirmButtonColor: "#50b7f5",
              showCloseButton: true,
          });
      }
  };

  const finishButtonHandler = (response) => {
      if (movesStack.length == 0) {
          // fire everything looks good! your done.
          MySwal.fire({
              title: "Congratulations! You have successfully solved the cube",
              imageUrl: "https://media1.giphy.com/media/lPoOHG39XAlV4it61H/giphy.gif",
              imageHeight: 150,
              imageWidth: 350,
              confirmButtonColor: "#50b7f5",
              showCloseButton: true,
          });
      } else {
          MySwal.fire({
              title: "The cube is still unsolved! Return to the game!",
              confirmButtonColor: "#50b7f5",
              showCloseButton: true,
          });
      }
  };

    const solveButtonHandler = (response) => {
        if (movesStack.length > 0) {
            var intr = setInterval(function() {
                let move = movesStack.pop()
                move[0](move[1], move[2]) // activate spinSlice on slice and forward
                if (movesStack.length == 0) clearInterval(intr)
            }, 800)
        }
    };

    const shuffleHandler = (response) => {
        let amountOfSteps = 16;
        let choices = new Array(8).fill(0);
        choices.push(1)
        choices.push(1)
        for (let i = 0; i < amountOfSteps; i++) {
            const randomElement = choices[Math.floor(Math.random() * choices.length)];
            if (randomElement === 0) {
                let random_arrow = Math.floor(Math.random() * 8);
                let random_direction = Math.floor(Math.random() * 2);
                // need to finish!!
            }
        }
    };

  return (
    <ThemeProvider theme={theme}>
        <CubeManager></CubeManager>
      <Button
        variant="contained"
        sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
        onClick={finishButtonHandler}
      >
        Finish
      </Button>
      <Button
        variant="contained"
        sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
        onClick={hindButtonHandler}
      >
        Hint
      </Button>
        <Button
            variant="contained"
            sx={{marginRight: 0, marginLeft: "auto", display: "block"}}
            onClick={solveButtonHandler}
        >
            Solve!
        </Button>
        <Button
            variant="contained"
            sx={{ marginRight: 0, marginLeft: "auto", display: "block" }}
            onClick={shuffleHandler}
        >
            Shuffle!
        </Button>
    </ThemeProvider>
  );
}

export default FreePlayPage;
