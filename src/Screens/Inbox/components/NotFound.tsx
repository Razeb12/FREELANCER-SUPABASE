import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { Button } from "../../../components/Button";
import { color } from "../../../utils/color";

const NotFound = ({ onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../../../assets/no-messages.png")} />
        <Text
          style={{
            fontSize: 20,
            color: "#7A7A7A",
            fontFamily: "Rubik-Regular",
          }}
        >
          No messages yet
        </Text>
        <TouchableOpacity style={{ width: 100 }} onPress={onPress}>
          <Button
            text={"Retry"}
            buttonStyle={{
              backgroundColor: color.primary,
              paddingVertical: 12,
              borderRadius: 5,
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(NotFound);
