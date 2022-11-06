import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPageConnector from "./MainPage/MainPageConnector";
import MainPage from "./MainPage/MainPage";
import MenuBar from "./MenuBar/MenuBar";
import ToolsPage from "./ToolsPage/ToolsPage";
import AboutPage from "./AboutPage/AboutPage";
import "./ComponentsManager.css";

function ComponentsManager() {
  return (
    <div className="main">
      <MenuBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/" element={<MainPageConnector />} /> */}
        {/*<Route path="/about" element={<About />} />*/}
      </Routes>
    </div>
  );
}

export default ComponentsManager;
