import * as React from "react";
import "./MatchPage.css";
import { useLocation } from "react-router-dom";
import CubeManager from "../Cube/CubeManager";
import MatchDetailsMenu from "./MatchDetailsMenu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MatchPage({ user2, getMatchStatus }) {
    const user = useSelector((state) => state.user);
    const location = useLocation();
    let level = location.state.Level;
    const MySwal = withReactContent(Swal);
    const matchStatus = useSelector((state) => state.matchReducer);
    const [showWaitAlert, setShowWaitAlert] = useState(true);

    useEffect(() => {
        getMatchStatus(user.email);
    }, []);

    useEffect(() => {
        if (matchStatus.status) {
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


            setShowWaitAlert(false);
            MySwal.close();
        } else {
            setShowWaitAlert(true);
        }
    }, [matchStatus]);

    useEffect(() => {
        if (showWaitAlert) {
            MySwal.fire({
                title: "Please Wait until player join the game",
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    }, [showWaitAlert]);

    return (
        <>
            {matchStatus.status ? (
                <div className="split lefti">
                    <MatchDetailsMenu user={user}></MatchDetailsMenu>
                    <CubeManager
                        controlsStatus={false}
                        isMatch={false}
                        user={user}
                    ></CubeManager>
                </div>
            ) : null}

            {matchStatus.status && (
                <div className="split righti">
                    <CubeManager
                        controlsStatus={true}
                        isMatch={true}
                        user={user}
                    ></CubeManager>
                </div>
            )}
        </>
    );
}

export default MatchPage;

