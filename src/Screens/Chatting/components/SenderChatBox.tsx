/** @format */

import { View, Text } from "react-native"
import React, { memo } from "react"
import moment from "moment"

const SenderChatBox = ({ item, index }) => {
	return (
    <View
      style={{
        widt: "100%",
        paddingHorizontal: 20,
        alignItems: "flex-start",
        marginTop: index === 0 ? 20 : 0,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: "#909090",
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
            justifyContent: "flex-start",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#D3D3D3",
                fontSize: 12,
                fontFamily: "Rubik-Regular",
                textAlign: "right",
                marginRight: 6,
              }}
            >
              {moment(item.created_at).format("h:mma")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(SenderChatBox)
