import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ConfirmPay from "../Screens/ConfirmPay.js/ConfirmPay";
import FreelancerProfile from "../Screens/FreelancerProfile/FreelancerProfile";
import MapScreen from "../Screens/MapScreen/MapScreen";
import Review from "../Screens/Review/Review";
import Saved from "../Screens/Saved/Saved";
import SavedLocation from "../Screens/SavedLocation/SavedLocation";
import Calendar from "../Screens/Calendar";

const Stack = createNativeStackNavigator();

const SavedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Saved">
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SavedLocation"
        component={SavedLocation}
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
        name="Calendar"
        component={Calendar}
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
    </Stack.Navigator>
  );
};

export default SavedStack;
