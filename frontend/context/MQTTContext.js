import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { useIsFocused } from "@react-navigation/native";
import MQTTConnection from "../services/mqttService.service";

export const MQTTContext = createContext();

export const MQTTProvider = ({ children }) => {
    
    userName = "Potato_Stack"
    password = "aio_JZvY63VOPyGgS4WZFaZ6Z5ueDEc2"

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