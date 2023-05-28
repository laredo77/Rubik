import React from "react";
import Item from "./Item";

export default function List({data}) {
    // Check if data is not available or empty
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <ul className="item-wrapper">
            {/* Iterate over the data array and render an Item component for each item */}
            {data.map((item, index) => (
                <Item
                    key={index}
                    email={item.Email}
                    picture="https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png?20200627161017"
                    score={item.Score}
                />
            ))}
        </ul>
    );
}
