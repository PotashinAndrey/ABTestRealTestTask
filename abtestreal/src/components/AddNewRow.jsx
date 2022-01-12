import React from "react";

import "./row.css";

const AddNewRow = ({onClick}) => {

    return (
        <div className="addNew" onClick={onClick}>
            Add new user
        </div>
    );
}

export default AddNewRow;
