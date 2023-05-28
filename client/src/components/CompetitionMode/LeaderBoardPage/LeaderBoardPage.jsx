import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import "./LeaderBoardPage.css";
import List from "./List";
import Button from "@mui/material/Button";
import Client from "../../../services/GeneralServices";

// Create a MUI theme
const theme = createTheme();

function LeaderBoardPage() {
    const [leaderBoardData, setLeaderBoardData] = useState([]);
    const navigate = useNavigate();

    // Fetch leaderboard data when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await Client.getLeaderBoard();
                setLeaderBoardData(data);
            } catch (error) {
                console.log("Error fetching leaderboard data:", error);
            }
        }

        fetchData();
    }, []);

    // Handle click event to navigate back to the home page
    function handleClick() {
        navigate("/main");
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="leader-board-container">
                <h1>Leader Board</h1>
                <Button variant="contained" onClick={handleClick}>
                    Back to Home
                </Button>
                {leaderBoardData.length > 0 ? (
                    <List data={leaderBoardData}/>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </ThemeProvider>
    );
}

export default LeaderBoardPage;
