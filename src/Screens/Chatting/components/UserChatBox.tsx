/** @format */

import { View, Text } from "react-native";
import React, { memo } from "react";
import moment from "moment";

const UserChatBox = ({ item, index }) => {
  return (
    <View
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#B7DFB9",
                fontSize: 12,
                fontFamily: "Rubik-Regular",
                textAlign: "right",
                marginRight: 6,
              }}
            >
              {moment(item.created_at).format("h:mma")}
            </Text>
            {/* {item.status === "sent" || item.status === "delivered" ? (
              <Ionicons name="checkmark" size={20} color="#fff" />
            ) : item.status === "seen" ? (
              <Ionicons name="checkmark-done" size={20} color="#fff" />
            ) : (
              <AntDesign name="clockcircleo" size={13} color="#fff" />
            )} */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(UserChatBox);
