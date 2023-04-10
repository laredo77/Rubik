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

  const hintButtonHandler = (response) => {
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
            }, 1000)
        }
    };

    const shuffleHandler = (response) => {
        let amountOfSteps = 16;
        let movesArray = []
        let choices = new Array(8).fill(0);
        choices.push(1)
        choices.push(1)
        for (let i = 0; i < amountOfSteps; i++) {
            const randomElement = choices[Math.floor(Math.random() * choices.length)];
            let random_arrow, random_direction, choice;
            if (randomElement === 0) {
                random_arrow = Math.floor(Math.random() * 8);
                random_direction = Math.floor(Math.random() * 2);
                choice = "a" + random_arrow.toString() + random_direction.toString()
            } else {
                let rotateArrows = ["x", "y", "z"]
                random_arrow = Math.floor(Math.random() * 3);
                random_direction = Math.floor(Math.random() * 2);
                choice = rotateArrows[random_arrow] + random_direction.toString()
            }
            movesArray.push(choice)
        }

        var intr = setInterval(function() {
            let move = movesArray.pop()
            var elements = document.querySelectorAll(`#${move}`);
            elements.forEach(function(element) {
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);
            });
            if (movesArray.length == 0) clearInterval(intr)
        }, 500)
    };

  return (
    <ThemeProvider theme={theme}>
        <CubeManager controlsStatus={true} isMatch={false}></CubeManager>
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
        onClick={hintButtonHandler}
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
