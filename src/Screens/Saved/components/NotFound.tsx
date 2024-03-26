import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { color } from "../../../utils/color";
import { Button } from "../../../components/Button";

const NotFound = ({ retry }: { retry: () => void }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../../../assets/no-saved.png")} />
        <Text
          style={{
            fontSize: 20,
            color: "#7A7A7A",
            fontFamily: "Rubik-Regular",
          }}
        >
          Nothing saved yet
        </Text>
        <TouchableOpacity style={{ width: 100 }} onPress={retry}>
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
