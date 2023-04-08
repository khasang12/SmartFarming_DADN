import { EventEmitter } from "fbemitter";
import Paho from "paho-mqtt";

class MQTTConnection {
    topics = []
    client = null
    _host = 'io.adafruit.com'
    _port = 80
    _id = 'mqtt_' + parseInt(Math.random() * 100000)
    _userName = null
    _password = null   
    emitter = null
    connected = false

    constructor(topics, userName, password) {
      this.topics = topics
      this._userName = userName
      this._password = password
      this.client = new Paho.Client(this._host, this._port, this._id);
      this.emitter = new EventEmitter()
      this.client.onMessageArrived = (this.onMessageArrived).bind(this);
    }
    connect() {
      if (!this.connected) {
        this.client.connect({
          onSuccess: (this.onConnect).bind(this),
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
    onMessageArrived({topic, payloadString}) {
      console.log("onMessageArrived:", topic, payloadString);  
      this.emitter.emit(topic,payloadString)       
    }

    onConnect() {        
      console.log("Connect successfully"); 
      for (let topic of this.topics) {
        console.log("Subcribe Topic:", topic);
        this.client.subscribe(topic, { qos: 0 })
      }
    }
    onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
      this.connected = false;
    }
    onFailure(err) {
      console.log('Connect failed!');
      console.log(err);
      this.connect()
    }

    subcribeTopic(topic,callback) {
      if (!this.topics.includes(topic)) {
        this.emitter.addListener(topic,callback)
        this.topics.push(topic)
        console.log("Subscribe Topic:", topic);
        this.client.subscribe(topic, { qos: 0 });
      }
    }    
}

export default MQTTConnection ;