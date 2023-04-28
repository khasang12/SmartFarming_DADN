import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from 'react'
import MapView, {
  MAP_TYPES,
  Polygon,
  PROVIDER_GOOGLE,
  Marker
} from "react-native-maps";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const data = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
}
const ViewMapScreen = ({route,navigation}) => {
  const {name,desc,boundary} = route.params
  if(boundary==undefined) return null;
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={data.region}
        minZoomLevel={5}
        maxZoomLevel={20}
      >
        <Marker coordinate={boundary[0]} title={name} description={desc} />
        <Polygon
          coordinates={boundary}
          strokeColor="#F00"
          fillColor="rgba(255,0,0,0.5)"
          strokeWidth={1}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});

export default ViewMapScreen