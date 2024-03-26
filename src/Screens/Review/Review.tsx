import { View, Text, StatusBar, ScrollView } from "react-native";
import React, { memo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReviewCard from "../../components/ReviewCard";

const Review = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
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
          Reviews
        </Text>
      </View>
      <ScrollView>
        {route.params?.ratings.map((item, index) => (
          <View key={index} style={{ width: "100%", paddingHorizontal: 20 }}>
            <ReviewCard details={item} style={{ marginBottom: 20 }} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default memo(Review);
