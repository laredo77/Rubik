import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
// import SinglePlayerGameConnector from "./SinglePlayerGame/SinglePlayerGameConnector";
import FreePlayPage from "./FreeGame/FreePlayPage";
import Art1Connector from "./GameLevels/Art1Connector";
import "./ComponentsManager.css";
import MosaicConnector from "../components/Mosaic/MosaicConnector";
import LevelsPageConnector from "./LevelsPage/LevelsPageConnector";
import LoginPageConnector from "./LoginPage/LoginPageConnector";
import CompetitionModeConnector from "./CompetitionMode/CompetitionModeConnector";
import LeaderBoardPage from "./CompetitionMode/LeaderBoardPage/LeaderBoardPage";
import LearnPage from "./LearnPage/LearnPage";
import BasicsPage from "./LearnPage/BasicsPage";
import AlgorithmsPage from "./LearnPage/AlgorithmsPage";
import MatchManagerConnector from "./Match/MatchManagerConnector";
import MatchPageConnector from "./Match/MatchPageConnector";

function ComponentsManager() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<LoginPageConnector />} />
        <Route path="/main" element={<MainPageConnector />} />
        {/*<Route*/}
        {/*  path="/main/singlePlayer"*/}
        {/*  element={<SinglePlayerGameConnector />}*/}
        {/*/>*/}
        <Route path="/main/game/freePlay" element={<FreePlayPage />} />
        <Route path="/main/gameLevels/3" element={<Art1Connector />} />
        <Route path="/main/game/mosaic/levels" element={<LevelsPageConnector />} />
        <Route path="/main/matchManager" element={<MatchManagerConnector />} />
        <Route path="/main/matchManager/match" element={<MatchPageConnector />} />
        <Route
          path="/main/singlePlayerCompPage"
          element={<CompetitionModeConnector />}
        />
        <Route path="/main/learn" element={<LearnPage/>}/>
        <Route path="/main/learn/basics" element={<BasicsPage/>}/>
        <Route path="/main/learn/algorithms" element={<AlgorithmsPage/>}/>
        <Route
          path="/main/singlePlayerCompPage/leaderBoard"
          element={<LeaderBoardPage />}
        />
        <Route path="/main/game/mosaic" element={<MosaicConnector />} />
            </Routes>
        </div>
    );
}

export default ComponentsManager;
