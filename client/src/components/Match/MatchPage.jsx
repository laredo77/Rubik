import * as React from "react";
import "./MatchPage.css";
import { useLocation } from "react-router-dom";
import CubeManager from "../Cube/CubeManager";
import MatchDetailsMenu from "./MatchDetailsMenu";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {CubeShuffle} from "../components-utils"

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
            CubeShuffle(level)
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

