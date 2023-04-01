import React from "react";
import Item from "./Item";

export default function List({data}) {
    console.log(data)
    if (!data || !data.data) {
        return <div>No data available</div>;
    }
    const {data: dataList} = data;
    return (
        <ul className="item-wrapper">
            {Object.entries(dataList).map(([key, value]) => (
                <Item key={key} email={value.Email} picture={value.User_Picture} score={value.Score}/>
            ))}
        </ul>
    );
}
