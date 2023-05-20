import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CubeManager from "../Cube/CubeManager";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {CubeShuffle} from "../components-utils"
import {getMoveStack} from "../Cube/Controls/index"
import {changeCubeStringDefinition, isCubeStringCorrect, tempFunctionPrintCubeDefinition} from "../Cube/CubeDefinition";

const theme = createTheme();

function FreePlayPage() {
    const MySwal = withReactContent(Swal);
    let lastHint = [undefined, undefined, undefined]

    const hintButtonHandler = (response) => {
        let movesStack = getMoveStack()
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
            let move = movesStack[movesStack.length-1]
            if (movesStack.length > 0) {
                if (move[1] == lastHint[1] && move[2] == lastHint[2]) {
                    if (movesStack.length > 1) move = movesStack[movesStack.length -2]
                }
            }
            lastHint = move
            let direction
            move[2] == 1 ? direction = 0 : direction = 1
            let moveString = move[1].toString() + direction.toString()
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

    const finishButtonHandler = (response) => {
        console.log(isCubeStringCorrect())
        tempFunctionPrintCubeDefinition()
        let movesStack = getMoveStack()
        if (movesStack.length == 0 || isCubeStringCorrect()) {
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
        let movesStack = getMoveStack()
        if (movesStack.length > 0) {
            var intr = setInterval(function () {
                let move = movesStack.pop()
                if (move[1] != "x" && move[1] != "y" && move[1] != "z") {
                    move[1] = parseInt(move[1]) - 1
                }
                move[2] == 1 ? move[2] = 0 : move[2] = 1
                move[0](move[1], move[2]) // activate spinSlice on slice and forward
                let arrowWithDirection;
                if (move[1] != "x" && move[1] != "y" && move[1] != "z") {
                    arrowWithDirection = "a" + (move[1] + 1).toString() + move[2].toString()
                } else {
                    arrowWithDirection = "a" + move[1].toString() + move[2].toString()
                }
                changeCubeStringDefinition(arrowWithDirection)
                if (movesStack.length == 0) clearInterval(intr)
            }, 1000)
        }
    };

    const easyShuffleHandler = () => {
        CubeShuffle(1)
    };

    const mediumShuffleHandler = () => {
        CubeShuffle(2)
    };

    const toughShuffleHandler = () => {
        CubeShuffle(3)
    };

    return (
        <ThemeProvider theme={theme}>
            <CubeManager controlsStatus={true} isMatch={false} id={""}></CubeManager>
            <Box sx={{display: "flex", justifyContent: "flex-end", marginTop: -25}}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: 640
                }}>
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
                <Button variant="contained" sx={{marginRight: 1, width: 488, marginTop: 2}} onClick={hintButtonHandler}>
                    Hint
                </Button>
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-end"}}>
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
