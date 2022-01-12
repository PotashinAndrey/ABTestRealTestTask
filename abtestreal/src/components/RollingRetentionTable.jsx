import React from "react";

import "./rolling.css";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";
import AddNewRow from "./AddNewRow.jsx";

const RollingRetentionTable = ({ data, newData, handleAddNewRow, handleAddNewRowRand, submit }) => {
    const rows = data.map(e =>
        <TableRow
            key={e.id}
            id={e.id}
            reg={e.reg}
            lastIn={e.lastIn}
        />
    );

    const newRows = newData.map(e =>
        <TableRow
            key={e.id}
            id={e.id}
            reg={e.reg}
            lastIn={e.lastIn}
            submit={submit}
        />
    );

    return (
        <div className="tableWrapper">
            <div className="table">
                <TableHeader />
                {rows}
                {newRows}
                <AddNewRow onClick={handleAddNewRow} />
            </div>
            <div className="buttons">
                <button>Save</button>
                <button>Calcultae</button>
                <button onClick={handleAddNewRowRand}>add random</button>
            </div>
        </div>
    );
}

export default RollingRetentionTable;