import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GardenItem from "../components/GardenItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import init, { Client } from 'react_native_mqtt';
import Paho from "paho-mqtt";
import { log } from "react-native-reanimated";


class MQTTConnection {
  topics = []
  client = null
  _host = 'io.adafruit.com'
  _port = 80
  _id = 'mqtt_' + parseInt(Math.random() * 100000)
  _userName = null
  _password = null
  connected = false
  constructor(topics,userName, password) {
    this.topics = topics
    this._userName = userName
    this._password = password
    this.client = new Paho.Client(this._host, this._port, this._id);
    this.client.onMessageArrived = this.onMessageArrived;
  }
  connect() {
    if(!this.connected) {
      this.client.connect({
        onSuccess: this.onConnect,
        onFailure: this.onFailure,
        cleanSession: true,
        timeout: 4,
        userName: this._userName,
        password: this._password,
        keepAliveInterval: 5
      })
      this.connected = true
    }
    return this.client
  }
  onMessageArrived({ topic, payloadString }) {
    console.log("onMessageArrived:", topic, payloadString);
  }
  onConnect() {
    console.log("Connect successfully");
  }
  onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }
  onFailure(err) {
    console.log('Connect failed!');
    console.log(err);
    this.connect()
  }
  subcribeTopic (topic)  {
    console.log("Subscribe to topic:", topic);
    this.client.subscribe(topic, { qos: 0 });
  }
}

const GardenScreen = ({ navigation }) => {
  const [gardens, setGardens] = useState([]);
  const getList = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    await setGardens(JSON.parse(userInfo).gardens);
  };
  userName =  "davidhuynh22"
  password =  "aio_bycn1154ctLCUtXTwnacwJafCeWm"
  const [conn, setConn] = useState()
  useEffect(() => {
    getList();
    const client = new MQTTConnection([], userName, password)
    client.connect() 
    setConn(client)
  }, []);
  return (
    <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
      <ScrollView className="p-5">
        {/* Header */}
        <View className="flex-row justify-between mb-5">
          <Text style={{ fontSize: 24, fontFamily: "HindBold" }}>
            My gardens
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddGarden");
            }}
          >
            <MaterialIcons
              color="#0aada8"
              size={30}
              name="add-circle-outline"
            />
          </TouchableOpacity>
        </View>

        {/* List of Gardens */}
        {gardens &&
          gardens.map((item, index) => <GardenItem key={index} id={item} />)}
        
        <TouchableOpacity
          onPress={() => conn.subcribeTopic("Potato_Stack/feeds/iot-cnpm.button1")}
        >
          <Text>Test Subscribe</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

  );
};

export default GardenScreen;
