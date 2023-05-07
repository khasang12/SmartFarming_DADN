import React, { createContext, useEffect, useRef, useState } from "react";
import MQTTConnection from "../services/mqttService.service";
import {ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
export const MQTTContext = createContext();

class Gardens {
    static list = {}
}

export const MQTTProvider = ({garden, children}) => {
    const {name,adaUserName,x_aio_key} = garden;
    const [conn, setConn] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const loadingGarden = () => {
        setLoading(false);
        setConn(newClient);
        Gardens.list[name] = newClient;
    }
    let newClient;
    useEffect(() => {
        async function init() {
            if (conn == undefined && !Gardens.list[name]) {
                newClient =  new MQTTConnection([], adaUserName, x_aio_key,loadingGarden);
                console.log("Connecting...");
                newClient.connect();
            }else {
                if (Gardens.list[name] && Gardens.list[name].client.isConnected())
                    Gardens.list[name].client.disconnect();
                delete Gardens.list[name];
                newClient =  new MQTTConnection([], adaUserName, x_aio_key,loadingGarden);
                newClient.connect();
            }
        }
        init();
    }, []);

    if (!loading) 
        return (
            <MQTTContext.Provider value={{ conn }}>
                {children}
            </MQTTContext.Provider>
        )
    
};

