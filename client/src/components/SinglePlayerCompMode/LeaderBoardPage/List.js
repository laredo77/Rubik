import React from "react";
import Item from "./Item";

export default function List({ data }) {
    return (
        <ul className="item-wrapper">
            {Object.entries(data).map(([key, value]) => (
                <Item key={key} email={value.email} picture={value.picture} score={value.score} />
            ))}
        </ul>
    );
}
