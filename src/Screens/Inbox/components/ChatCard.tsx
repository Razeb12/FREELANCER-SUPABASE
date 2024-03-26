import React, { memo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import moment from "moment";
import { DEFAULT_GALLERY_IMAGE } from "../../../../config";

type Props = {
  navigation: any;
  item: any;
  content: any;
  message: string;
};

const ChatCard = ({ navigation, item, content, message }: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E8E8E8",
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() =>
        navigation.navigate("Chatting", {
          userId: item,
          content: content,
        })
      }
    >
      <Image
        source={
          content !== "user"
            ? { uri: item.bookingPhoto }
            : { uri: item.photo || DEFAULT_GALLERY_IMAGE }
        }
        style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
      />
      <View
        style={{
          marginLeft: "3%",
          //   backgroundColor: "red",
          height: "100%",
          width: "82%",
          //   justifyContent: "space-between",
          paddingVertical: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            {/* {item.status && (
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "Rubik-Regular",
                  marginBottom: 5,
                  color:
                    item.status === "pending"
                      ? "#FBBC04"
                      : item.status === "completed"
                      ? "#4BAF4F"
                      : item.status === "cancelled" || item.status === "cancel"
                      ? "red"
                      : "green",
                }}
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            )} */}
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Rubik-Regular",
                color: "#4A4A4A",
                marginTop: 15,
              }}
            >
              {content !== "user" ? item.bookingName : item.fullname}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Rubik-Regular",
              color: "#717171",
              marginRight: 8,
              marginTop: 15,
            }}
          >
            {moment(item.created_at).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Rubik-Regular",
            color: "#717171",
          }}
        >
          {message}
        </Text>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: item.book_status ? "space-between" : "flex-end",
            alignItems: "center",
          }}
        >
          {item && item.skills && (
            <Text
              style={{
                fontSize: 12,
                fontFamily: "Rubik-Regular",
                color: "#717171",
                width: "80%",
                // backgroundColor: "red",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {`${moment(item.startDate).format("DD MMM")} - ${moment(
                item.endDate
              ).format("DD MMM")}`}
              {"    "}
            </Text>
          )}
         
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default memo(ChatCard);
