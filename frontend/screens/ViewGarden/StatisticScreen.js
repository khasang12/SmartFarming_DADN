import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
let humidityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [33.6, 35, 38, 34, 40, 34, 36],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 3
    }
  ]
};

let temperatureData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [33.6, 35, 38, 34, 40, 34, 36],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 3
    }
  ]
};

let lightData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [818.8666666666667, 1476, 732.8823529411765, 585.5909090909091, 1222.875, 936.2307692307693, 0],
      color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
      strokeWidth: 3
    }
  ]
};

const chartConfig = {
  backgroundColor: "#75b79e",
  backgroundGradientFrom: "#75b79e",
  backgroundGradientTo: "#75b79e",
  paddingVertical: 10,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#1abc9c",
  },
};

const chartStyles = {
  borderRadius: 20,
  marginVertical: 20,
};

const StatsScreen = ({ route, navigation }) => {
  const garden = route.params;
  console.log(garden['_id'])
  const [data, setData] = useState([]);
  const feedArray = garden.topic_list.sensor;
  console.log(feedArray);


  const baseUrl = "https://io.adafruit.com/api/v2/Potato_Stack/feeds/";
  const [sensor2Data, setSensor2Data] = useState([]);
  const [sensor4Data, setSensor4Data] = useState([]);
  const [sensor1Data, setSensor1Data] = useState([]);


  // Function to fetch data for a feed and store it in the respective array
  const fetchData = (feed, dataArray, setData) => {
    return fetch(baseUrl + feed + "/data")
      .then(response => response.json())
      .then(data => {
        // Extract values from the fetched data
        data.forEach(item => {
          dataArray.push({ value: item.value, created_at: item.created_at });
        });
        // Set the data array using setData function
        setData(dataArray);
      })
      .catch(error => console.error(error));
  };

  // Fetch data for sensor2
  useEffect(() => {
    fetchData("iot-cnpm.sensor2", [], setSensor2Data);
  }, []);

  // Fetch data for sensor4
  useEffect(() => {
    fetchData("iot-cnpm.sensor4", [], setSensor4Data);
  }, []);

  // Fetch data for sensor1
  useEffect(() => {
    fetchData("iot-cnpm.sensor1", [], setSensor1Data);
  }, []);

  const calculateWeeklyAverages = (dataArray) => {
    const weeklyAverages = Array(7).fill(0); // Initialize an array of 7 elements with 0 as default value
    const dataCounts = Array(7).fill(0); // Initialize an array to store the count of data points for each day

    // Get local time offset in minutes
    const offset = new Date().getTimezoneOffset();

    // Iterate over the data array
    dataArray.forEach(item => {
      const date = new Date(item.created_at); // Convert the created_at string to a Date object
      const day = (date.getUTCDay() + Math.floor(offset / 60 / 24) + 7) % 7; // Get the day index accounting for UTC offset
      const value = parseInt(item.value); // Parse the value as integer
      weeklyAverages[day] += value; // Add the value to the respective day's total
      dataCounts[day]++; // Increment the data count for the respective day
    });

    // Calculate the average for each day
    for (let i = 0; i < 7; i++) {
      if (dataCounts[i] > 0) {
        weeklyAverages[i] /= dataCounts[i]; // Divide the total by the count of data points for the day
      }
      weeklyAverages[i] = Math.round(weeklyAverages[i] * 100) / 100; // Round the average to 2 decimal places
    }

    return weeklyAverages;
  };

  const weeklyAveragesHumidity = calculateWeeklyAverages(sensor1Data);
  const weeklyAveragesTemperature = calculateWeeklyAverages(sensor4Data);
  const weeklyAveragesLight = calculateWeeklyAverages(sensor2Data);
  console.log(weeklyAveragesHumidity)
  console.log(weeklyAveragesTemperature)
  console.log(weeklyAveragesLight)

  humidityData.datasets[0].data = weeklyAveragesHumidity;
  temperatureData.datasets[0].data = weeklyAveragesTemperature;
  lightData.datasets[0].data = weeklyAveragesLight;


  if (weeklyAveragesHumidity.length === 0 || weeklyAveragesTemperature.length === 0 || weeklyAveragesLight.length === 0 ) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={require('../../assets/images/loading.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }


  //it has this format: 
  // [[26.588888888888892, 26.537499999999994, 25, 26.580000000000002, 26.52799999999999, 25, 27], 
  // [51.684615384615384, 54.082608695652176, 40.300000000000004, 51.684615384615384, 45.92, 54.082608695652176, 45.92], 
  // [818.8666666666667, 1476, 732.8823529411765, 585.5909090909091, 1222.875, 936.2307692307693, 0]]


  return (
    <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
      <View className="p-5">
        <Text
          style={{
            fontFamily: "MontserratBold",
            fontSize: 30,
            color: "#444",
          }}
        >
          {" "}
          Weekly Statistics
        </Text>

      </View>
      <ScrollView className="p-5">
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 0,
            }}
          >
            {/* <View style={{ backgroundColor: '#1abc9c', width: 12, height: 12, borderRadius: 6, marginRight: 6 }} /> */}
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 20,
                color: "#444",
              }}
            >
              Humidity
            </Text>
          </View>
          <CustomLineChart sdata={humidityData} unit="%" />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            {/* <View style={{
                            backgroundColor: '#f1c40f', width: 12, height:
                                12, borderRadius: 6, marginRight: 6
                        }} /> */}
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 20,
                color: "#444",
              }}
            >
              Temperature
            </Text>
          </View>
          <CustomLineChart sdata={temperatureData} unit="oC" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            {/* <View style={{ backgroundColor: '#2ecc71', width: 12, height: 12, borderRadius: 6, marginRight: 6 }} /> */}
            <Text
              style={{
                fontFamily: "MontserratSemiBold",
                fontSize: 20,
                color: "#444",
              }}
            >
              Light
            </Text>
          </View>
          <CustomLineChart sdata={lightData} unit="klux" />
        </View>
      </ScrollView>
    </View>
  );
};

const CustomLineChart = ({ sdata, unit }) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
  return (
    <View style={chartStyles}>
      <LineChart
        data={sdata}
        width={Dimensions.get("window").width - 40}
        height={200}
        chartConfig={chartConfig}
        yAxisSuffix={unit}
        yAxisInterval={1}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        decorator={() => {
          return tooltipPos.visible ? (
            <View>
              <Svg>
                <Rect
                  x={tooltipPos.x - 15}
                  y={tooltipPos.y + 10}
                  width="40"
                  height="30"
                  fill="#a7e9af"
                  opacity={0.8}
                />
                <TextSVG
                  x={tooltipPos.x + 5}
                  y={tooltipPos.y + 30}
                  fill="#6a8caf"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {tooltipPos.value}
                </TextSVG>
              </Svg>
            </View>
          ) : null;
        }}
        onDataPointClick={(data) => {
          let isSamePoint =
            tooltipPos.x === data.x && tooltipPos.y === data.y;

          isSamePoint
            ? setTooltipPos((previousState) => {
              return {
                ...previousState,
                value: data.value,
                visible: !previousState.visible,
              };
            })
            : setTooltipPos({
              x: data.x,
              value: data.value,
              y: data.y,
              visible: true,
            });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    color: "#444",
  },
});

export default StatsScreen;