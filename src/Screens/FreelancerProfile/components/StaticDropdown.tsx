import React, { memo } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

const StaticDropdown = ({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: "100%",
          paddingVertical: 11,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#4BAF4F",
          borderRadius: 10,
          borderWidth: 1,
          marginTop: 10,
        }}
      >
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(StaticDropdown);
