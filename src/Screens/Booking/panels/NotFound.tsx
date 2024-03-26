import { View, Text, Image, Dimensions } from "react-native";
import React, { memo } from "react";

const NotFound = () => {
  return (
    <View
      style={{
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../../../assets/not-found.png")} />
        <Text
          style={{
            fontSize: 20,
            color: "#7A7A7A",
            fontFamily: "Rubik-Regular",
          }}
        >
          No bookings yet
        </Text>
      </View>
    </View>
  );
};

export default memo(NotFound);
