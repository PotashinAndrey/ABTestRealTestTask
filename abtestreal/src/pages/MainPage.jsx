import React, { useState, useCallback } from "react";

import RollingRetentionTable from "../components/RollingRetentionTable.jsx";

import "./main.css";

const GLOBAL_DIFF = 1611111111111;

const randomTime = () => new Date(GLOBAL_DIFF + Math.random() * (new Date().getTime() - GLOBAL_DIFF));

const getTimeCortege = () => {
    const cortege = [randomTime(), randomTime()];

    cortege.sort((a, b) => a.getTime() - b.getTime());

    return cortege;
}

export default () => {
    const [newData, setNewData] = useState([]);
    const data = [{
        id: 1,
        reg: new Date(),
        lastIn: new Date()
    }];


    const calculateLastId = useCallback(() => {
        return newData[newData.length - 1]?.id || data[data.length - 1]?.id || 1;
    }, [newData, data]);

    const handleAddNewRowRand = () => {
        const lastElement = newData[newData.length - 1];
        
        if (newData.length && !lastElement.reg && !lastElement.lastIn) return;

        const times = getTimeCortege();

        setNewData(newData.concat([{
            id: calculateLastId() + 1,
            reg: times[0],
            lastIn: times[1]
        }]));
    }

    const handleAddNewRow = () => {
        const lastElement = newData[newData.length - 1];

        if (newData.length && !lastElement?.reg && !lastElement?.lastIn) return;

        setNewData(newData.concat([{
            id: calculateLastId() + 1,
            reg: null,
            lastIn: null
        }]));
    }

    const handleSubmit = (reg, lastIn) => {
        const lastElement = newData.pop();

        lastElement.reg = reg;
        lastElement.lastIn = lastIn;

        setNewData(newData.concat([lastElement]));
    }

    return (
        <div className="mainPage">
            <RollingRetentionTable
                data={data}
                newData={newData}
                handleAddNewRow={handleAddNewRow}
                handleAddNewRowRand={handleAddNewRowRand}
                submit={handleSubmit}
            />
        </div>
    );
}