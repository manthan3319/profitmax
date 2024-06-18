import React from "react";
import MobileLogo from "../image/mobilelogo.svg";
import dashboard from "../image/sidebar-icon/Dashboard.svg";
import sell_token from "../image/sidebar-icon/sell-token.svg";
import buy_token from "../image/sidebar-icon/buy-token.svg";
import withdraw from "../image/sidebar-icon/withdraw.svg";
import whitepaper from "../image/sidebar-icon/whitepaper.svg";
import refer from "../image/sidebar-icon/refer.svg";
import binance from "../image/binance-logo.svg";
import homepage from "../image/sidebar-icon/homepage.svg";
import audit from "../image/sidebar-icon/audit.svg";
import { useState } from "react";
// import hlpicon from '../image/material-symbols_help-outline (2).png'
// import settiicon from '../image/setting2.png'
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Saidbar = () => {
  let navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div>
      <div className="sidebar">
        <div className="navbarnone">
          <nav className="navbar navbar-expand-md ">
            <div className="logo">
              <div className="togglebtn">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapsibleNavbar"
                >
                  <span className="navbar-toggler-icon">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="logos_menu">
                <h4 className="desktop-logo" href="#">
                  {" "}
                  <img src="/logonew.png" alt="Logo" />{" "}
                </h4>
                <h4 className="mobile-logo" href="#">
                  {" "}
                  <img src="/logonew.png" alt="Logomobile" />{" "}
                </h4>
              </div>
            </div>
            <div className="menubar">
              <div className="menucontant">
                <div
                  className="collapse navbar-collapse"
                  id="collapsibleNavbar"
                >
                  <Link
                    to="/"
                    className={location.pathname === "/" ? "active" : ""}
                    onClick={() => handleLinkClick("/")}
                  >
                    <img width={"20"} src={dashboard} alt="dasicon" />
                    Dashboard
                  </Link>
                  <Link
                    to="staking"
                    className={location.pathname === "/staking" ? "active" : ""}
                    onClick={() => handleLinkClick("staking")}
                  >
                    <img width={"20"} src={dashboard} alt="dasicon" />
                    Staking
                  </Link>

                  {/* <Link
                    to="/level-rewards"
                    className={
                      location.pathname === "/level-rewards" ? "active" : ""
                    }
                    onClick={() => handleLinkClick("/level-rewards")}
                  >
                    <img width={"20"} src={buy_token} alt="rewicon" /> Level
                    Rewards
                  </Link> */}

                  <Link
                    to="/daily-rewards"
                    className={
                      location.pathname === "/daily-rewards" ? "active" : ""
                    }
                    onClick={() => handleLinkClick("/daily-rewards")}
                  >
                    <img width={"20"} src={sell_token} alt="rewicon" /> Daily
                    Rewards
                  </Link>

                  {/* <Link
                    to="/team-bonus"
                    className={
                      location.pathname === "/team-bonus" ? "active" : ""
                    }
                    onClick={() => handleLinkClick("/team-bonus")}
                  >
                    <img width={"20"} src={refer} alt="rewicon" /> Team Bonus
                  </Link> */}

                  <Link
                    to="/withdrawal-list"
                    className={
                      location.pathname === "/withdrawal-list" ? "active" : ""
                    }
                    onClick={() => handleLinkClick("/withdrawal-list")}
                  >
                    <img width={"20"} src={withdraw} alt="rewicon" /> withdrawal
                    List
                  </Link>
                  <hr className="hr-tag" />
                  <a href="/" download="CUNAudit.pdf">
                    <img width={"20"} src={audit} alt="rewicon" /> Inbox
                  </a>
                  <a href="/" download="CUNWhitepaper.pdf">
                    <img width={"20"} src={whitepaper} alt="rewicon" /> Setting
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Saidbar;
