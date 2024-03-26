import { Feather, Ionicons } from "@expo/vector-icons";
import React, { memo, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../../components/CustomTextInput";
import SenderChatBox from "./components/SenderChatBox";
import UserChatBox from "./components/UserChatBox";

import { TouchableOpacity } from "react-native";
import { useUserStore } from "../../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../../config";
import { supabase } from "../../../lib/supabase";

const Chatting = ({ navigation, route }: { navigation: any; route: any }) => {
  const [message, setMessage] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [time, setTime] = useState(new Date());
  const timer = useRef(null);
  const [sender, setSender] = useState(null);
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const freelancers = useUserStore((state) => state.freelancers);

  const openDialScreen = () => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:${route.params.phone}`;
    } else {
      number = `tel:${route.params.phone}`;
    }
    Linking.openURL(number);
  };
  const getChatRoomId = (userId1, userId2, role) => {
    return role === "freelancer"
      ? [userId1, userId2, role].sort().join("/")
      : [userId1, userId2].sort().join("/");
  };
  let scrollViewRef = useRef<FlatList<{
    id: string;
    senderId: string;
    message: string;
    timestamp: string;
  }> | null>(null);
  const { userId, content, name } = route.params;
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    const userIds = [userId.uid, profile[0].uid].sort();

    // Use the sorted user IDs to create the room_id
    const roomId = `${userIds[0]}/${userIds[1]}`;
    let { data: chatrooms, error } = await supabase
      .from("chatrooms")
      .select("*")
      .eq("room_id", roomId);

    setMessages(chatrooms);
    console.log(`${userId.bookingId}/${userId.uid}`);
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    const userIds = [userId.uid, profile[0].uid].sort();

    // Use the sorted user IDs to create the room_id
    const roomId = `${userIds[0]}/${userIds[1]}`;
    supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chatrooms" },
        (payload) => {
          if (payload.new.room_id === roomId) {
            setMessages((currentData) => [...currentData, payload.new]);
          }
        }
      )
      .subscribe();
  }, []);

  const sendMessage = async () => {
    let role;
    if (content !== "user") {
      role = "freelancer";
    }
    if (message) {
      const userIds = [userId.uid, profile[0].uid].sort();

      // Use the sorted user IDs to create the room_id
      const roomId = `${userIds[0]}/${userIds[1]}`;
      const { data, error } = await supabase
        .from("chatrooms")
        .insert({
          message: message,
          sender_id: profile[0]?.uid,
          room_id: roomId,
        })
        .select();

      if (error) {
        console.log(error);
      } else {
        setMessage("");
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  console.log(route.params.name);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          width: "100%",
          paddingTop: 20,
          paddingBottom: 15,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="chevron-back-outline"
            size={27}
            color="black"
            onPress={() => navigation.pop()}
          />
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              navigation.navigate("FreelancerProfile", {
                data: route.params?.userId,
              });
            }}
          >
            <Image
              source={{
                uri: !content
                  ? route.params.photo
                  : content !== "user"
                  ? route.params.userId?.bookingPhoto
                  : route.params.userId?.photo
                  ? route.params.userId?.photo
                  : DEFAULT_GALLERY_IMAGE,
              }}
              style={{
                width: 42,
                height: 42,
                borderRadius: 51 / 2,
                marginLeft: 15,
                marginRight: 10,
              }}
            />

            <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular" }}>
              {!content
                ? route.params.name
                : content !== "user"
                ? route.params.userId.bookingName
                : route.params.userId?.fullname}
            </Text>
          </TouchableOpacity>
        </View>
        {route.params?.userId.status === "completed" && (
          <Feather
            name="phone"
            size={24}
            color="#4BAF4F"
            onPress={openDialScreen}
          />
        )}
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#F2F2F2" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : messages.length > 0 ? (
          <FlatList
            data={messages}
            ref={scrollViewRef}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) =>
              item.sender_id === profile[0]?.uid ? (
                <UserChatBox index={index} item={item} />
              ) : (
                <SenderChatBox index={index} item={item} />
              )
            }
            onContentSizeChange={() =>
              scrollViewRef?.current?.scrollToEnd({
                animated: true,
              })
            }
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>No messages to display</Text>
          </View>
        )}

        <View
          style={{
            width: "100%",
            paddingRight: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopWidth: 1,
            borderColor: "#E8E8E8",
            maxHeight: 100,
          }}
        >
          <CustomTextInput
            placeholder={"Type a message"}
            style={{
              width: "89%",
              paddingHorizontal: 20,
              paddingBottom: 15,
              paddingTop: 15,
              fontSize: 14,
              borderRadius: 10,
            }}
            value={message}
            setValue={(text) => setMessage(text)}
            multiline={true}
          />
          {sending ? (
            <ActivityIndicator />
          ) : (
            <Feather
              name="send"
              size={24}
              color="#4BAF4F"
              onPress={() => sendMessage()}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default memo(Chatting);
