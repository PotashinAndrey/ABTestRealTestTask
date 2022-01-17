import React, { useState, useCallback, useEffect } from "react";

import RollingRetentionTable from "../components/RollingRetentionTable.jsx";

import { useHttp } from "../useHttp.js";

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
    const [data, setData] = useState([]);
    const { request, loading } = useHttp();

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

    useEffect(() => {
        const res = loadData();
        res.then(data => setData(data.data))
    }, []);

    async function loadData() {
        try {
            const data = await request("http://localhost:3030/data");
            return data;
        } catch (e) {
            console.log(e)
        }
    }

    async function saveData() {
        try {
            await request("http://localhost:3030/save", "POST", { 
                data: newData.map(e => ({ id: e.id, reg: e.reg.getTime(), lastIn: e.lastIn.getTime() })) 
            });
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="mainPage">
            <RollingRetentionTable
                data={data}
                newData={newData}
                handleAddNewRow={handleAddNewRow}
                handleAddNewRowRand={handleAddNewRowRand}
                submit={handleSubmit}
                save={saveData}
            />
        </div>
    );
}