import React from "react";
import boost from "../images/boost.png";
import "./BuyBoultsCard.css";

function BuyBoultsCard({ boults, price }) {
  return (
    <div className="buyboultscard-parent-container">
      <div>
        <div className="buyboultscard-number-boults">
          <h4 className="buyboultscard-title-text">+50</h4>
          <div
            className="buyboultscard-boost-image"
            style={{ backgroundImage: `url(${boost})` }}
          />
        </div>

        <div>
          <p className="buyboultscard-price-text">For Rs 500</p>
        </div>
      </div>
    </div>
  );
}

export default BuyBoultsCard;
