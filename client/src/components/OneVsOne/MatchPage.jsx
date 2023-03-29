import * as React from "react";
//import CubeContainer from "../Cube/CubeContainer";
import "./MatchPage.css";
import { useLocation } from "react-router-dom";

function MatchPage() {
  const location = useLocation();
  let level = location.state.Level;
  console.log(location.state);
  return (
    <>
      <div className="split left"></div>

      <div className="split right">
        {/*<div className="app">*/}
        {/*  <CubeContainer />*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default MatchPage;
