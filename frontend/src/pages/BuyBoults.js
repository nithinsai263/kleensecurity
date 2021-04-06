import React from "react";
import "./BuyBoults.css";
import boost from "./images/boost.png";
import ellipse from "./images/ellipse.png";
import BuyBoultsCard from "./components/BuyBoultsCard";

function BuyBoults() {
  return (
    <div className="buybolts-parent-container">
      <div className="buybolts-main-title-container">
        <h2 className="buybolts-main-title-text1"> Buy </h2>
        <h2 className="buybolts-main-title-text2"> Bolts </h2>
      </div>
      <div className="buybolts-header-container">
        <div>
          <div className="buybolts-header-wrapper">
            <h1 className="buybolts-header-text"> 30</h1>
            <div
              className="buybolts-header-image"
              style={{ backgroundImage: `url(${boost})` }}
            />
          </div>
          <div
            className="buybolts-header-shadow-image"
            style={{ backgroundImage: `url(${ellipse})` }}
          />
        </div>
      </div>
      <div className="buyboults-row1">
        <BuyBoultsCard />
        <BuyBoultsCard />
        <BuyBoultsCard />
      </div>
      <div
        className="buyboults-row2"
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "60px",
        }}
      >
        <BuyBoultsCard />
        <BuyBoultsCard />
        <BuyBoultsCard />
      </div>
    </div>
  );
}

export default BuyBoults;
