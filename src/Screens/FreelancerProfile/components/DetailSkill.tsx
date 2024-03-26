import { View, Text } from "react-native";
import React, { memo } from "react";

const DetailSkill = ({
  details,
}: {
  details: { name: string; rate: number };
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontFamily: "Rubik-Regular", fontSize: 14 }}>
        {details.name}
      </Text>
      <Text
        style={{ fontFamily: "Rubik-Regular", fontSize: 14, color: "#046900" }}
      >
        US ${details.rate}/hr
      </Text>
    </View>
  );
};

export default memo(DetailSkill);
