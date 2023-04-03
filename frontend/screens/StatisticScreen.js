import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

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
    backgroundColor: '#1abc9c',
    backgroundGradientFrom: '#1abc9c',
    backgroundGradientTo: '#1abc9c',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#1abc9c'
    }
};

const chartStyles = {
    borderRadius: 20,
    marginVertical: 20
};

const StatsScreen = () => {
    return (                        
        <View className="pt-3 flex-1 justify-center bg-[#eef9bf]">
            <View className="p-5">
                <Text style={{ fontSize: 24 }}> Weekly Statistics</Text>
            </View>
            <ScrollView className="p-5">
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20 }}>
                        {/* <View style={{ backgroundColor: '#1abc9c', width: 12, height: 12, borderRadius: 6, marginRight: 6 }} /> */}
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Humidity</Text>
                    </View>
                    <View style={chartStyles}>
                        <LineChart
                            data={humidityData}
                            width={Dimensions.get('window').width - 40}
                            height={200}
                            chartConfig={chartConfig}
                            
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20 }}>
                        {/* <View style={{
                            backgroundColor: '#f1c40f', width: 12, height:
                                12, borderRadius: 6, marginRight: 6
                        }} /> */}
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Temperature</Text>
                    </View>
                    <View style={chartStyles}>
                        <LineChart
                            data={temperatureData}
                            width={Dimensions.get('window').width - 40}
                            height={200}
                            chartConfig={chartConfig}
                            
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 20 }}>
                        {/* <View style={{ backgroundColor: '#2ecc71', width: 12, height: 12, borderRadius: 6, marginRight: 6 }} /> */}
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Light</Text>
                    </View>
                    <View style={chartStyles}>
                        <LineChart
                            data={lightData}
                            width={Dimensions.get('window').width - 40}
                            height={200}
                            chartConfig={chartConfig}
                            
                        />
                    </View>
                </View>
            </ScrollView>
        </View>

    );
};

export default StatsScreen;