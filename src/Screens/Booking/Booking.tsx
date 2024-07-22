import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomModal from "../../components/BottomModal";
import SliderIcon from "../../components/CustomIcons/SliderIcon";
import CustomTextInput from "../../components/CustomTextInput";
import FreelancerBooking from "./components/FreelancerBooking";
import UserBooking from "./components/UserBooking";
import Filter from "./panels/Filter";
import NotFound from "./panels/NotFound";

import RBSheet from "react-native-raw-bottom-sheet";
import { useUserStore } from "../../../Store/UserStore";
import { supabase } from "../../../lib/supabase";
const Booking = ({ navigation }: { navigation: any }) => {
  const [content, setContent] = useState("user");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshingFreelancer, setRefreshingFreelancer] = useState(false);
  const [refreshingUser, setRefreshingUser] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const profile = useUserStore((state) => state.profile);
  const [freelancers, setFreelancers] = useState<any>();
  const refRBSheet = useRef<RBSheet | null>(null);
  const loadNewData = useUserStore((state) => state.loading);

  const closeBottomModal = () => {
    refRBSheet.current?.close();
  };

  const openBottomModal = () => {
    refRBSheet.current?.open();
  };
  let status = {
    pending: 1,
    cancel: 2,
    completed: 3,
  };
  const [selectedSort, setSelectedSort] = useState("All");

  const handleSortChange = (sortValue: React.SetStateAction<string>) => {
    setSelectedSort(sortValue);
  };

  useEffect(() => {
    fetchFreelancers();
    fetchUsers();
  }, [selectedSort, content, loadNewData]);

  const fetchFreelancers = async () => {
    setLoading(true);

    const { data: bookedFreelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("bookingId", profile[0].uid)
      .order("id", { ascending: false })
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }
    let result = bookedFreelancers;
    if (selectedSort !== "All") {
      result = bookedFreelancers?.filter(
        (freelancer) => freelancer.status === selectedSort
      );
    }
    setFreelancers(result);
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data: freelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("freelancerId", profile[0].uid)
      .order("id", { ascending: false });
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }
    let result = freelancers;
    if (selectedSort !== "All") {
      result = freelancers.filter(
        (freelancer) => freelancer.status === selectedSort
      );
    }

    setUsers(result);
    setLoading(false);
  };

  const onRefresh = useCallback(() => {
    if (content === "user") {
      setRefreshingFreelancer(true);
      fetchFreelancers();
      setRefreshingFreelancer(false);
    } else {
      setRefreshingUser(true);
      fetchUsers();
      setRefreshingUser(false);
    }
    // bookingStore.updateSort([
    //   { value: "All", status: true },
    //   { value: "Pending", status: false },
    //   { value: "Upcoming", status: false },
    //   { value: "Completed", status: false },
    // ]);
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     if (content === "user") {
  //       fetchFreelancers();
  //     } else {
  //       fetchUsers();
  //     }
  //   }

  // }, [content]);
const sortedUsers = users.sort((a, b) => b.id - a.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 25,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Rubik-Regular",
              marginLeft: 20,
            }}
          >
            Bookings
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            borderBottomColor: "#CFCFCF",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                paddingVertical: 15,
                backgroundColor: content === "user" ? "#4BAF4F" : "transparent",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              onPress={() => setContent("user")}
            >
              <Text
                style={{
                  color: content === "user" ? "#fff" : "#767676",
                  fontSize: 12,
                }}
              >
                User Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 30,
                paddingVertical: 15,
                backgroundColor:
                  content === "freelancer" ? "#4BAF4F" : "transparent",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              onPress={() => setContent("freelancer")}
            >
              <Text
                style={{
                  color: content === "freelancer" ? "#fff" : "#767676",
                  fontFamily: "Rubik-Regular",
                  fontSize: 12,
                }}
              >
                Freelancer Profile
              </Text>
            </TouchableOpacity>
          </View>
          {/* CALENDAR ICON */}
          <MaterialCommunityIcons
            name="calendar-outline"
            size={24}
            color="#949494"
            onPress={() => navigation.navigate("Calendar", { type: content })}
          />
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <CustomTextInput
            placeholder={"Search"}
            style={{
              width: "90%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 14,
              elevation: 5,
              borderRadius: 10,
              // marginTop: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              backgroundColor: "#fff",
            }}
            value={search}
            setValue={(text) => setSearch(text)}
          />
          <SliderIcon onPress={() => openBottomModal()} />
        </View>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : content === "user" ? (
          <>
            {freelancers?.length > 0 ? (
              <FlatList
                data={freelancers?.filter((item: { fullname: any }) => {
                  return `${item?.fullname}`
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })}
                renderItem={({ item }) => (
                  <UserBooking
                    item={item}
                    navigation={navigation}
                    setData={setFreelancers}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  paddingBottom: 30,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingFreelancer}
                    onRefresh={onRefresh}
                  />
                }
              />
            ) : (
              <NotFound />
            )}
          </>
        ) : (
          <>
            {users?.length > 0 ? (
              <FlatList
                data={users.filter((item) => {
                  return `${item?.fullname}`
                    .toLowerCase()
                    .includes(search.toLowerCase());
                })}
                renderItem={({ item }) => (
                  <FreelancerBooking item={item} navigation={navigation} />
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  paddingBottom: 30,
                  // backgroundColor: "red",
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshingUser}
                    onRefresh={onRefresh}
                  />
                }
              />
            ) : (
              <NotFound />
            )}
          </>
        )}
        <BottomModal
          refRBSheet={refRBSheet}
          dragClose={true}
          keyboardAvoidingViewEnabled={false}
          height={320}
        >
          <Filter
            close={() => closeBottomModal()}
            setFreelancers={setFreelancers}
            setUsers={setUsers}
            content={content}
            onSortChange={handleSortChange}
          />
        </BottomModal>
      </Pressable>
    </SafeAreaView>
  );
};

export default memo(Booking);
