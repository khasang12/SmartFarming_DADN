import React from "react";
import { View, Image, Text } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export default function BannerSlider({ data,parallax }) {
  return (
    <View style={styles.item}>
      <ParallaxImage
        source={data.image}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.5}
        {...parallax}
      />
      <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
