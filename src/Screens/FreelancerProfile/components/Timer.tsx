//@ts-nocheck

import { Entypo } from "@expo/vector-icons";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Timer = ({
  duration,
  setDuration,
  setStartTimeParam,
  setEndTimeParam,
}) => {
  const { startTime: startTimeState, endTime: endTimeState } = duration;
  const [startTime, setStartTime] = useState(startTimeState || "Select Time");
  const [endTime, setEndTime] = useState(endTimeState || "Select Time");
  const [show, setShow] = useState(false);
  const [timeOption, setTimeOption] = useState("start");
  const [displayDuration, setDisplayDuration] = useState();

  const showMode = (type) => {
    setShow(true);
    setTimeOption(type);
  };

  const getDuration = () => {
    if (startTime !== "Select Time" && endTime !== "Select Time") {
      let diffMs = endTime - startTime;
      let diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
      let diffHours = Math.floor(diffMs / 3600000);
      if (diffHours >= 0 && diffMins >= 0) {
        setDuration(Math.abs(endTime - startTime) / 36e5);
        setDisplayDuration(`${diffHours}h : ${diffMins}m`);
        return;
      }
      setDisplayDuration(`Invalid Time Duration`);
    } else {
      setDisplayDuration(`Duration`);
    }
  };

  const onChange = (selectedTime) => {
    const currentTime = Number(selectedTime) + 86400000;
    if (timeOption === "start") {
      setStartTimeParam(currentTime);
      setStartTime(currentTime);
    } else {
      setEndTimeParam(currentTime);
      setEndTime(currentTime);
    }
    setShow(false);
  };

  useEffect(() => {
    getDuration();
  }, [startTime, endTime]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 10,
          paddingVertical: 9,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: "#4BAF4F",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "40%",
            height: "100%",
            //   backgroundColor: "green",
          }}
        >
          <Text style={{ fontSize: 10, color: "#898989" }}>From</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              showMode("start");
            }}
          >
            <View
              style={{
                // width: "100%",
                height: 30,
                justifyContent: "center",
                marginLeft: 13,
              }}
            >
              <Text>
                {startTime === "Select Time"
                  ? startTime
                  : moment(startTime).format("h:mm a")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Entypo
          name="chevron-small-up"
          size={24}
          color={"#717171"}
          style={{ transform: [{ rotate: "90deg" }] }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "40%",
            height: "100%",
            justifyContent: "flex-end",
            //   backgroundColor: "red",
          }}
        >
          <Text style={{ fontSize: 10, color: "#898989" }}>To</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              showMode("end");
            }}
          >
            <View
              style={{
                height: 30,
                justifyContent: "center",
                marginLeft: 15,
              }}
            >
              <Text>
                {endTime === "Select Time"
                  ? endTime
                  : moment(endTime).format("h:mm a")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            // width: 100,
            backgroundColor: "#E1F0E1",
            paddingVertical: 15,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 7,
          }}
        >
          <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
            {displayDuration}
          </Text>
        </View>
      </View>
      <DateTimePickerModal
        is24Hour={false}
        isVisible={show}
        mode="time"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onConfirm={onChange}
        onCancel={() => setShow(false)}
        // isDarkModeEnabled={false}
      />
    </View>
  );
};

export default memo(Timer);
