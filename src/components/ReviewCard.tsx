import { View, Text, Dimensions } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const ReviewCard = ({ style, details }) => {
  const screenWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        width: screenWidth - 10,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        margin: 5,
        ...style,
      }}
    >
      <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
        {details?.ratedBy}
      </Text>
      <Text
        style={{
          fontFamily: "Rubik-Regular",
          fontSize: 14,
          paddingVertical: 10,
        }}
      >
        {details?.review}
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {details &&
            [...Array(Number(details?.rating))].map((item, idx) => (
              <AntDesign
                key={idx.toString()}
                name="star"
                size={20}
                color="#4BAF4F"
                style={{ marginRight: 5 }}
              />
            ))}
        </View>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 12,
            color: "#686868",
          }}
        >
          {moment(details?.created_at).fromNow()}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
