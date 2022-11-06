import React from "react";
import { useNavigate } from "react-router-dom";
import { TabList, Tab } from "monday-ui-react-core";
import "./MenuBar.css";

function MenuBar() {
  const navigate = useNavigate();
  return (
    <div className="tablist">
      <TabList tabType="stretched">
        <Tab onClick={() => navigate("/")} className="tab-item">
          Dashboard
        </Tab>
        <Tab onClick={() => navigate("/tools")}>Tools</Tab>
        <Tab onClick={() => navigate("/about")}>About</Tab>
      </TabList>
    </div>
  );
}

export default MenuBar;
