import React from "react";

export default function Item({email, picture, score}) {
    console.log(atob(picture))
    return (
        <li className="item">
            <img src={`data:image/png;base64,${picture}`} width="50" alt="user avatar"/>
            <div className="item-details">
                <p className="item-email">{email}</p>
                <p className="item-score">{score}</p>
            </div>
        </li>
    );
}
