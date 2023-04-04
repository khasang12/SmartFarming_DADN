import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";

const humidityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [60, 65, 68, 72, 75, 78, 80],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 3
        }
    ]
};

const temperatureData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [33.6, 35, 38, 34, 40, 34, 36],
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            strokeWidth: 3
        }
    ]
};

const lightData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            data: [400, 350, 300, 250, 200, 150, 100],
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

const StatsScreen = () => {
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

const CustomLineChart = ({sdata,unit}) => {
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

export default StatsScreen;