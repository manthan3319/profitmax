import React from "react";
import "./App.css";
import Connect from "./components/connect";
import Saidbar from "./components/saidbar";
import Staking from "./pages/Staking";
import Deshbord from "./components/deshbord";
import LevelRewards from "./pages/LevelRewards";
import DailyRewards from "./pages/DailyRewards";
import Withdrawal from "./pages/withdrawal";
import TeamBonus from "./pages/TeamBonus";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
    <div className="container_main">
      <Saidbar />
      <Connect />
      </div>
      <Routes>
        <Route path="/" element={<Deshbord />} />
        <Route path="/staking" element={<Staking />} />
        <Route path="/level-rewards" element={<LevelRewards />} />
        <Route path="/daily-rewards" element={<DailyRewards />} />
        <Route path="/withdrawal-list" element={<Withdrawal />} />
        <Route path="/team-bonus" element={<TeamBonus />} />

      </Routes>
    </React.Fragment>
  );
}

export default App;
