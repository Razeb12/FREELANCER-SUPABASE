import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProfile from "./Tabs/UserProfile";
import FreelancerProfile from "./Tabs/FreelancerProfile";

export default function Account({ navigation }: { navigation: any }) {
  const [content, setContent] = useState("user");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
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
          My Account
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          borderBottomColor: "#CFCFCF",
          borderBottomWidth: 1,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 15,
            backgroundColor: content === "user" ? "#4BAF4F" : "transparent",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onPress={() => setContent("user")}
        >
          <Text
            style={{
              color: content === "user" ? "#fff" : "#767676",
              fontSize: 12,
            }}
          >
            User Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 30,
            paddingVertical: 15,
            backgroundColor:
              content === "freelancer" ? "#4BAF4F" : "transparent",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          onPress={() => setContent("freelancer")}
        >
          <Text
            style={{
              color: content === "freelancer" ? "#fff" : "#767676",
              fontFamily: "Rubik-Regular",
              fontSize: 12,
            }}
          >
            Freelancer Profile
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {content === "user" ? <UserProfile /> : <FreelancerProfile navigation={navigation} />}
      </ScrollView>
    </SafeAreaView>
  );
}
