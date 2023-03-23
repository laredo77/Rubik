import React from "react";

export default function Item({ email, picture, score }) {
    return (
        <li className="item">
            <img src={picture} alt="user avatar" />
            <div className="item-details">
                <p className="item-email">{email}</p>
                <p className="item-score">{score}</p>
            </div>
        </li>
    );
}
