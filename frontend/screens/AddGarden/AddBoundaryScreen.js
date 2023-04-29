import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView, { MAP_TYPES, Polygon } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const mapOptions = { scrollEnabled: true };

const AddBoundaryScreen = ({navigation,route}) => {
  const [data, setData] = useState({
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    polygons: [],
    editing: null,
    creatingHole: false,
  });
  const finish = async () => {
    const { polygons, editing } = data;
    setData({
      ...data,
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false,
    });

    if (data.editing.coordinates.length < 10) {
      alert("Drawing boundaries failed. Please try again");
      setData({
        region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        polygons: [],
        editing: null,
        creatingHole: false,
      });
      navigation.goBack();
    }
    else{
        await new Promise((res) => setTimeout(res, 2000));
        navigation.navigate("AddDevice", {...route.params,
          boundary: data.editing.coordinates,
        });
    }
    
  };
  const createHole = () => {
    const { editing, creatingHole } = data;
    if (!creatingHole) {
      setData({
        ...data,
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []],
        },
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        setData({
          ...data,
          editing: {
            ...editing,
            holes,
          },
        });
      }
      setData({ ...data, creatingHole: false });
    }
  };

  const onPress = (e) => {
    const { editing, creatingHole } = data;
    if (!editing) {
        const { latitude, longitude } = e.nativeEvent.coordinate;
      setData({
        ...data,
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: [],
        },
      });
    } else if (!creatingHole) {
      setData({
        ...data,
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate],
        },
      });
    } else {
      const holes = [...editing.holes];
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate,
      ];
      setData({
        ...data,
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes,
        },
      });
    }
  };

  useEffect(() => {
    if (data.editing) {
      mapOptions.onPanDrag = (e) => onPress(e);
      mapOptions.scrollEnabled = false;
    } else {
      mapOptions.scrollEnabled = true;
    }
  }, [data]);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={data.region}
        onPress={(e) => onPress(e)}
        {...mapOptions}
      >
        {data.polygons.map((polygon) => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            holes={polygon.holes}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={5}
          />
        ))}
        {data.editing && (
          <Polygon
            key={data.editing.id}
            coordinates={data.editing.coordinates}
            holes={data.editing.holes}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={5}
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        {data.editing && (
          <TouchableOpacity
            onPress={() => createHole()}
            style={[styles.bubble, styles.button]}
          >
            <Text>{data.creatingHole ? "Stop" : "Create"}</Text>
          </TouchableOpacity>
        )}
        {data.editing && (
          <TouchableOpacity
            onPress={() => finish()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Finish</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

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

export default AddBoundaryScreen;
