import { MaterialCommunityIcons } from "@expo/vector-icons";
import Moment from "moment";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "../../../../components/Button";
import { color } from "../../../../utils/color";
import { useServiceStore } from "../../../../../Store/ServiceStore";

const DatePanel = ({ close }) => {
  const [startSelectedDate, setStartSelectedDate] = useState();
  const [endSelectedDate, setEndSelectedDate] = useState();
  const startDate = startSelectedDate ? startSelectedDate.toString() : null;
  const endDate = endSelectedDate ? endSelectedDate.toString() : null;
  const selectDate = useServiceStore((state) => state.setSelectedDate);

  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F2F2F2",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "400" }}>Date</Text>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={() => close()}
        />
      </View>
      <ScrollView>
        <View
          style={{
            width: "35%",
            backgroundColor: "#EAEAEA",
            marginLeft: "33%",
            paddingVertical: 10,
            paddingHorizontal: 0,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontFamily: "Rubik-Regular", textAlign: "center" }}>
            {startDate ? Moment(startDate).format("MMM DD") : "Start"} -{" "}
            {endDate ? Moment(endDate).format("MMM DD") : "End"}
          </Text>
        </View>
        <View style={{ borderBottomColor: "#DBDBDB", borderBottomWidth: 1 }}>
          <CalendarPicker
            startFromMonday={true}
            scrollable={false}
            restrictMonthNavigation={true}
            allowRangeSelection={true}
            disabledDatesTextStyle={{
              color: "gray",
              borderBottomColor: "green",
            }}
            disabledDates={[new Date("2024-01-25"), new Date("2024-01-31")]}
            minDate={new Date()}
            maxDate={
              new Date(new Date().setFullYear(new Date().getFullYear() + 5))
            }
            selectedDayColor="#A1E7A4"
            selectedDayTextColor="#FFFFFF"
            selectedRangeStyle={{ backgroundColor: "#4BAF4F" }}
            todayBackgroundColor="transparent"
            todayTextStyle={{ color: "#4BAF4F" }}
            previousTitle="‹"
            nextTitle="›"
            selectedEndDate={endSelectedDate}
            selectedStartDate={startSelectedDate}
            nextTitleStyle={{ color: "#98CB9A", fontSize: 30 }}
            previousTitleStyle={{ color: "#98CB9A", fontSize: 30 }}
            onDateChange={(date, type) => {
              let selectedDate = {};
              switch (type) {
                case "START_DATE":
                  setStartSelectedDate(date);
                  setEndSelectedDate(endSelectedDate); // Preserve the end date if already selected
                  selectedDate = {
                    startDate: date?.toString(),
                    endDate: endSelectedDate?.toString(), // Include the end date in the selectedDate object
                  };
                  break;
                case "END_DATE":
                  setEndSelectedDate(date);
                  selectedDate = {
                    startDate: startSelectedDate?.toString(), // Preserve the start date
                    endDate: date?.toString(),
                  };
                  break;
              }
              console.log(selectedDate, "gerrtyu");
              selectDate(selectedDate);
              console.log(selectedDate, "gerrtyu");
              selectDate(selectedDate);
            }}
          />
        </View>
        {/* <View style={{ paddingHorizontal: 20, marginVertical: 30 }}>
          <Text style={{ marginBottom: 20 }}>Time</Text>
          <Timer />
        </View> */}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            selectDate(null);
            close();
          }}
        >
          <Button
            text={"Clear"}
            textStyle={{ color: "#000", fontSize: 15 }}
            buttonStyle={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              borderBottomColor: "#000",
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => close()}>
          <Button
            text={"Done"}
            textStyle={{ color: "#fff", fontSize: 15 }}
            buttonStyle={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 5,
              backgroundColor: color.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatePanel;
