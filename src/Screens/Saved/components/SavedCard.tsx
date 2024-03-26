import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { Profile } from "../../../utils/types";
import { DEFAULT_GALLERY_IMAGE } from "../../../../config";
type Location = {
  location: string;
  users: Profile[];
};

const SavedCard = ({
  navigation,
  location,
}: {
  navigation: any;
  location: Location;
}) => {
  const sortedData = location.users.filter((item, idx: number) => idx < 4);
  return (
    <TouchableOpacity
      style={{
        width: "92%",
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        marginHorizontal: "4%",
        marginVertical: 10,
      }}
      onPress={() =>
        navigation.navigate("SavedLocation", {
          city: sortedData[0]?.location,
          users: sortedData,
        })
      }
    >
      <View
        style={{
          width: "100%",
          flexDirection: sortedData.length === 3 ? "column" : "row",
          flexWrap: "wrap",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          overflow: "hidden",
          height: 190,
        }}
      >
        {location.users.slice(0, 4).map((user, index) => (
          <Image
            source={{
              uri: user.profilePhoto
                ? user.profilePhoto
                : DEFAULT_GALLERY_IMAGE,
            }}
            key={index}
            style={{
              width: location.users.length === 1 ? "100%" : "50%",
              height: location.users.length <= 2 ? "100%" : "50%",
            }}
            resizeMode={"cover"}
          />
        ))}
      </View>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
          {sortedData[0]?.location ? sortedData[0]?.location : "Others"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SavedCard;
