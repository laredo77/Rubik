import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import MenuBar from "./MenuBar/MenuBar";
import ToolsPage from "./ToolsPage/ToolsPage";
import AboutPage from "./AboutPage/AboutPage";
import BscPage from "./ToolsPage/BscPage/BscPage";
import SinglePlayer from "./SinglePlayerPage/SinglePlayerPage"
import "./ComponentsManager.css";

function ComponentsManager() {
  return (
    <div className="main">
      {/* <MenuBar /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/singlePlayer" element={<SinglePlayer />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="/tools/bsc" element={<BscPage />} /> */}
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
