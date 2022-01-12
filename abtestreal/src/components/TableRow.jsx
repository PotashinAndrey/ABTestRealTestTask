import React, { useState } from "react";
import moment from 'moment';

import "./row.css";

const TableRow = ({ id, reg, lastIn, submit }) => {
    const [regValue, setRegValue] = useState("");
    const [lastInValue, setLastInValue] = useState("");

    const handleOk = () => {
        if (!regValue || !lastInValue) {
            alert("you have to fill both of fields");
            
            return;
        };

        if (moment(regValue).isAfter(moment(lastInValue))) {
            alert("wrong date");

            return;
        };

        submit(regValue, lastInValue);
    }

    return (
        <div className="tableRow">
            <div className="cell">{!lastIn && !reg ? <button onClick={handleOk}>ok</button> : id}</div>
            {reg ?
                <div className="second cell">{moment(reg).format("DD.MM.yyyy")}</div> :
                <input onChange={e => setRegValue(e.target.value)} type="date" placeholder="Choose date" />
            }
            {lastIn ?
                <div className="cell">{moment(lastIn).format("DD.MM.yyyy")}</div> :
                <input onChange={e => setLastInValue(e.target.value)} type="date" placeholder="Choose date" />
            }
        </div>
    );
}

export default TableRow;
