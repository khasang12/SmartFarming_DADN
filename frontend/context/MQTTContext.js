import React, { createContext, useEffect, useRef, useState } from "react";
import MQTTConnection from "../services/mqttService.service";

export const MQTTContext = createContext();

class Gardens {
    static list = {}
}

export const MQTTProvider = ({garden, children }) => {
    

    const {name,adaUserName,x_aio_key} = garden
    const [conn, setConn] = useState(undefined);
    useEffect(() => {
        async function init() {
            if (conn == undefined && !Gardens.list[name]) {
                console.log("Connecting...");
                const newClient = new MQTTConnection([], adaUserName, x_aio_key);
                await newClient.connect();
                setConn(newClient);
                Gardens.list[name] = newClient
            }else {
                Gardens.list[name].client.disconnect();
                delete Gardens.list[name];
                console.log(Gardens.list);
                const newClient = new MQTTConnection([], adaUserName, x_aio_key);
                await newClient.connect();
                setConn(newClient);
                Gardens.list[name] = newClient
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