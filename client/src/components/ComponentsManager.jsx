import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import AboutPage from "./AboutPage/AboutPage";
import SinglePlayer from "./SinglePlayerPage/SinglePlayerPage";
import FreePlayPage from "./SinglePlayerPage/FreePlayPage";
import SinglePlayerCompPage from "./SinglePlayerCompPage/SinglePlayerCompPage";
import GamePage from "./SinglePlayerCompPage/GamePage/GamePage";
import Art1 from "./SinglePlayerPage/Art1";
import "./ComponentsManager.css";

// import CubeContainer from "./Cube/CubeContainer";

function ComponentsManager() {
  return (
    <div className="main">
      {/* <MenuBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/singlePlayer" element={<SinglePlayer />} />
        <Route path="/singlePlayer/freePlay" element={<FreePlayPage />} />
        <Route path="/singlePlayer/art1" element={<Art1 />} />
        <Route
          path="/singlePlayerCompPage"
          element={<SinglePlayerCompPage />}
        />
        <Route path="/singlePlayerCompPage/gamePage" element={<GamePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tools/bsc" element={<BscPage />} /> */}
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
