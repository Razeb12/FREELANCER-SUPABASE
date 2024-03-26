import { View, Text, Image } from "react-native";
import React from "react";
import { useUserStore } from "../../../../Store/UserStore";



const UserIndicator = () => {
    const profile = useUserStore((state) => state.profile);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: 90,
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            backgroundColor: "#4BAF4F66",
            borderRadius: 30 / 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              backgroundColor: "#4BAF4F",
              borderRadius: 18 / 2,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            <Text>
              {profile[0]?.fullname}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserIndicator;
