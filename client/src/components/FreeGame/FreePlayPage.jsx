import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CubeManager from "../Cube/CubeManager";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {CubeShuffle} from "../components-utils";
import {getMoveStack} from "../Cube/Controls/index";
import {changeCubeStringDefinition, isCubeStringCorrect} from "../Cube/CubeDefinition";

const theme = createTheme();

// FreePlayPage component
function FreePlayPage() {
    const MySwal = withReactContent(Swal);
    let lastHint = [undefined, undefined, undefined];

    // Function to handle the hint button click
    const hintButtonHandler = (response) => {
        let movesStack = getMoveStack();
        if (movesStack.length === 0) {
            // Display congratulations message if cube is already solved
            MySwal.fire({
                title: "Congratulations! You have successfully solved the cube",
                imageUrl: "https://media1.giphy.com/media/lPoOHG39XAlV4it61H/giphy.gif",
                imageHeight: 150,
                imageWidth: 350,
                confirmButtonColor: "#50b7f5",
                showCloseButton: true,
            });
        } else {
            let move = movesStack[movesStack.length - 1];
            if (movesStack.length > 0) {
                if (move[1] === lastHint[1] && move[2] === lastHint[2]) {
                    if (movesStack.length > 1) move = movesStack[movesStack.length - 2];
                }
            }
            lastHint = move;
            let direction;
            move[2] === 1 ? (direction = 0) : (direction = 1);
            let moveString = move[1].toString() + direction.toString();

            // Display hint for the next step
            MySwal.fire({
                title: "Here's a hint for the next step",
                imageUrl: `${response.view.origin}/cube-hints/${moveString}.png`,
                imageHeight: 150,
                imageWidth: 150,
                confirmButtonColor: "#50b7f5",
                showCloseButton: true,
            });
        }
    };

    // Function to handle the finish button click
    const finishButtonHandler = (response) => {
        let movesStack = getMoveStack();
        if (movesStack.length === 0 || isCubeStringCorrect()) {
            // Display congratulations message if cube is solved or in correct state
            MySwal.fire({
                title: "Congratulations! You have successfully solved the cube",
                imageUrl: "https://media1.giphy.com/media/lPoOHG39XAlV4it61H/giphy.gif",
                imageHeight: 150,
                imageWidth: 350,
                confirmButtonColor: "#50b7f5",
                showCloseButton: true,
            });
        } else {
            // Display message indicating the cube is still unsolved
            MySwal.fire({
                title: "The cube is still unsolved! Return to the game!",
                confirmButtonColor: "#50b7f5",
                showCloseButton: true,
            });
        }
    };

    // Function to handle the solve button click
    const solveButtonHandler = (response) => {
        let movesStack = getMoveStack();
        if (movesStack.length > 0) {
            var intr = setInterval(function () {
                let move = movesStack.pop();
                if (move[1] !== "x" && move[1] !== "y" && move[1] !== "z") {
                    move[1] = parseInt(move[1]) - 1;
                }
                move[2] === 1 ? (move[2] = 0) : (move[2] = 1);
                move[0](move[1], move[2]); // Activate spinSlice on slice and forward
                let arrowWithDirection;
                if (move[1] !== "x" && move[1] !== "y" && move[1] !== "z") {
                    arrowWithDirection = "a" + (move[1] + 1).toString() + move[2].toString();
                } else {
                    arrowWithDirection = "a" + move[1].toString() + move[2].toString();
                }
                changeCubeStringDefinition(arrowWithDirection);
                if (movesStack.length === 0) clearInterval(intr);
            }, 1000);
        }
    };

    // Function to handle the easy shuffle button click
    const easyShuffleHandler = () => {
        CubeShuffle(1);
    };

    // Function to handle the medium shuffle button click
    const mediumShuffleHandler = () => {
        CubeShuffle(2);
    };

    // Function to handle the tough shuffle button click
    const toughShuffleHandler = () => {
        CubeShuffle(3);
    };

    return (
        <ThemeProvider theme={theme}>
            <CubeManager controlsStatus={true} isMatch={false} id={""}/>
            <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: -25}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: 640
                }}>
                    {/* Buttons for different shuffle levels */}
                    <Button variant="contained" sx={{marginRight: 1}} onClick={easyShuffleHandler}>
                        Easy Shuffle!
                    </Button>
                    <Button variant="contained" sx={{marginRight: 1}} onClick={mediumShuffleHandler}>
                        Medium Shuffle!
                    </Button>
                    <Button variant="contained" sx={{marginRight: 1}} onClick={toughShuffleHandler}>
                        Tough Shuffle!
                    </Button>
                </Box>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                {/* Button for hint */}
                <Button variant="contained" sx={{marginRight: 1, width: 488, marginTop: 2}} onClick={hintButtonHandler}>
                    Hint
                </Button>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                {/* Buttons for finish and solve */}
                <Button variant="contained" sx={{marginRight: 1, width: 240, marginTop: 2}}
                        onClick={finishButtonHandler}>
                    Finish
                </Button>
                <Button variant="contained" sx={{marginRight: 1, width: 240, marginTop: 2}}
                        onClick={solveButtonHandler}>
                    Solve!
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default FreePlayPage;
