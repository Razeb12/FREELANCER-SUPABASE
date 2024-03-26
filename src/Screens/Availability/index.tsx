import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useIsFocused } from "@react-navigation/native";
import { Calendar as CalendarPackage } from "react-native-calendars";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useUserStore } from "../../../Store/UserStore";
import { supabase } from "../../../lib/supabase";

const Availiability = ({ navigation }) => {
  const [data, setData] = useState([]);
  const profile = useUserStore((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [markedDates, setMarkedDates] = useState([
    { start_date: new Date(), end_date: new Date() },
  ]);
  const [selectedDate, setSelectedDates] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [show, setShow] = useState(null);

  useEffect(() => {
    const availableTimes = profile[0]?.availability?.map(
      (time) => new Date(time)
    );

    setSelectedDates(availableTimes);

    const markedDatesObject = availableTimes?.reduce((dates, date) => {
      const dateStr = date.toISOString().split("T")[0];
      dates[dateStr] = { selected: true, marked: true };
      return dates;
    }, {});

    setMarkedDates(markedDatesObject);
  }, []);
  const onChange = (_event, selectedDate) => {
    if (show === "start") {
      setShow(null);
      return setStartTime(selectedDate);
    }
    setEndTime(selectedDate);
    setShow(null);
  };
  const onChangeIos = (_event, date, show) => {
    if (show === "start") {
      setShow(null);
      return setStartTime(date);
    }
    setEndTime(date);
    setShow(null);
  };

  const _init = async () => {
    setLoading(true);

    setLoading(false);
  };

  useEffect(() => {
    _init();
  }, [isFocused]);

  // useEffect(() => {
  //   const currentDay = selectedDate.getDay() + 1;
  //   const availability = data?.find(
  //     ({ day_of_week }) => day_of_week === currentDay
  //   );
  //   // if (availability) {
  //   //   const endDate = new Date(selectedDate);
  //   //   const startDate = new Date(selectedDate);
  //   //   const endTimeArray = availability.end_time.split(":");
  //   //   const startTimeArray = availability.start_time.split(":");

  //   //   startDate.setHours(+startTimeArray[0], startTimeArray[1]);

  //   //   endDate.setHours(+endTimeArray[0], endTimeArray[1]);

  //   //   setStartTime(startDate);
  //   //   setEndTime(endDate);
  //   // }
  // }, [selectedDate, data]);

  const _handleSelectedDate = (date: Date) => {
    const newDate = new Date(date);
    let newDatesArray = [...(selectedDate || [])];
    let markedDatesObject = newDatesArray?.reduce((dates, date) => {
      const dateStr = date.toISOString().split("T")[0];
      dates[dateStr] = { selected: true, marked: true };
      return dates;
    }, {});

    // Check if the date is already in the array
    const index = newDatesArray.findIndex(
      (d) =>
        d.toISOString().split("T")[0] === newDate.toISOString().split("T")[0]
    );

    if (index !== -1) {
      // If the date is in the array, remove it
      newDatesArray.splice(index, 1);
      delete markedDatesObject[newDate.toISOString().split("T")[0]];
    } else {
      // If the date is not in the array, add it
      newDatesArray.push(newDate);
      markedDatesObject[newDate.toISOString().split("T")[0]] = {
        selected: true,
        marked: true,
      };
    }

    setSelectedDates(newDatesArray);
    setMarkedDates(markedDatesObject);
  };

  const _handleSave = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .update([{ availability: selectedDate }])
      .eq("uid", profile[0].uid)
      .select();

    if (error) {
      console.log(error);
    }else{
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    }

    setLoading(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 15,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#CFCFCF",
            borderBottomWidth: 1,
            marginBottom: 15,
            // width: widthPercentageToDP(100),
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={27}
            color="black"
            onPress={() => navigation.pop()}
          />
          <Text
            style={{
              fontFamily: "Rubik-Regular",
            }}
          >
            Availability
          </Text>
          <Pressable style={styles.saveButton} onPress={_handleSave}>
            <Text>Save</Text>
          </Pressable>
        </View>
        <CalendarPackage
          disableMonthChange={true}
          onDayPress={(day) => {
            _handleSelectedDate(day.dateString);
          }}
          hideExtraDays
          enableSwipeMonths={false}
          markedDates={markedDates}
          onMonthChange={(month) => {
            _handleSelectedDate(month.dateString);
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            textSectionTitleDisabledColor: "#d9e1e8",
            selectedDayBackgroundColor: "#009C52",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#009C52",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "#009C52",
            monthTextColor: "#222222",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          minDate={new Date()}
        />

        {/* <View style={styles.buttonContainer}>
          <View>
            <Text style={styles.titleText}>Start Time</Text>
            {Platform.OS === "ios" ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={"time"}
                onChange={(event, date) => onChangeIos(event, date, "start")}
                style={styles.iosTimePicker}
              />
            ) : (
              <Pressable onPress={() => setShow("start")}>
                <Button
                  text={`${moment(startTime).format("hh:mm")} ${moment(
                    startTime
                  )
                    .format("A")
                    .toString()}`}
                  buttonStyle={styles.button}
                  textStyle={{ color: "#4BAF4F" }}
                />
              </Pressable>
            )}
          </View>
          <View>
            <Text style={styles.titleText}>End Time</Text>
            {Platform.OS === "ios" ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
                mode={"time"}
                onChange={(event, date) => onChangeIos(event, date, "end")}
                style={styles.iosTimePicker}
              />
            ) : (
              <Pressable onPress={() => setShow("end")}>
                <Button
                  text={`${moment(endTime).format("hh:mm")} ${moment(endTime)
                    .format("A")
                    .toString()}`}
                  buttonStyle={styles.button}
                  textStyle={{ color: "#4BAF4F" }}
                />
              </Pressable>
            )}
          </View>
        </View> */}
        <View>
          {Platform.OS !== "ios" && show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={show === "start" ? startTime : endTime}
              mode={"time"}
              onChange={onChange}
              style={styles.timePickerContainer}
            />
          )}
        </View>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size={"large"} color="#D8D8D8" />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(4),
  },
  button: {
    borderColor: "#4BAF4F",
    borderWidth: 1,
    borderRadius: 10,
    width: widthPercentageToDP(40),
  },
  titleText: {
    textAlign: "center",
    marginBottom: heightPercentageToDP(1),
    color: "#4BAF4F",
  },
  timePickerContainer: {
    marginRight: widthPercentageToDP(40),
    marginTop: heightPercentageToDP(2),
  },
  iosTimePicker: {
    width: widthPercentageToDP(30),
  },
  saveButton: {
    left: widthPercentageToDP(40),
  },
  loader: {
    height: heightPercentageToDP(10),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Availiability;
