import * as React from "react";
import Button from "@mui/material/Button";
import CubeContainer from "../Cube/CubeContainer";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const theme = createTheme();

function FreePlayPage() {
    const hindButtonHandler = (response) => {
        // 1. calculate current cube state
        // 2. check if the cube is not finished
        // 3. send to server the string cube state
        // 4. get back only one step and perform to the user
    };

    const finishButtonHandler = (response) => {
        // 1. calculate current cube state
        // 2. check if the cube is match to finish state
        // 3. if not, popup if the want to go back although the cube not finished
        // if yes navigate to singleplayerpage otherwise back to game
    };

    const solveButtonHandler = (response) => {
        // 1. calculate current cube state
        // 2. check if the cube is match to finish state
        // 3. if not, send current state string to solving algorithm execute solution
        // if yes do nothing
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <CubeContainer/>
            </div>
            <Button
                variant="contained"
                sx={{marginRight: 0, marginLeft: "auto", display: "block"}}
                onClick={finishButtonHandler}
            >
                Finish
            </Button>
            <Button
                variant="contained"
                sx={{marginRight: 0, marginLeft: "auto", display: "block"}}
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
        </ThemeProvider>
    );
}

export default FreePlayPage;
