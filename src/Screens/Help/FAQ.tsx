import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { freelancerFAQ, userFAQ } from "../../utils/data";

const FAQ = ({ navigation }: { navigation: any }) => {
  const [content, setContent] = useState("user");
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ fontSize: 22, fontFamily: "Rubik-Regular", marginLeft: 20 }}
        >
          FAQ
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          borderBottomColor: "#CFCFCF",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 40,
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
                fontFamily: "Rubik-Regular",
              }}
            >
              User
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
              Freelancer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {content === "user" ? (
        <FlatList
          data={userFAQ}
          renderItem={({ item, index }) => (
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 16,
                  paddingBottom: 20,
                  paddingTop: index === 0 ? 30 : 10,
                }}
              >
                {item.question}
              </Text>
              <Text
                style={{
                  color: "#818181",
                  fontFamily: "Rubik-Regular",
                  fontSize: 12,
                  paddingBottom: index === userFAQ.length - 1 ? 20 : 0,
                }}
              >
                {item.answer}
              </Text>
            </View>
          )}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: "#C2C2C2",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
          )}
        />
      ) : (
        <FlatList
          data={freelancerFAQ}
          renderItem={({ item, index }) => (
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 16,
                  paddingBottom: 20,
                  paddingTop: index === 0 ? 30 : 10,
                }}
              >
                {item.question}
              </Text>
              <Text
                style={{
                  color: "#818181",
                  fontFamily: "Rubik-Regular",
                  fontSize: 12,
                  paddingBottom: index === freelancerFAQ.length - 1 ? 20 : 0,
                }}
              >
                {item.answer}
              </Text>
            </View>
          )}
          style={{ paddingHorizontal: 20 }}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomColor: "#C2C2C2",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default FAQ;
