import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const TotalCard = ({
  showSymbol = false,
  title,
  amount,
}: {
  showSymbol: boolean;
  title: string;
  amount: number | string;
}) => {
  return (
    <View
      style={{
        width: "47%",
        height: "auto",
        backgroundColor: "#F6F6F6",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
      }}
    >
      <Text
        style={{
          paddingBottom: !showSymbol ? 100 : 40,
          fontSize: 16,
          fontFamily: "Rubik-Regular",
        }}
      >
        {title}
      </Text>
      {showSymbol && (
        <View style={{ alignItems: "flex-end", marginBottom: 40 }}>
          <FontAwesome name="dollar" size={30} color="#009C52" />
        </View>
      )}
      <Text
        style={{
          color: "#343434",
          fontSize: 36,
          fontFamily: "Rubik-Regular",
          textAlign: "right",
        }}
      >
        {amount}
      </Text>
    </View>
  );
};

export default TotalCard;
