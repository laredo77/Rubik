import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import AboutPage from "./AboutPage/AboutPage";
import SinglePlayerGameConnector from "./SinglePlayerGame/SinglePlayerGameConnector";
import FreePlayPage from "./SinglePlayerGame/FreePlayPage";
import Art1 from "./GameLevels/Art1";
import "./ComponentsManager.css";
import TeamPlayPageConnector from "../components/MultiPlayerGame/MultiPlayerGameConnector";
import LevelsPageConnector from "./LevelsPage/LevelsPageConnector";
import LoginPageConnector from "./LoginPage/LoginPageConnector";
import SinglePlayerCompModeConnector from "./SinglePlayerCompMode/SinglePlayerCompModeConnector";
import LeaderBoardPage from "./SinglePlayerCompMode/LeaderBoardPage/LeaderBoardPage";

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
        <Route path="/main/gameLevels/art1" element={<Art1 />} />
        <Route path="/main/levelsPage" element={<LevelsPageConnector />} />
        <Route
          path="/main/singlePlayerCompPage"
          element={<SinglePlayerCompModeConnector />}
        />
        <Route
          path="/main/singlePlayerCompPage/leaderBoard"
          element={<LeaderBoardPage />}
        />
        <Route path="/main/teamPlay" element={<TeamPlayPageConnector />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tools/bsc" element={<BscPage />} /> */}
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
