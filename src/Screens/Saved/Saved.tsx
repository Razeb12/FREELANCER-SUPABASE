import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../../components/CustomTextInput";
import NotFound from "./components/NotFound";
import SavedCard from "./components/SavedCard";
import { Profile } from "../../utils/types";
import { useUserStore } from "../../../Store/UserStore";

const Saved = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedUsers, setSavedUsers] = useState<any[]>([]);
  const user = useUserStore((state) => state.profile);
  const freelancers = useUserStore((state) => state.freelancers);
  const favData = useUserStore((state) => state.favorites);
  const reload = useUserStore((state) => state.reloadFavs);

  useEffect(() => {
    getSavedUsers();
  }, [reload]);

  const getSavedUsers = async () => {
    const favorites = favData.map((fav) => fav.freelancer_id);
    const savedFav = freelancers?.filter((freelancer) =>
      favorites?.includes(freelancer.uid)
    );
    setSavedUsers(savedFav);
  };

  const favorites = favData;
  const savedFav = freelancers?.filter((freelancer) =>
    favorites?.includes(freelancer.uid)
  );

  const groupByLocation = (users) => {
    return users?.reduce((acc, user) => {
      const key =
        user.location || "Unkown" ;
        (savedFav?.some((savedUser) => savedUser?.id === user.id)
          ? "Others"
          : null);
      if (key) {
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(user);
      }
      return acc;
    }, {});
  };

  const locations = groupByLocation(savedUsers);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F4F4" }}>
      <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 5,
            paddingHorizontal: 20,
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
            paddingHorizontal: 20,
            paddingVertical: 5,
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
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"large"} color={"#444444"} />
            </View>
          ) : (
            <>
              {savedUsers?.length > 0 ? (
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={getSavedUsers}
                    />
                  }
                >
                  {Object.entries(locations)
                    .filter(([location, users]) =>
                      location.toLowerCase().includes(search.toLowerCase())
                    )
                    .map(([location, users], idx) => (
                      <SavedCard
                        key={idx}
                        navigation={navigation}
                        location={{ location, users }}
                      />
                    ))}
                </ScrollView>
              ) : (
                <NotFound retry={getSavedUsers} />
              )}
            </>
          )}
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

export default memo(Saved);
