import { View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const FreelancerIndicator = ({name}: {name: string}) => {
  return (
    <View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 130 }}
      >
        <Entypo name="location-pin" size={35} color="#4BAF4F" />
        <View
          style={{ flexDirection: "row", alignItems: "center", marginLeft: -5 }}
        >
          <Image
            source={require("../../../../assets/indicator-arrow.png")}
            resizeMode="contain"
            style={{ width: 20 }}
          />
          <View
            style={{
              borderColor: "#4BAF4F",
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              backgroundColor: "#F0FFF8",
              marginLeft: -5,
            }}
          >
            <Text>{name}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FreelancerIndicator;
