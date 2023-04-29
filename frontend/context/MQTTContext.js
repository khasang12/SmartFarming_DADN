import React, { createContext, useEffect, useState } from "react";
import MQTTConnection from "../services/mqttService.service";

export const MQTTContext = createContext();

export const MQTTProvider = ({userName, password, children }) => {
    
    // userName = "Potato_Stack"
    // password = "aio_JZvY63VOPyGgS4WZFaZ6Z5ueDEc2"

    const [conn, setConn] = useState(undefined);

    useEffect(() => {
        async function init() {
            console.log("Connecting...");
            if (conn == undefined) {
                const newClient = new MQTTConnection([], userName, password);
                await newClient.connect();
                setConn(newClient);
            }
        }
        init();
    }, []);

    return (
        <MQTTContext.Provider value={{ conn }}>
            {children}
        </MQTTContext.Provider>
    );
};