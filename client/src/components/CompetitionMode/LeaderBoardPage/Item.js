import React from "react";

// Functional component for rendering an item
export default function Item({email, picture, score}) {
    return (
        <li className="item">
            <img src={picture} width="50" alt="user avatar"/>
            <p className="item-email">{email}</p>
            <p className="item-score">{score}</p>
        </li>
    );
}
