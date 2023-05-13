import * as React from "react";
import "./MatchPage.css";
import {useLocation, useNavigate} from "react-router-dom";
import CubeManager from "../Cube/CubeManager";
import MatchDetailsMenu from "./MatchDetailsMenu";
import Swal from "sweetalert2";
import Client from "../../services/GameService"
import withReactContent from "sweetalert2-react-content";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function MatchPage({user2, getMatchStatus}) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    let level = location.state.Level;
    let gameId = location.state.gameId;
    let gamePwd = location.state.password;
    const MySwal = withReactContent(Swal);
    const matchStatus = useSelector((state) => state.matchReducer.status);
    const matchDetails = useSelector((state) => state.matchReducer);
    let opponentMovesArray = []
    let quitStatus = false

    useEffect(() => {
        getMatchStatus(user.email);
    }, []);

    useEffect(() => {
        if (matchStatus) {
            MySwal.close();
            if (!level) level = 1;
            initShuffle()
            setInterval(reRenderOppCube, 7000);
        } else {
            MySwal.fire({
                title: `Please Wait until second player join the game\n GameID: ${matchDetails.gameId}\n Password: ${matchDetails.password}`,
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    }, [matchStatus]);

    const initShuffle = () => {
        let initMoves = ["20", "51", "71", "x0", "31", "10", "y1", "81"]
        var intr = setInterval(function () {
            let move = initMoves.shift()
            var elements = document.querySelectorAll(`#a${move}`);
            elements.forEach(function (element) {
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);
            });
            if (initMoves.length == 0) clearInterval(intr)
        }, 500)
    }

    const reRenderOppCube = async () => {
        //re render
        let response = await Client.getMatchState(user.email)
        if (response.quitStatus != -1) {
            MySwal.fire({
                title: "The second player left the match.",
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
            setTimeout(() => {
                MySwal.close();
                navigate("/main");
                window.location.reload(true);
            }, 4000);
        }
        opponentMovesArray = [...opponentMovesArray, ...response.moves]
        var intr = setInterval(function () {
            let move = opponentMovesArray.shift()
            var elements = document.querySelectorAll(`#a${move}1`);
            elements.forEach(function (element) {
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);
            });
            if (opponentMovesArray.length == 0) clearInterval(intr)
        }, 500)
    }

    return (
        <>
            {matchStatus ? (
                <div className="split lefti">
                    <MatchDetailsMenu user={user}></MatchDetailsMenu>
                    <CubeManager
                        controlsStatus={false}
                        isMatch={false}
                        user={user}
                        id={"1"}
                    ></CubeManager>
                </div>
            ) : null}

            {matchStatus && (
                <div className="split righti">
                    <CubeManager
                        controlsStatus={true}
                        isMatch={true}
                        user={user}
                        id={""}
                    ></CubeManager>
                </div>
            )}
        </>
    );
}

export default MatchPage;