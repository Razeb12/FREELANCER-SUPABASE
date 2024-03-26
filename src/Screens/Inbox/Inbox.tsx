import React, { memo, useEffect, useState } from "react";
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
// import Toast from "react-native-toast-message";

import CustomTextInput from "../../components/CustomTextInput";
import ChatCard from "./components/ChatCard";
import NotFound from "./components/NotFound";
import { useUserStore } from "../../../Store/UserStore";
import { supabase } from "../../../lib/supabase";

const Inbox = ({ navigation }: { navigation: string }) => {
  const [content, setContent] = useState("user");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const profile = useUserStore((state) => state.profile);
  const freelancers = useUserStore((state) => state.freelancers);
  const [freelancer, setFreelancer] = useState([]);
  const [dataToFetch, setDataToFetch] = useState([]);

  useEffect(() => {
    fetchBookingsForUser();
    fetchBookingsForFreelancer();
    setDataToFetch(content === "user" ? friends : freelancer);
  }, [content]);

  const fetchBookingsForUser = async () => {
    setLoading(true);
    const { data: freelance, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("bookingId", profile[0].uid);
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    } else {
      const newFreelancersArray = freelance.map((freelancer) => {
        const freelancerData = freelancers?.find(
          (data) => data.uid === freelancer.freelancerId
        );

        return {
          ...freelancer,
          ...freelancerData,
        };
      });
      const uniqueFreelancersArray = newFreelancersArray.filter(
        (freelancer, index, self) =>
          index ===
          self.findIndex((t) => t.bookingName === freelancer.bookingName)
      );

      setFriends(uniqueFreelancersArray);
    }

    setLoading(false);
  };
  const fetchBookingsForFreelancer = async () => {
    setLoading(true);
    const { data: freelance, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("freelancerId", profile[0].uid);

    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    } else {
      const newFreelancersArray = freelance.map((freelancer) => {
        const freelancerData = freelancers?.find(
          (data) => data.uid === freelancer.freelancerId
        );

        return {
          ...freelancer,
          ...freelancerData,
        };
      });

      const uniqueFreelancersArray = newFreelancersArray.filter(
        (freelancer, index, self) =>
          index ===
          self.findIndex((t) => t.bookingName === freelancer.bookingName)
      );

      setFreelancer(uniqueFreelancersArray);
    }
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookingsForUser();
    fetchBookingsForFreelancer();
    setRefreshing(false);
  };

  console.log(dataToFetch);

  // Now, searchResults will contain the filtered data

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 25,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontFamily: "Rubik-Regular" }}>
            Inbox
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
                paddingHorizontal: 50,
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
                User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 40,
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
                Freelancer
              </Text>
            </TouchableOpacity>
          </View>
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
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 14,
              elevation: 5,
              borderRadius: 10,
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
            setValue={(text) => {
              setSearch(text);
              const searchResults = dataToFetch?.filter((freelancer) => {
                const fullName = `${freelancer?.fullname}`;
                return fullName.toLowerCase().includes(text.toLowerCase());
              });
              setFreelancer(searchResults);
            }}
          />
        </View>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <ActivityIndicator size={"large"} color="#D6D6D6" />
          </View>
        ) : (
          <>
            {dataToFetch?.length === 0 ? (
              <NotFound
                onPress={
                  content === "user"
                    ? fetchBookingsForUser
                    : fetchBookingsForFreelancer
                }
              />
            ) : (
              <>
                <FlatList
                  data={dataToFetch?.filter((item: { fullname: any }) => {
                    return `${item?.fullname}`
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <ChatCard
                      item={item}
                      navigation={navigation}
                      content={content}
                    />
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              </>
            )}
          </>
        )}
      </Pressable>
    </SafeAreaView>
  );
};
export default memo(Inbox);
