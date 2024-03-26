import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import Availability from "../Screens/Availability";
import Booking from "../Screens/Booking/Booking";
import ConfirmPay from "../Screens/ConfirmPay.js/ConfirmPay";
import FreelancerProfile from "../Screens/FreelancerProfile/FreelancerProfile";
import MapScreen from "../Screens/MapScreen/MapScreen";
import Review from "../Screens/Review/Review";
import PaymentMethod from "../Screens/ConfirmPay.js/paymentMethod";
import Calendar from "../Screens/Calendar";

const Stack = createNativeStackNavigator();
const BookingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Booking">
      <Stack.Screen
        name="Booking"
        component={Booking}
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
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SetAvailability"
        component={Availability}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="paymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default BookingStack;
