import * as React from "react";
import "./MatchPage.css";
import { useLocation } from "react-router-dom";
import CubeManager from "../Cube/CubeManager";

function MatchPage() {
  const location = useLocation();

  let level = location.state.Level;
  console.log(location.state);

  return (
    <>
      <div className="split lefti">
          <CubeManager></CubeManager>
      </div>

      <div className="split righti">
          <CubeManager></CubeManager>
      </div>
    </>
  );
}

export default MatchPage;
