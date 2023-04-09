import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import SinglePlayerGameConnector from "./SinglePlayerGame/SinglePlayerGameConnector";
import FreePlayPage from "./SinglePlayerGame/FreePlayPage";
import Art1Connector from "./GameLevels/Art1Connector";
import "./ComponentsManager.css";
import TeamPlayPageConnector from "../components/MultiPlayerGame/MultiPlayerGameConnector";
import LevelsPageConnector from "./LevelsPage/LevelsPageConnector";
import LoginPageConnector from "./LoginPage/LoginPageConnector";
import SinglePlayerCompModeConnector from "./SinglePlayerCompMode/SinglePlayerCompModeConnector";
import LeaderBoardPage from "./SinglePlayerCompMode/LeaderBoardPage/LeaderBoardPage";
import LearnPage from "./LearnPage/LearnPage";
import BasicsPage from "./LearnPage/BasicsPage";
import AlgorithmsPage from "./LearnPage/AlgorithmsPage";
import MatchManagerConnector from "./MatchManager/MatchManagerConnector";
import MatchPage from "./MatchManager/MatchPage";

function ComponentsManager() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<LoginPageConnector />} />
        <Route path="/main" element={<MainPageConnector />} />
        <Route
          path="/main/singlePlayer"
          element={<SinglePlayerGameConnector />}
        />
        <Route path="/main/singlePlayer/freePlay" element={<FreePlayPage />} />
        <Route path="/main/gameLevels/3" element={<Art1Connector />} />
        <Route path="/main/levelsPage" element={<LevelsPageConnector />} />
        <Route path="/main/competition" element={<MatchManagerConnector />} />
        <Route path="/main/competition/match" element={<MatchPage />} />
        <Route
          path="/main/singlePlayerCompPage"
          element={<SinglePlayerCompModeConnector />}
        />
        <Route path="/main/learn" element={<LearnPage/>}/>
        <Route path="/main/learn/basics" element={<BasicsPage/>}/>
        <Route path="/main/learn/algorithms" element={<AlgorithmsPage/>}/>
        <Route
          path="/main/singlePlayerCompPage/leaderBoard"
          element={<LeaderBoardPage />}
        />
        <Route path="/main/teamPlay" element={<TeamPlayPageConnector />} />
            </Routes>
        </div>
    );
}

export default ComponentsManager;
