import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";

import { Button } from "../../components/Button";
import { Skills } from "../../utils/types";
import About from "./components/About";
import DateModal from "./components/DateModal";
import DetailSkill from "./components/DetailSkill";
import Equipment from "./components/Equipment";
import FreelancerCarousel from "./components/FreelancerCarousel";
import StaticDropdown from "./components/StaticDropdown";
import Timer from "./components/Timer";

import ConfirmModal from "../../components/ConfirmModal";
import ReviewCard from "../../components/ReviewCard";
import { useUserStore } from "../../../Store/UserStore";
import moment from "moment";
import { supabase } from "../../../lib/supabase";
type Props = {
  route: any;
  navigation: any;
  Skills: Skills;
};

export default function FreelancerProfile({ route, navigation }: Props) {
  const [loading, setLoading] = useState<boolean>();
  const profile = useUserStore((state) => state.profile);
  const [selectedSkill, setSelectedSkill] = useState<Skills | null>(null);
  const [rentWithoutService, setRentWithoutService] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [date, setDate] = useState(true);
  const [timeDuration, setTimeDuration] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [startTime, setStartTime] = useState();
  const [visible, setVisible] = useState(false);
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");
  const [endTime, setEndTime] = useState();
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [equipment, setEquipment] = useState(false);
  const [daysDuration, setDaysDuration] = useState(0);
  const user = useUserStore((state) => state.user);
  const [selectedSkillAndService, setSelectedSkillAndService] = useState<any[]>(
    []
  );
  const [donate, setDonate] = useState(0);
  const [bookedDateStart, setBookedDateStart] = useState(null);
  const [bookedDateEnd, setBookedDateEnd] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [chatAvailable, setChatAvailable] = useState(false);

  const fetchChats = async () => {
    const userIds = [route.params.data.uid, profile[0].uid].sort();
    const roomId = `${userIds[0]}/${userIds[1]}`;
    const { data, error } = await supabase
      .from("chatrooms")
      .select("*")
      .eq("room_id", roomId);

    if (error) {
      console.error(error);
      return false;
    }
    setChatAvailable(data.length > 0);

    return data.length > 0;
  };

  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    if (selectedSkillAndService.some((item) => item.is_rented)) {
      setRentWithoutService(true);
      const newFilteredItems = selectedSkillAndService.filter(
        (item) => item.is_rented
      );
      setFilteredItems(newFilteredItems);
    } else {
      setRentWithoutService(false);
      setFilteredItems([]);
    }
  }, [selectedSkillAndService]);

  useEffect(() => {
    if (startDate && endDate) {
      setDaysDuration(getDaysDuration(startDate, endDate));
    }
    if (startTime && endTime) {
      setTimeDuration(getDurationTime(startTime, endTime));
    }
    if (startDate && endDate && startTime && endTime) {
      getFullTotalAmount().totalPay;
    }
  }, [startDate, startTime, endDate, endTime]);

  const formatTime = (time: string | number | Date) => {
    if (!time) {
      return ""; // Return an empty string if time is null or undefined
    }
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getDaysDuration = (
    start: string | number | Date,
    end: string | number | Date
  ) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const dates = [];
    const bookingArray = [];

    for (let i = 0; i <= diffDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = date.toISOString().slice(0, 10);

      const startDateTime = startTime ? new Date(startTime) : null;
      if (startDateTime) {
        startDateTime.setDate(date.getDate());
      }

      const endDateTime = endTime ? new Date(endTime) : null;
      if (endDateTime) {
        endDateTime.setDate(date.getDate());
        // Add one day to endDateTime if it crosses into the next day
      }

      const formattedStartTime = startDateTime
        ? formatTime(startDateTime)
        : null;
      const formattedEndTime = endDateTime ? formatTime(endDateTime) : null;

      const bookings_time = [];
      if (formattedStartTime && formattedEndTime) {
        bookings_time.push(`${formattedStartTime} - ${formattedEndTime}`);
      }

      dates.push(formattedDate);
      bookingArray.push({
        bookings_date: formattedDate,
        bookings_time: bookings_time,
      });
    }
    setSelectedDates(dates);
    setBookings(bookingArray);
    setFormattedStartTime(formattedStartTime);
    setFormattedEndTime(formattedEndTime);
    // Update the bookedDateStart and bookedDateEnd states
    setBookedDateStart(dates[0]);
    setBookedDateEnd(dates[dates.length - 1]);

    let totalPrice = Number(getFullTotalAmount().totalPay);
    const roundedUp = Math.ceil(totalPrice / 5) * 5;
    setDonate(Math.round(roundedUp - totalPrice));

    return diffDays + 1;
  };
  const getFullTotalAmount = () => {
    let totalPay = 0;
    let totalTime = 0;

    bookings.forEach((booking) => {
      const durationInSeconds = calculateDurationInSeconds(
        booking.bookings_time[0]
      );
      const durationInMinutes = Math.ceil(durationInSeconds / 60);
      totalTime = durationInMinutes;
      // console.log(durationInMinutes);

      const fullPrice = selectedSkillAndService
        .map((item) => Number(item.rate))
        .reduce((a, b) => a + b, 0);
      const halfPrice = Number(fullPrice) / 2;
      if (durationInMinutes >= 60) {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        totalPay += hours * Number(fullPrice);

        if (minutes >= 30) {
          totalPay += Number(fullPrice);
        } else if (minutes > 0) {
          totalPay += halfPrice;
        }
      } else if (durationInMinutes > 0) {
        totalPay += halfPrice;
      }
    });

    return {
      totalPay: Number(totalPay.toFixed(0)),
      durationInMinutes: totalTime,
    };
  };

  const updateBookingStartTime = (
    index: number,
    startTime: React.SetStateAction<number>
  ) => {
    const updatedBookings = [...bookings];
    const { bookings_date } = updatedBookings[index];
    const formattedStartTime = formatTime(startTime);

    updatedBookings[index] = {
      ...updatedBookings[index], // Copy other properties
      bookings_time: [`${formattedStartTime} - ${formattedEndTime}`],
    };
    setBookings(updatedBookings);
    setFormattedStartTime(formattedStartTime);
  };

  const updateBookingEndTime = (
    index: number,
    endTime: React.SetStateAction<number>
  ) => {
    const updatedBookings = [...bookings];
    const { bookings_date } = updatedBookings[index];
    const formattedEndTime = formatTime(endTime);

    updatedBookings[index] = {
      ...updatedBookings[index], // Copy other properties
      bookings_time: [`${formattedStartTime} - ${formattedEndTime}`],
    };

    setBookings(updatedBookings);
    setFormattedEndTime(formattedEndTime);
  };

  const generateTimers = () => {
    return bookings.map((booking: any, index: number) => {
      return (
        <View key={index}>
          <Text style={{ alignSelf: "flex-start", marginTop: 5 }}>
            {moment(booking.bookings_date).format("DD-MM-YYYY")}
          </Text>
          <Timer
            duration={{
              startTime: booking.startTime,
              endTime: booking.endTime,
            }}
            setDuration={(duration: React.SetStateAction<number>) =>
              setTimeDuration(duration)
            }
            setStartTimeParam={(start: React.SetStateAction<number>) =>
              updateBookingStartTime(index, start)
            }
            setEndTimeParam={(end: React.SetStateAction<number>) =>
              updateBookingEndTime(index, end)
            }
          />
        </View>
      );
    });
  };

  const calculateDurationInSeconds = (timeString: {
    split: (arg0: string) => [any, any];
  }) => {
    if (timeString) {
      const [startTime, endTime] = timeString.split(" - ");
      const start = parseTime(startTime);
      const end = parseTime(endTime);

      if (start && end) {
        const durationInSeconds = (end - start) / 1000; // Convert milliseconds to seconds
        return durationInSeconds;
      }
    }

    return 0; // If timeString is missing or invalid, return 0
  };

  const parseTime = (timeString: { split: (arg0: string) => [any, any] }) => {
    const [time, meridiem] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    let hours24 = parseInt(hours, 10);

    if (meridiem === "PM" && hours24 < 12) {
      hours24 += 12;
    } else if (meridiem === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    return new Date(1970, 0, 1, hours24, parseInt(minutes, 10));
  };

  const getDurationTime = (start: number, end: number) => {
    let diffMs = end - start;
    return Math.abs(diffMs) / 36e5;
    // IN HOURS
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FBFBFB" }}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="light-content" backgroundColor={"transparent"} />
        <FreelancerCarousel gallery={route.params.data} />
        <View style={{ position: "absolute", top: 50, left: 10 }}>
          <Ionicons
            name="chevron-back-outline"
            size={28}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderBottomColor: "#D8D8D8",
            borderBottomWidth: 1,
          }}
        >
          {route.params.data.Skills?.map(
            (skill: { name: string; rate: number }, index: any) => (
              <DetailSkill key={index} details={skill} />
            )
          )}
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomColor: "#D8D8D8",
            borderBottomWidth: 1,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ width: 120 }}
            onPress={() => {
              //add the chatAvailable if agreed
              if (user) {
                navigation.navigate("Chatting", {
                  userId: route.params.data,
                  name: route.params.data.fullname,
                  photo: route.params.data.profilePhoto,
                  // content: content,
                });
              } else {
                if (!user) {
                  navigation.navigate("ProfileStack");
                  Toast.show({
                    type: "error",
                    text1: "Please login to chat with a freelancer",
                  });
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Please book to contact",
                  });
                }
              }
            }}
          >
            <Button
              text="Contact"
              buttonStyle={{
                backgroundColor: "#4BAF4F",
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderBottomColor: "#D8D8D8",
            borderBottomWidth: 1,
          }}
        >
          <About details={route.params.data} />
        </View>

        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderBottomColor: "#D8D8D8",
            borderBottomWidth: 1,
          }}
        >
          {!rentWithoutService ? (
            <>
              <Text
                style={{
                  marginTop: 0,
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                }}
              >
                Book {route.params.data.fullname} as:
              </Text>
              <SelectDropdown
                buttonStyle={{
                  width: "100%",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginTop: 15,
                  backgroundColor: "transparent",
                  borderColor: "#4BAF4F",
                  borderRadius: 10,
                  borderWidth: 1,
                }}
                buttonTextStyle={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  textAlign: "left",
                }}
                onSelect={(selectedItem, index) => {
                  const skill = route.params.data.Skills[index];

                  if (rentWithoutService === false) {
                    const newArray = selectedSkillAndService.filter(
                      (item) => item.name !== selectedSkill?.name
                    );
                    setSelectedSkillAndService([
                      ...newArray,
                      {
                        id: skill.id,
                        name: selectedItem,
                        rate: Number(skill.rate),
                      },
                    ]);
                  } else {
                    setSelectedSkillAndService([]);
                  }
                  setSelectedSkill(skill);
                }}
                // defaultValue={selectedSkill.skill}
                data={route.params.data.Skills?.map(
                  (item: { name: string }) => item.name
                )}
                renderCustomizedRowChild={(item) => (
                  <View
                    style={{
                      marginHorizontal: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Rubik-Regular",
                        fontSize: 15,
                      }}
                    >
                      {item}
                    </Text>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20 / 2,
                        borderWidth: 1,
                        borderColor:
                          item === selectedSkill?.name ? "#4BAF4F" : "#9F9F9F",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 2,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 20 / 2,
                          backgroundColor:
                            item === selectedSkill?.name ? "#4BAF4F" : "",
                        }}
                      />
                    </View>
                  </View>
                )}
                renderDropdownIcon={() => (
                  <Entypo
                    name="chevron-small-down"
                    size={24}
                    color={"#717171"}
                  />
                )}
                dropdownStyle={{ borderRadius: 20 }}
                rowStyle={{ paddingVertical: 7 }}
                rowTextStyle={{
                  fontSize: 14,
                  fontFamily: "Rubik-Regular",
                  textAlign: "left",
                }}
              />
            </>
          ) : null}

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
              }}
            >
              Special Equipment
            </Text>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="#4E4E4E"
              onPress={() => setVisible(true)}
            />
          </View>
          {equipment ? (
            <StaticDropdown onPress={() => setEquipment(false)}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#343434",
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Select Equipment
              </Text>
              <Entypo name="chevron-small-down" size={24} color={"#717171"} />
            </StaticDropdown>
          ) : (
            <Equipment
              details={route.params.data.Equipments}
              setRentOnlyEquipment={setRentWithoutService}
              selectedSkillAndService={selectedSkillAndService}
              setSelectedSkillAndService={setSelectedSkillAndService}
              selectedSkill={selectedSkill}
              setVisible={() => setEquipment(true)}
            />
          )}
          <Text
            style={{
              marginTop: 15,
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
          >
            Book Date
          </Text>
          {date ? (
            <StaticDropdown onPress={() => setDate(false)}>
              <Text
                style={{ fontSize: 14, color: "#343434" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {startDate && endDate
                  ? `${format(startDate, "dd MMM yyyy")} - ${format(
                      endDate,
                      "dd MMM yyyy"
                    )}`
                  : "Select date"}
              </Text>
              <Entypo name="chevron-small-down" size={24} color={"#717171"} />
            </StaticDropdown>
          ) : (
            <DateModal
              disabledDates={disabledDates}
              setVisible={() => setDate(true)}
              getDuration={(
                start: React.SetStateAction<undefined>,
                end: React.SetStateAction<undefined>
              ) => {
                if (start && end) {
                  setStartDate(start);
                  setEndDate(end);
                }
              }}
            />
          )}
          <View style={{ width: "100%", paddingHorizontal: 5, paddingTop: 20 }}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Rubik-Regular",
                fontSize: 14,
              }}
            >
              Select Time
            </Text>
            {generateTimers()}
          </View>
          <>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                paddingTop: 20,
                borderBottomColor: "#D8D8D8",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                  marginBottom: 20,
                }}
              >
                Subtotal:
              </Text>
              {selectedSkillAndService &&
                selectedSkillAndService.length > 0 &&
                selectedSkillAndService
                  .sort((a, b) => b.rate - a.rate)
                  .map((item, index) => (
                    <View
                      style={{
                        paddingLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 7,
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Rubik-Regular",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Rubik-Regular",
                        }}
                      >
                        ${Number(item.rate)}
                      </Text>
                    </View>
                  ))}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 15,
                  paddingBottom: 15,
                  borderColor: "#D8D8D8",
                  borderTopWidth: 1,
                  paddingTop: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Rubik-Regular",
                  }}
                >
                  Total
                </Text>
                {selectedSkillAndService.length > 0 && (
                  <>
                    {selectedSkillAndService.length > 1 &&
                    !rentWithoutService ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Rubik-Regular",
                          color: "#4BAF4F",
                        }}
                      >
                        ${getFullTotalAmount().totalPay}
                        /hrs
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: "Rubik-Regular",
                          color: "#4BAF4F",
                        }}
                      >
                        ${getFullTotalAmount().totalPay}
                        /hr
                      </Text>
                    )}
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                paddingVertical: 20,
                alignItems: "flex-end",
              }}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity
                  style={{ width: 100 }}
                  onPress={() => {
                    if (user) {
                      if (
                        (selectedSkillAndService.length > 0 &&
                          timeDuration > 0 &&
                          daysDuration > 0,
                        selectedSkill?.name &&
                          bookings.length > 0 &&
                          bookings.every(
                            (booking) =>
                              booking.bookings_date !== null &&
                              booking.bookings_time.length > 0
                          ))
                      ) {
                        navigation.navigate("ConfirmPay", {
                          freelancer: {
                            user: route.params.data,
                            startDate,
                            endDate,
                            selectedSkill: {
                              name: selectedSkill?.name,
                              rate: selectedSkill?.rate,
                            },
                            selectedSkillAndService:
                              filteredItems.length > 0
                                ? filteredItems
                                : selectedSkillAndService,
                            total: getFullTotalAmount().totalPay,
                            specialEquipment:
                              filteredItems.length > 0 ? true : false,
                            totalTime:
                              getFullTotalAmount().durationInMinutes / 60,
                          },
                        });
                      } else {
                        Toast.show({
                          type: "error",
                          text1: "Please check all fields and validate them",
                        });
                      }
                    } else {
                      navigation.navigate("ProfileStack");
                      Toast.show({
                        type: "error",
                        text1: "Please login to continue",
                      });
                    }
                  }}
                >
                  <Button
                    text="Reserve"
                    buttonStyle={{
                      backgroundColor: "#4BAF4F",
                      borderRadius: 10,
                      width: 100,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
            paddingTop: 20,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 16,
              }}
            >
              Customer review
            </Text>
            {route.params?.data?.reviews?.length > 0 && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Review", {
                    ratings: route.params?.data?.reviews,
                  })
                }
              >
                <Text
                  style={{
                    color: "#4BAF4F",
                    fontFamily: "Rubik-Regular",
                  }}
                >
                  See all
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {route.params?.data?.Reviews?.length > 0 && (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 16,
                }}
              >
                Total Reviews
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign name="star" size={20} color="#4BAF4F" />
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 16,
                    marginLeft: 7,
                  }}
                >
                  {route.params?.data?.Reviews?.length}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View
          style={{
            width: "100%",

            // paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          {route.params?.data?.Reviews?.length > 0 ? (
            <>
              {route.params.data.Reviews.filter((item, idx) => idx < 2).map(
                (item, index) => (
                  <ReviewCard details={item} key={index} />
                )
              )}
            </>
          ) : (
            <View
              style={{
                width: "100%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                No Reviews yet to view
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      <ConfirmModal visible={visible} setVisible={setVisible}>
        <View
          style={{
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "#fff",
            marginTop: 100,
            borderRadius: 10,
          }}
        >
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
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              Special Equipment Discount
            </Text>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
              onPress={() => setVisible(false)}
            />
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Rubik-Regular",
              }}
            >
              <Text style={{ fontSize: 18, paddingTop: 20 }}>{"\u2022"}</Text>{" "}
              Don't forget! Booking the equipment with the associated service
              might grant you an exclusive discount %.
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                fontFamily: "Rubik-Regular",
              }}
            >
              <Text style={{ fontSize: 18, paddingTop: 20 }}>{"\u2022"}</Text>{" "}
              Equipments marked with as asterisk can aslo be booked without the
              associated service
            </Text>
          </View>
        </View>
      </ConfirmModal>
    </>
  );
}
