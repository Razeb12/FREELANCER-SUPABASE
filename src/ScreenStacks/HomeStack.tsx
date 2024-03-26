import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import ConfirmPay from "../Screens/ConfirmPay.js/ConfirmPay";
import FreelancerProfile from "../Screens/FreelancerProfile/FreelancerProfile";
import Locator from "../Screens/Locator/Locator";
import MapScreen from "../Screens/MapScreen/MapScreen";
import Review from "../Screens/Review/Review";
import PaymentMethod from "../Screens/ConfirmPay.js/paymentMethod";
import Booking from "../Screens/Booking/Booking";
import Chatting from "../Screens/Chatting/Chatting";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Locator"
        component={Locator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FreelancerProfile"
        component={FreelancerProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmPay"
        component={ConfirmPay}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="paymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking"
        component={Booking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
