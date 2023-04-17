import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DropDownPicker from 'react-native-dropdown-picker';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import axios from 'axios';
import { BASE_URL } from "../config/config";
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
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
  const [data, setData] = useState([]); // the information of a garden
  const [weeklyAverages, setWeeklyAverages] = useState([]);

  const getData = async () => {
    await axios.get(`${BASE_URL}/sensor/`)
      .then((res) => { setData(res.data) })
  }

  const calculateWeeklyAverages = (data) => {
    const feedKeys = ['Potato_Stack/feeds/iot-cnpm.sensor1', 'Potato_Stack/feeds/iot-cnpm.sensor2', 'Potato_Stack/feeds/iot-cnpm.sensor4'];
    const days = 7;
    if (data && data.length > 0) {
      const averages = feedKeys.map(feedKey =>
        Array.from({ length: days }, (_, i) => calculateAverage(feedKey, i + 1, data))
      );
      setWeeklyAverages(averages);
    }
  }

  const calculateAverage = (feedKey, days, data) => {
    const now = moment();
    const start = moment().subtract(days, 'days');
    const filteredData = data.filter(
      sensor => sensor.feed_key === feedKey &&
        moment(sensor.created_at).isBetween(start, now, null, '[]') // Include start and end dates in range
    );
    if (filteredData.length === 0) return 0; // Return 0 if no data found
    const sum = filteredData.reduce((total, sensor) => total + sensor.value, 0);
    return Math.round(((sum / filteredData.length) + Number.EPSILON) * 100) / 100;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      calculateWeeklyAverages(data);
    }
  }, [data]);

  if (data.length === 0 || weeklyAverages.length === 0 || weeklyAverages[0].length === 0 || weeklyAverages[1].length === 0 || weeklyAverages[2].length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <LottieView
          source={require('../assets/images/loading.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
  else {
    const humidities = weeklyAverages[0];
    const temperatures = weeklyAverages[1];
    const lights = weeklyAverages[2];
    humidityData.datasets[0].data = humidities;
    temperatureData.datasets[0].data = temperatures;
    lightData.datasets[0].data = lights;
  }

  //it has this format: 
  // [[26.588888888888892, 26.537499999999994, 25, 26.580000000000002, 26.52799999999999, 25, 27], 
  // [51.684615384615384, 54.082608695652176, 40.300000000000004, 51.684615384615384, 45.92, 54.082608695652176, 45.92], 
  // [818.8666666666667, 1476, 732.8823529411765, 585.5909090909091, 1222.875, 936.2307692307693, 0]]

  console.log(humidityData.datasets[data])

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