import * as React from "react";
import "./MatchPage.css";
import { useLocation } from "react-router-dom";
import CubeManager from "../Cube/CubeManager";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useSelector} from "react-redux";

function MatchPage() {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    let level = location.state.Level;
    //console.log(location.state);
    const MySwal = withReactContent(Swal);
    //let isMatchReady = Client.matchStatus(location.state.Manager)

    let isMatchReady = true;
    if (isMatchReady) {
        // DB says there is 2 players ready
        // should out from opacity
        // and shuffle the cube
        let amountOfSteps = 8 * level; // should be depended on level
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

    } else {
        //wait
        MySwal.fire({
            title: "Please Wait until player join the game",
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
        })
    }
    return (
        <>
            <div className="split lefti">
                <CubeManager controlsStatus={false} isMatch={false} user={user}></CubeManager>
            </div>

            <div className="split righti">
                <CubeManager controlsStatus={true} isMatch={true} user={user}></CubeManager>
            </div>
        </>
    );
}

export default MatchPage;
