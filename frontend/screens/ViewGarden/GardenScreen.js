import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import GardenItem from "../../components/GardenItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { useIsFocused } from "@react-navigation/native";

const GardenScreen = ({ navigation, route }) => {
  const [gardens, setGardens] = useState([]);
  const isFocused = useIsFocused();
  const getList = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    await axios
      .get(`${BASE_URL}/garden?userId=${JSON.parse(userInfo)._id}`)
      .then((res) => {
        setGardens(res.data)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // navigate due to alert
    if (route.params != undefined) {
      axios.post(`${BASE_URL}/garden/activate`, {
        gardenId: route.params.garden._id,
      }).catch((err) => {
        Alert.alert(
          //title
          'Error',
          //body
          err.response.data.error,
          [
            { text: 'OK', onPress: () => console.log('Yes Pressed') },
          ],
          { cancelable: false }
          //clicking out side of alert will not cancel
        );
      });
      navigation.navigate("GardenDetail", route.params.garden);
    }
  }, []);
  
  useEffect(() => {
    // navigate due to alert
    getList();
  }, [isFocused]);
  
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
          gardens.map((item, index) => <GardenItem navigation={navigation} key={index} garden={item}/>)}

      </ScrollView>
    </View>

  );
};


export default GardenScreen;
