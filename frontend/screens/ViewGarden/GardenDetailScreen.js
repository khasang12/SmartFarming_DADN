import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import GardenNavigator from "../../navigation/GardenNavigator";
import CustomButton from "../../components/CustomButton";
import { useState, useEffect } from "react";
import MQTTConnection from "../../services/mqttService.service";
import { useIsFocused } from "@react-navigation/native";
import { Context } from "react";
import { MQTTProvider, MQTTContext } from "../../context/MQTTContext";

const GardenDetailScreen = ({ route, navigation }) => {
  const garden = route.params;
  /* userName = "Potato_Stack"
  password = "aio_JZvY63VOPyGgS4WZFaZ6Z5ueDEc2"
  const isFocused = useIsFocused();

  const [conn, setConn] = useState(undefined);
 
  useEffect(() => {   
    async function init() {
      if (isFocused && conn == undefined) {    
        console.log("New");    
        const newClient = new MQTTConnection([], userName, password);
        await newClient.connect();        
        setConn(newClient);
     } 
    }  
    init();
  }, [isFocused]); */

  return (
    <View className="pt-10 px-3 flex-1 justify-center bg-[#eef9bf]">
      {/* Header */}
      <View className="flex-row justify-between">
        <Text style={{ fontSize: 28, fontFamily: "HindBold" }}>
          {garden.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (garden.boundary.length>0)
              navigation.navigate("ViewMap", {
                boundary: garden.boundary,
                name: garden.name,
                desc: garden.desc,
              });
            else{
              alert("Map not found")
            }
          }}
          className="bg-[#6a8caf] p-3 mb-7 rounded-md"
        >
          <Text
            className="text-center text-[#000]"
            style={{
              fontFamily: "MontserratSemiBold",
              fontSize: 16,
            }}
          >
            View Map
          </Text>
        </TouchableOpacity>
      </View>
      {/* Navigator */}
      {     
      // <MQTTContext.Provider value={conn}> 
      //   <GardenNavigator garden={garden} />
      // </MQTTContext.Provider>  
        <MQTTProvider>
          <GardenNavigator garden={garden} />
        </MQTTProvider>
      }    
    </View>
  );
};

export default GardenDetailScreen;
