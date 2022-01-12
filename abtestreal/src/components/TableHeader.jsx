import React from "react";

import "./row.css";

const TableHeader = () => {

    return (
        <div className="tableRow">
            <div className="cell">UserId</div>
            <div className="second cell">Date Registration</div>
            <div className="cell">Date Last Activity</div>
        </div>
    );
}

export default TableHeader;