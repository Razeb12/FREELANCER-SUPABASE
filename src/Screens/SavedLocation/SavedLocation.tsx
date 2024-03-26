import { Ionicons } from "@expo/vector-icons";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomTextInput from "../../components/CustomTextInput";
import { Profile } from "../../utils/types";
import FreelancerCard from "../Locator/components/FreelancerCard";
import { useUserStore } from "../../../Store/UserStore";

const SavedLocation = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [search, setSearch] = useState("");
  const [savedUsers, setSavedUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.profile);
  const freelancers = useUserStore((state) => state.freelancers);
  const favData = useUserStore((state) => state.favorites);
  useEffect(() => {
    getSavedUsers();
  }, [favData.length]);

  const getSavedUsers = async () => {
    const favorites = favData.map((fav) => fav.freelancer_id);
    let savedFav;
    if (route.params.city) {
      savedFav = freelancers?.filter(
        (freelancer) => freelancer?.location === route.params.city
      );
    } else {
      savedFav = freelancers?.filter(
        (freelancer) =>
          !freelancer?.location && favorites?.includes(freelancer.id)
      );
    }
    setSavedUsers(savedFav);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 5,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontFamily: "Rubik-Regular" }}>
            Saved
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 15,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color="#000"
            onPress={() => navigation.pop()}
          />
          <CustomTextInput
            placeholder={"Search"}
            style={{
              width: "87%",
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
              shadowOpacity: 0.05,
              shadowRadius: 3,
              backgroundColor: "#fff",
            }}
            value={search}
            setValue={(text) => setSearch(text)}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rubik-Regular",
            paddingHorizontal: 15,
            marginBottom: 10,
          }}
        >
          {route.params?.city}
        </Text>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color="#444444" />
          ) : (
            <FlatList
              data={savedUsers.filter((item) =>
                `${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`.includes(
                  search.toLowerCase()
                )
              )}
              renderItem={({ item }) => (
                <FreelancerCard item={item} navigation={navigation} />
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              style={{
                width: "100%",
              }}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={getSavedUsers}
                />
              }
            />
          )}
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default memo(SavedLocation);
