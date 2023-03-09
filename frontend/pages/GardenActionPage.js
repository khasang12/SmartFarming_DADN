import { View, Text } from 'react-native'
import React from 'react'
import { actionHistory } from '../data';
import ActionHistory from '../components/ActionHistory';

const GardenActionPage = () => {
  return (
    <View className="pt-3 flex-1 bg-[#9ff731]">
      {/* List of Gardens */}
      {actionHistory.map((item, index) => (
        <ActionHistory
          key={index}
          name={item.name}
          feed={item.feed_key}
          desc={item.desc}
          user={item.user}
          timestamp={item.timestamp}
        />
      ))}
    </View>
  );
}

export default GardenActionPage