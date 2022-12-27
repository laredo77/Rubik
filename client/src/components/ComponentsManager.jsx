import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import MenuBar from "./MenuBar/MenuBar";
import AboutPage from "./AboutPage/AboutPage";
import SinglePlayer from "./SinglePlayerPage/SinglePlayerPage"
import SinglePlayerCompPage from "./SinglePlayerCompPage/SinglePlayerCompPage"
import "./ComponentsManager.css";

function ComponentsManager() {
  return (
    <div className="main">
      {/* <MenuBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/singlePlayer" element={<SinglePlayer />} />
        <Route path="/singlePlayerCompPage" element={<SinglePlayerCompPage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tools/bsc" element={<BscPage />} /> */}
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
