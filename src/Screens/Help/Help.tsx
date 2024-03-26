import {
  View,
  Text,
  Pressable,
  Image,
  Linking,
  Platform,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import BottomModal from "../../components/BottomModal";
import CustomTextInput from "../../components/CustomTextInput";

import Toast from "react-native-toast-message";
import moment from "moment";

const Help = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let ref = useRef();

  const sendProblem = async () => {
    setLoading(true);

    setLoading(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} hidden={false} animated={true} />
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
          Help
        </Text>
      </View>
      <Pressable
        style={{
          width: "90%",
          marginHorizontal: "5%",
          marginBottom: 10,
          borderTopColor: "#DCDCDC",
          borderBottomColor: "#DCDCDC",
          borderBottomWidth: 1,
          borderTopWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 5,
          paddingVertical: 10,
        }}
        onPress={() => {
          let mobile =
            Platform.OS == "ios" ? "2347041528380" : "+2347041528380";
          Linking.openURL(`whatsapp://send?text=hello&phone=${mobile}`)
            .then((data) => {
              console.log("opened whatsapp");
            })
            .catch((err) => {
              Alert.alert("Error", "Whatsapp not installed");
            });
        }}
      >
        <Image
          source={require("../../../assets/whatsapp.png")}
          resizeMode="contain"
        />
        <Text style={{ fontFamily: "Rubik-Regular" }}>Live Chat</Text>
      </Pressable>
      <Pressable
        style={{
          width: "90%",
          marginHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 5,
          paddingVertical: 10,
        }}
        onPress={() => navigation.navigate("FAQ")}
      >
        <Text>FAQ</Text>
        <AntDesign name="right" size={20} color="black" />
      </Pressable>
      <Pressable
        style={{
          width: "90%",
          marginHorizontal: "5%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 5,
          paddingVertical: 10,
        }}
        // onPress={() => {
        //   if (tokenStore.authToken.token) {
        //     ref.current.open();
        //   } else {
        //     Toast.show({
        //       type: "error",
        //       text1: "Sign in to continue or use live chat.",
        //     });
        //   }
        // }}
      >
        <Text style={{ textAlign: "center" }}>Report a Problem</Text>
        <AntDesign name="right" size={20} color="black" />
      </Pressable>
      <BottomModal
        refRBSheet={ref}
        dragClose={false}
        keyboardAvoidingViewEnabled={true}
        height={Dimensions.get("screen").height - 100}
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, backgroundColor: "#FBFBFB" }}
        >
          <StatusBar animated={true} hidden={true} translucent={true} />
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 20,
              justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "400", textAlign: "center" }}
            >
              Report a Problem
            </Text>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
              onPress={() => ref.current.close()}
              style={{ position: "absolute", right: 20 }}
            />
          </View>
          <ScrollView style={{ flex: 1 }}>
            <Text
              style={{
                color: "#6A6A6A",
                paddingHorizontal: 15,
                fontSize: 12,
                fontFamily: "Rubik-Regular",
                lineHeight: 16,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
              est mi ut nibh lobortis libero id pulvinar. Enim.
            </Text>
            {messages.map((item, index) => (
              <View
                key={item?.id}
                style={{
                  width: "100%",
                  paddingHorizontal: 20,
                  alignItems: "flex-end",
                  marginTop: index === 0 ? 20 : 0,
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: "#4BAF4F",
                    borderRadius: 20,
                    maxWidth: "70%",
                    width: "auto",
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontFamily: "Rubik-Regular",
                      fontSize: 14,
                    }}
                  >
                    {item.message}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          color: "#B7DFB9",
                          fontSize: 12,
                          fontFamily: "Rubik-Regular",
                          textAlign: "right",
                          marginRight: 6,
                        }}
                      >
                        {moment(item.updated_at).format("HH:mm")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              marginHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomColor: "#7A7A7A",
              borderBottomWidth: 1,
              marginBottom: Platform.OS === "android" ? 30 : 10,
            }}
          >
            <CustomTextInput
              placeholder={"Enter Message"}
              style={{
                width: "80%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
              value={message}
              setValue={(value) => setMessage(value)}
              multiline={true}
            />
            {loading ? (
              <ActivityIndicator size={"small"} color="#4BAF4F" />
            ) : (
              <Pressable
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#4BAF4F",
                  borderRadius: 30 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
                onPress={() =>
                  message.length
                    ? sendProblem()
                    : Toast.show({
                        type: "error",
                        text1: "Enter message",
                      })
                }
              >
                <MaterialCommunityIcons
                  name="send"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 3 }}
                />
              </Pressable>
            )}
          </View>
        </KeyboardAvoidingView>
      </BottomModal>
    </SafeAreaView>
  );
};

export default Help;
