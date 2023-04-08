import Paho from "paho-mqtt";
import React, { useState } from "react";

class MQTTConnection {
    topics = []
    client = null
    _host = 'io.adafruit.com'
    _port = 80
    _id = 'mqtt_' + parseInt(Math.random() * 100000)
    _userName = null
    _password = null   

    constructor(topics, userName, password) {
      this.topics = topics
      this._userName = userName
      this._password = password
      this.client = new Paho.Client(this._host, this._port, this._id);
      //this.client.onMessageArrived = this.onMessageArrived;
      // this.client.onConnect = this.onConnect;
      this.connected = false;
    }
   async connect(SuccessFunction, FailFunction) {
      if (!this.connected) {
        this.client.connect({
          onSuccess: SuccessFunction,
          onFailure: FailFunction,
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
    onMessageArrived({topic, payloadString}) {
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

    subcribeTopic(topic, SuccessFunction, FailFunction) {
      console.log("Subscribe to topic:", topic);
      this.client.subscribe(topic, { qos: 0 , onSuccess: SuccessFunction, onFailure: FailFunction} );
    } 
      
    unsubcribeTopic(topic) {
      console.log("Unsubcribe to topic:", topic);
      this.client.unsubcribe();
    }
    publish(topic, value) {
      console.log(topic,value);
      if (this.connected) {
        this.client.send(topic, value);
      }
    }
  }

export default MQTTConnection ;