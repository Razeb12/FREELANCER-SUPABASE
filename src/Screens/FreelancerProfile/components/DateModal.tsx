import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

const DateModal = ({ disabledDates, getDuration, setVisible }) => {
  const [startSelectedDate, setStartSelectedDate] = useState<Date | null>();
  const [endSelectedDate, setEndSelectedDate] = useState<Date | null>();
  const startDate = startSelectedDate ? startSelectedDate.toString() : null;
  const endDate = endSelectedDate ? endSelectedDate.toString() : null;
  // console.log(startSelectedDate, endSelectedDate)

  useEffect(() => {
    if (startDate && endDate) {
      getDuration(startDate, endDate);
    }
  }, [startSelectedDate, endSelectedDate]);

  const onDateChange = (date: Date, type: string) => {
    switch (type) {
      case "START_DATE":
        setStartSelectedDate(date);
        setEndSelectedDate(date);
        break;
      default:
        setEndSelectedDate(date);
        break;
    }
  };

  const date = [new Date(disabledDates)];
  // const dateStrings = date.map((date) => date.toISOString().split("T")[0]);
  const dateStrings = disabledDates.map((date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  console.log(dateStrings); // Outputs: [ '2024-Jan-30', '2024-Feb-01', '2024-Feb-02' ]

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        borderColor: "#4BAF4F",
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          paddingRight: 5,
          marginBottom: 5,
        }}
      >
        <Entypo
          name="chevron-small-up"
          size={24}
          color={"#717171"}
          onPress={setVisible}
        />
      </View>
      <CalendarPicker
        startFromMonday={true}
        scrollable={false}
        restrictMonthNavigation={true}
        allowRangeSelection={true}
        disabledDatesTextStyle={{
          color: "gray",
        
        }}
        disabledDates={disabledDates}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 5))}
        selectedDayColor="#A1E7A4"
        selectedDayTextColor="#FFFFFF"
        selectedRangeStyle={{ backgroundColor: "#4BAF4F" }}
        todayBackgroundColor="transparent"
        todayTextStyle={{ color: "green" }}
        previousTitle="‹"
        nextTitle="›"
        width={Dimensions.get("window").width - 20}
        nextTitleStyle={{ color: "#98CB9A", fontSize: 30 }}
        previousTitleStyle={{ color: "#98CB9A", fontSize: 30 }}
        onDateChange={(date, type) => {
          onDateChange(date, type);
        }}
      />
    </View>
  );
};

export default DateModal;
