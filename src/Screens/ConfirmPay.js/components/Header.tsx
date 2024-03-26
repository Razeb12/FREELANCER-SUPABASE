import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Header = ({ navigation }: { navigation: any }) => {
  return (
    <View
      style={{
        paddingTop: 20,
        paddingBottom: 25,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="chevron-back-outline"
        size={27}
        color="black"
        onPress={() => navigation.pop()}
      />
      <Text
        style={{ fontSize: 22, fontFamily: "Rubik-Regular", marginLeft: 20 }}
      >
        Confirm and Pay
      </Text>
    </View>
  );
};

export default Header;
