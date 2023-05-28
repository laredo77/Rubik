import * as React from "react";
import "./MatchPage.css";
import {useLocation, useNavigate} from "react-router-dom";
import CubeManager from "../Cube/CubeManager";
import MatchDetailsMenu from "./MatchDetailsMenu";
import Swal from "sweetalert2";
import Client from "../../services/GameService";
import withReactContent from "sweetalert2-react-content";
import {useSelector} from "react-redux";
import {useEffect} from "react";

function MatchPage({getMatchStatus}) {
    // Get user from Redux store
    const user = useSelector((state) => state.user);

    // Hooks
    const navigate = useNavigate();
    const location = useLocation();

    // Extracting data from location state
    let level = location.state.Level;
    let gameId = location.state.gameId;
    let gamePwd = location.state.password;

    // Custom Swal instance for SweetAlert2
    const MySwal = withReactContent(Swal);

    // Match status and details from Redux store
    const matchStatus = useSelector((state) => state.matchReducer.status);
    const matchDetails = useSelector((state) => state.matchReducer);

    // Array to store opponent moves
    let opponentMovesArray = [];

    // Quit status
    let quitStatus = false;

    // Effect to fetch match status
    useEffect(() => {
        getMatchStatus(user.email);
    }, []);

    // Effect to handle match status change
    useEffect(() => {
        if (matchStatus) {
            MySwal.close();
            if (!level) level = 1;
            initShuffle();
            setInterval(reRenderOppCube, 7000);
        } else {
            MySwal.fire({
                title: `Please Wait until the second player joins the game\n GameID: ${matchDetails.gameId}\n Password: ${matchDetails.password}`,
                showCloseButton: false,
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            });
        }
    }, [matchStatus]);

    // Function to initialize shuffle
    const initShuffle = async () => {
        let initMoves = await Client.getInitMatchMoves(level);
        var intr = setInterval(function () {
            let move = initMoves.shift();
            var elements = document.querySelectorAll(`#${move}`);
            elements.forEach(function (element) {
                const event = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                element.dispatchEvent(event);
            });
            if (initMoves.length == 0) clearInterval(intr);
        }, 500);
    };

    // Function to re-render opponent cube
    const reRenderOppCube = async () => {
        let response = await Client.getMatchState(user.email);
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
        opponentMovesArray = [...opponentMovesArray, ...response.moves];
        var intr = setInterval(function () {
            let move = opponentMovesArray.shift();
            var elements = document.querySelectorAll(`#a${move}1`);
            elements.forEach(function (element) {
                const event = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                element.dispatchEvent(event);
            });
            if (opponentMovesArray.length == 0) clearInterval(intr);
        }, 500);
    };

    return (
        <>
            {/* Render the match details menu and user's cube when match status is true */}
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

            {/* Render opponent's cube when match status is true */}
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
