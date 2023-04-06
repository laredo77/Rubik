import * as React from "react";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import "./LeaderBoardPage.css";
import List from "./List";
import Button from "@mui/material/Button";
import Client from "../../../services/GeneralServices";

const theme = createTheme();

function LeaderBoardPage() {
    const [leaderBoardData, setLeaderBoardData] = React.useState([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchData() {
            const data = await Client.getLeaderBoard();
            setLeaderBoardData(data);
        }

        fetchData();
    }, []);

    function handleClick() {
        navigate("/main");
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="leader-board-container">
                <h1>Leader Board</h1>
                <List data={leaderBoardData}/>
                <Button variant="contained" onClick={handleClick}>
                    Back to Home
                </Button>
            </div>
        </ThemeProvider>
    );
}

export default LeaderBoardPage;
