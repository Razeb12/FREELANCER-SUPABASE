import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../Screens/Account/Account";
import EditProfile from "../Screens/Account/Profiles/EditProfile2/EditProfile";
import Availiability from "../Screens/Availability";
import FAQ from "../Screens/Help/FAQ";
import Help from "../Screens/Help/Help";
import Profile from "../Screens/Profile/Profile";
import Statistics from "../Screens/Statistics/Statistics";


// import EditProfile from "../screens/EditProfile/EditProfile";

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AvailabilityList"
        component={Availiability}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={Statistics}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
