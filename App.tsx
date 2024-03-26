import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import React, { JSX, useCallback, useEffect, useState } from "react";
import { Dimensions, Platform, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import "react-native-url-polyfill/auto";
import { useUserStore } from "./Store/UserStore";
import { supabase } from "./lib/supabase";
import BookingStack from "./src/ScreenStacks/BookingStack";
import HomeStack from "./src/ScreenStacks/HomeStack";
import InboxStack from "./src/ScreenStacks/InboxStack";
import ProfileStack from "./src/ScreenStacks/ProfileStack";
import SavedStack from "./src/ScreenStacks/SavedStack";
import BookingFilled from "./src/components/CustomIcons/BookingFilled";
import BookingOutlined from "./src/components/CustomIcons/BookingOutlined";
import ProfileFilled from "./src/components/CustomIcons/ProfileFilled";
import ProfileOutlined from "./src/components/CustomIcons/ProfileOutlined";
import SearchFilled from "./src/components/CustomIcons/SearchFilled";
import { color as text } from "./src/utils/color";

export default function App() {
  const user = useUserStore((state) => state.user);
  const loading = useUserStore((state) => state.loading);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user.user_metadata) {
        useUserStore.getState().setUser(session?.user.user_metadata);
        const { data: freelancers, error: err } = await supabase
          .from("profiles")
          .select(
            "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Reviews(*)"
          )
          .neq("uid", session?.user.user_metadata?.sub);
        if (err) {
          console.log(err);
        }
        const { data, error } = await supabase
          .from("profiles")
          .select(
            "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Bookings(*), Reviews(*)"
          )
          .eq("uid", session?.user.user_metadata.sub);

        if (error) {
          console.error("Error fetching", error);
        } else {
          useUserStore.getState().setProfile(data);
          // data[0].Reviews = Reviews;
          useUserStore.getState().setFreelancers(freelancers);

          useUserStore.getState().setFavorites(data[0].Favorites);
          useUserStore.getState().setImage(data[0].profilePhoto);
          // useUserStore.getState().setCards(Cards);
        }
      } else {
        const { data: freelancers, error: err } = await supabase
          .from("profiles")
          .select(
            "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Reviews(*)"
          );
        // .neq("uid", user?.user.user_metadata.sub);
        if (err) {
          console.log(err);
        }
        useUserStore.getState().setFreelancers(freelancers);
      }

      useUserStore.getState().setUser(session?.user.user_metadata);
    });
  }, [loading]);

  let [fontsLoaded] = useFonts({
    "Rubik-Black": require("./assets/fonts/static/Rubik-Black.ttf"),
    "Rubik-BlackItalic": require("./assets/fonts/static/Rubik-BlackItalic.ttf"),
    "Rubik-Bold": require("./assets/fonts/static/Rubik-Bold.ttf"),
    "Rubik-BoldItalic": require("./assets/fonts/static/Rubik-BoldItalic.ttf"),
    "Rubik-ExtraBold": require("./assets/fonts/static/Rubik-ExtraBold.ttf"),
    "Rubik-ExtraBoldItalic": require("./assets/fonts/static/Rubik-ExtraBoldItalic.ttf"),
    "Rubik-Italic": require("./assets/fonts/static/Rubik-Italic.ttf"),
    "Rubik-Light": require("./assets/fonts/static/Rubik-Light.ttf"),
    "Rubik-LightItalic": require("./assets/fonts/static/Rubik-LightItalic.ttf"),
    "Rubik-Medium": require("./assets/fonts/static/Rubik-Medium.ttf"),
    "Rubik-MediumItalic": require("./assets/fonts/static/Rubik-MediumItalic.ttf"),
    "Rubik-Regular": require("./assets/fonts/static/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("./assets/fonts/static/Rubik-SemiBold.ttf"),
    "Rubik-SemiBoldItalic": require("./assets/fonts/static/Rubik-SemiBoldItalic.ttf"),
  });
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#4BAF4F",
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          fontFamily: "Rubik-Regular",
          color: "#000",
        }}
        text2Style={{ fontSize: 12, fontFamily: "Rubik-Regular" }}
      />
    ),
    error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "red",
          backgroundColor: "#fff",
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: "400",
          color: "#000",
          fontFamily: "Rubik-Regular",
        }}
        text2Style={{
          fontSize: 12,
          fontFamily: "Rubik-Regular",
        }}
      />
    ),
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  const Tab = createBottomTabNavigator();
  return (
    <>
      <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={"HomeStack"}
            screenOptions={({ route }) => ({
              tabBarHideOnKeyboard: Platform.OS === "android" ? true : false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "HomeStack") {
                  if (focused) {
                    return <SearchFilled />;
                  } else {
                    return (
                      <AntDesign name="search1" size={size} color={color} />
                    );
                  }
                } else if (route.name === "SavedStack") {
                  iconName = focused ? "heart" : "heart";
                  return (
                    <FontAwesome5
                      name={iconName as "heart" | "heart"}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === "BookingStack") {
                  if (focused) {
                    return <BookingFilled />;
                  } else {
                    return <BookingOutlined />;
                  }
                } else if (route.name === "InboxStack") {
                  iconName = focused ? "chatbox-outline" : "chatbox-outline";
                  return (
                    <Ionicons
                      name={iconName as "chatbox" | "chatbox-outline"}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === "ProfileStack") {
                  if (focused) {
                    return <ProfileFilled />;
                  } else {
                    return <ProfileOutlined />;
                  }
                }
              },
              tabBarActiveTintColor: text.primary,
              tabBarStyle: {
                height: 64,
                paddingBottom:
                  Platform.OS === "ios"
                    ? Dimensions.get("window").scale * 6
                    : Dimensions.get("window").scale * 3,
              },
              tabBarLabel: ({ focused }) => {
                let color;
                const style = {
                  fontSize: 13,
                  fontFamily: focused ? "Rubik-Medium" : "Rubik-Regular",
                  color: focused ? "#000" : text.inActiveTab,
                };
                if (route.name === "HomeStack") {
                  return <Text style={{ ...style }}>Explore</Text>;
                } else if (route.name === "SavedStack") {
                  return <Text style={{ ...style }}>Saved</Text>;
                } else if (route.name === "BookingStack") {
                  color = focused ? "#000" : text.inActiveTab;
                  return <Text style={{ ...style, color }}>Bookings</Text>;
                } else if (route.name === "InboxStack") {
                  color = focused ? "#000" : text.inActiveTab;
                  return <Text style={{ ...style, color }}>Inbox</Text>;
                } else if (route.name === "ProfileStack") {
                  color = focused ? "#000" : text.inActiveTab;
                  return <Text style={{ ...style, color }}>Profile</Text>;
                }
              },
            })}
          >
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                headerShown: false,
              }}
            />
            <Tab.Screen
              name="SavedStack"
              component={SavedStack}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  if (!user) {
                    e.preventDefault();
                    navigation.navigate("ProfileStack");
                    Toast.show({
                      type: "error",
                      text1: "Please login to continue",
                    });
                  }
                },
              })}
            />
            <Tab.Screen
              name="BookingStack"
              component={BookingStack}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  if (!user) {
                    e.preventDefault();
                    navigation.navigate("ProfileStack");
                    Toast.show({
                      type: "error",
                      text1: "Please login to continue",
                    });
                  }
                },
              })}
            />
            <Tab.Screen
              name="InboxStack"
              component={InboxStack}
              options={{
                headerShown: false,
                unmountOnBlur: true,
              }}
              listeners={({ navigation }) => ({
                tabPress: (e) => {
                  if (!user) {
                    e.preventDefault();
                    navigation.navigate("ProfileStack");
                    Toast.show({
                      type: "error",
                      text1: "Please login to continue",
                    });
                  }
                },
              })}
            />
            <Tab.Screen
              name="ProfileStack"
              component={ProfileStack}
              options={{
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}
