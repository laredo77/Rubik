import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import AboutPage from "./AboutPage/AboutPage";
import SinglePlayer from "./SinglePlayerPage/SinglePlayerPage";
import FreePlayPage from "./SinglePlayerPage/FreePlayPage";
import SinglePlayerCompPage from "./SinglePlayerCompPage/SinglePlayerCompPage";
import Art1 from "./SinglePlayerPage/Art1";
import "./ComponentsManager.css";
import TeamPlayPage from "../components/TeamPlayPage/TeamPlayPage";
import LevelsPage from "./LevelsPage/LevelsPage";
import LoginPage from "./LoginPage/LoginPage";

// import CubeContainer from "./Cube/CubeContainer";

function ComponentsManager() {
  return (
    <div className="main">
      {/* <MenuBar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/singlePlayer" element={<SinglePlayer />} />
        <Route path="/main/singlePlayer/freePlay" element={<FreePlayPage />} />
        <Route path="/main/singlePlayer/art1" element={<Art1 />} />
        <Route path="/main/singlePlayer/levelsPage" element={<LevelsPage />} />
        <Route
          path="/main/singlePlayerCompPage"
          element={<SinglePlayerCompPage />}
        />
        <Route path="/main/teamPlay" element={<TeamPlayPage />} />
        <Route path="/main/teamPlay/levelsPage" element={<LevelsPage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tools/bsc" element={<BscPage />} /> */}
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
