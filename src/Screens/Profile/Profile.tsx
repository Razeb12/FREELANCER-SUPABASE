import { Feather } from "@expo/vector-icons";

import React, { useRef, useState } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import BottomModal from "../../components/BottomModal";
import CardIcon from "../../components/CustomIcons/CardIcon";
import HelpIcon from "../../components/CustomIcons/HelpIcon";
import StatisticsIcon from "../../components/CustomIcons/StatisticsIcon";
import UserIcon from "../../components/CustomIcons/UserIcon";
import { useUserStore } from "../../../Store/UserStore";
import Signup from "../Auth/Signup";
import Signin from "../Auth/Signin";
import { supabase } from "../../../lib/supabase";

export default function Profile({ navigation }: { navigation: any }) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const refRBSheet = useRef<RBSheet | null>(null);
  const img = useUserStore((state) => state.image);
  const closeBottomModal = () => {
    refRBSheet.current?.close();
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      const { data: freelancers, error: err } = await supabase
        .from("profiles")
        .select(
          "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Reviews(*)"
        );

      if (err) {
        console.log(err);
      }
      useUserStore.getState().setFreelancers(freelancers);
      useUserStore.getState().setUser(null);
      useUserStore.getState().setProfile(null);
      useUserStore.getState().setGallery(null);
      useUserStore.getState().setCards(null);
      useUserStore.getState().setImage(null);
      useUserStore.getState().setFavorites(null);
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FBFBFBE5",
        paddingTop:
          Platform.OS === "android" ? StatusBar.currentHeight : undefined,
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          width: "100%",
          //   backgroundColor: "red",
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            key={img}
            source={img ? { uri: img } : require("../../../assets/user.png")}
            style={{
              backgroundColor: "#6C6C6C",
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
            }}
            resizeMode="cover"
          />
          {user ? (
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                marginLeft: 10,
                fontSize: 18,
              }}
            >
              {user.fullName}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                marginLeft: 10,
                fontSize: 18,
              }}
            >
              Guest
            </Text>
          )}
        </View>
        {/* <Ionicons name="notifications" size={27} color="#6C6C6C" /> */}
      </View>

      {!user ? (
        <View
          style={{
            width: "90%",
            marginHorizontal: "5%",
            marginTop: 10,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            borderRadius: 10,
            backgroundColor: "transparent",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",

              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => {
              setAuthMode("signin");
              refRBSheet.current?.open();
            }}
          >
            <Feather name="log-in" size={24} color="#454545" />
            <Text
              style={{
                marginLeft: 15,
                color: "#454545",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopWidth: 1,
              borderTopColor: "#EFEFEF",
            }}
            onPress={() => {
              setAuthMode("signup");
              refRBSheet.current?.open();
            }}
          >
            <Feather name="plus-circle" size={24} color="#454545" />
            <Text
              style={{
                marginLeft: 15,
                color: "#454545",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
              }}
            >
              Become a freelancer
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              marginTop: 10,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              borderRadius: 10,
              backgroundColor: "transparent",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Account")}
              style={{
                width: "100%",
                paddingVertical: 13,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            >
              <UserIcon />
              <Text
                style={{
                  marginLeft: 15,
                  color: "#454545",
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                My Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 13,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderTopWidth: 1,
                borderTopColor: "#EFEFEF",
              }}
              //   onPress={() => navigation.navigate("Payment")}
            >
              <CardIcon />
              <Text
                style={{
                  marginLeft: 15,
                  color: "#454545",
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Payment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 13,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderTopWidth: 1,
                borderTopColor: "#EFEFEF",
              }}
              onPress={() => navigation.navigate("Statistics")}
            >
              <StatisticsIcon />
              <Text
                style={{
                  marginLeft: 15,
                  color: "#454545",
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Statistics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 13,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopWidth: 1,
                borderTopColor: "#EFEFEF",
              }}
              onPress={() => navigation.navigate("Help")}
            >
              <HelpIcon />
              <Text
                style={{
                  marginLeft: 15,
                  color: "#454545",
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                Help
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} />
          <View
            style={{
              width: "90%",
              marginHorizontal: "5%",
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.05,
              shadowRadius: 3,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "transparent",
              marginBottom: 30,
            }}
          >
            <TouchableOpacity
              style={{
                width: "100%",
                paddingVertical: 15,
                paddingHorizontal: 20,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fff",
                borderRadius: 10,
                justifyContent: "center",
              }}
              onPress={signOut}
            >
              {/* <Feather name="log-out" size={24} color="#454545" /> */}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                  color: "#D61717",
                }}
              >
                Sign out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <BottomModal refRBSheet={refRBSheet} dragClose={true}>
        {authMode === "signin" ? (
          <Signin
            closeBottomModal={closeBottomModal}
            switchToSignup={() => setAuthMode("signup")}
          />
        ) : (
          <Signup
            closeBottomModal={closeBottomModal}
            switchToSignin={() => setAuthMode("signin")}
          />
        )}
      </BottomModal>
    </SafeAreaView>
  );
}
