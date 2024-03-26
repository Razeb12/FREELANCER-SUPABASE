import { View, Text } from "react-native";
import React, { memo } from "react";

const Date = () => {
  return (
    <View style={{ width: "100%", paddingVertical: 15, alignItems: "center" }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          backgroundColor: "#E3E3E3",
          borderRadius: 20,
        }}
      >
        <Text>Today</Text>
      </View>
    </View>
  );
};

export default memo(Date);
