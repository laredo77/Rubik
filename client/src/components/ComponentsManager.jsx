import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import AboutPage from "./AboutPage/AboutPage";
import SinglePlayer from "./SinglePlayerPage/SinglePlayerPage"
import SinglePlayerCompPage from "./SinglePlayerCompPage/SinglePlayerCompPage"
import GamePage from "./SinglePlayerCompPage/GamePage/GamePage"
import "./ComponentsManager.css";
// import CubeContainer from "./Cube/CubeContainer";

function ComponentsManager() {
  return (
    <div className="main">
      {/* <MenuBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/singlePlayer" element={<SinglePlayer />} />
        <Route path="/singlePlayerCompPage" element={<SinglePlayerCompPage />} />
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
