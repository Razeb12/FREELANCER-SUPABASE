import { View, Text, Image } from "react-native";
import React, { memo } from "react";

const ServicesCard = ({ title, image }) => {
  return (
    <View
      style={{
        width: 150,
        height: 170,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: "#fff",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Image
        source={image}
        style={{ width: "100%", height: "75%" }}
        resizeMode="cover"
      />
      <Text
        style={{
          textAlign: "center",
          marginTop: 10,
          fontFamily: "Rubik-Regular",
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default memo(ServicesCard);
