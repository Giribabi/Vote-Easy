import React from "react";
import "./WinnerBox.css";

function WinnerBox({ alliance, votes }) {
    return (
        <div className="winner-box">
            {alliance}
            <br />
            {votes}
        </div>
    );
}

export default WinnerBox;
