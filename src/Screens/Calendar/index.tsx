import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Calendar as CalendarPackage } from "react-native-calendars";
import moment from "moment";
import { RFPercentage } from "react-native-responsive-fontsize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import ConfirmModal from "../../components/ConfirmModal";
import { transformDates } from "../../utils";
import FreelancerBooking from "../Booking/components/FreelancerBooking";
import UserBooking from "../Booking/components/UserBooking";
import { useUserStore } from "../../../Store/UserStore";
import { supabase } from "../../../lib/supabase";

const Calendar = ({ navigation, route }) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const profile = useUserStore((state) => state.profile);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedUsers, setBookedUsers] = useState([]);
  const [markedDates, setMarkedDates] = useState(
    transformDates([{ startDate: new Date(), endDate: new Date() }])
  );
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    if (route.params.type === "user") {
      fetchFreelancers();
    } else {
      fetchUsers();
    }
  }, [route.params.type]);

  const fetchFreelancers = async () => {
    setLoading(true);
    const { data: bookedFreelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("bookingId", profile[0].uid);
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }
    usersArray = bookedFreelancers?.sort((a, b) => b.created_at - a.created_at);
    setAllUsers(usersArray);
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data: freelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("freelancerId", profile[0].uid);
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }
    usersArray = freelancers?.sort((a, b) => b.created_at - a.created_at);
    setAllUsers(usersArray);
    setLoading(false);
  };

  useEffect(() => {
    const currentDate = selectedDate.toISOString().split("T")[0];
    const filteredUsers = allUsers.filter(({ endDate, startDate, status }) => {
      const startDates = new Date(startDate).toISOString().split("T")[0];
      const endDates = new Date(endDate).toISOString().split("T")[0];

      return startDates <= currentDate && currentDate <= endDates;
    });
    setBookedUsers(filteredUsers);
  }, [selectedDate, allUsers]);

  const _handleSelectedDate = (date) => {
    setSelectedDate(new Date(date));
  };

  useEffect(() => {
    const markedDates = allUsers.reduce((dates, user) => {
      const startDate = new Date(user.startDate).toISOString().split("T")[0];
      dates[startDate] = { selected: true, marked: true };
      return dates;
    }, {});

    setMarkedDates(markedDates);
  }, [allUsers]);

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
              fontSize: RFPercentage(3),
              fontFamily: "Rubik-Regular",
              marginLeft: widthPercentageToDP(2),
            }}
          >
            Calendar
          </Text>
          <Pressable
            style={styles.setAvailabilityButton}
            onPress={() => navigation.navigate("SetAvailability")}
          >
            <Text>Set Availability</Text>
          </Pressable>
        </View>
        <CalendarPackage
          onDayPress={(day) => {
            _handleSelectedDate(day.dateString);
          }}
          hideExtraDays
          enableSwipeMonths
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
        />
        <View
          style={{
            backgroundColor: "#F2F2F2",
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Rubik-Regular",
              color: "#4E4E4E",
            }}
          >
            Scheduled bookings
          </Text>
          {selectedDate && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
                color: "#4E4E4E",
              }}
            >
              {moment(selectedDate).format("DD/MM/YYYY")}
            </Text>
          )}
        </View>
        {route.params.type !== "user" ? (
          <FlatList
            data={bookedUsers}
            renderItem={({ item }) => (
              <FreelancerBooking item={item} navigation={navigation} />
            )}
            keyExtractor={(_item) => _item?.id}
          />
        ) : (
          <FlatList
            data={bookedUsers}
            renderItem={({ item }) => (
              <UserBooking
                item={item}
                navigation={navigation}
                setData={setAllUsers}
              />
            )}
            keyExtractor={(_item) => _item?.id}
          />
        )}
        <ConfirmModal
          visible={loading}
          setVisible={setLoading}
          animation="fade"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#4BAF4F" />
          </View>
        </ConfirmModal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  setAvailabilityButton: {
    left: widthPercentageToDP(30),
  },
});
export default Calendar;
