import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Switch } from "react-native-switch";
import moment from "moment";
import { updateAvailability } from "../../../helpers/availability";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { convertTo12HrsFormat } from "../../../utils";

const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const ReminderCard = ({ navigation, item }) => {
  const [value, setValue] = useState(!!item.is_available ? true : false);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status) => {
    setLoading(true);
    const value = await updateAvailability({ ...item, is_available: status });
    setLoading(false);

    if (value) {
      setValue(status);
      Toast.show({
        type: "success",
        text1: "Updated Status successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Try again.",
      });
    }
  };
  return (
    <Pressable
      style={{
        width: "90%",
        marginHorizontal: "5%",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#DEDEDE",
      }}
      onPress={() =>
        navigation.navigate("EditAvailability", {
          data: {
            ...item,
            is_available: value,
          },
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            {days[item.day_of_week]}
          </Text>
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
              color: "#8F8F8F",
            }}
          >
            {convertTo12HrsFormat(item.start_time)} -{" "}
            {convertTo12HrsFormat(item.end_time)}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#4BAF4F" />
        ) : (
          <Switch
            value={value}
            onValueChange={updateStatus}
            circleSize={30}
            barHeight={35}
            circleBorderWidth={0}
            innerCircleStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
            backgroundActive={"#34C759"}
            backgroundInactive={"#E6E6E7"}
            circleActiveColor={"#FFFFFF"}
            circleInActiveColor={"#FFFFFF"}
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={2.5}
            switchRightPx={2.5}
            switchWidthMultiplier={2}
            switchBorderRadius={30}
          />
        )}
      </View>
    </Pressable>
  );
};

export default ReminderCard;
