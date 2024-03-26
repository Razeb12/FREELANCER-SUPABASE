import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../components/Button";

import Details from "./sections/Details";
import Rates from "./sections/Rates";
import Category from "./sections/Category";
import Equipment from "./sections/Equipment";
import Toast from "react-native-toast-message";
import { useUserStore } from "../../../../../Store/UserStore";
import { supabase } from "../../../../../lib/supabase";

const EditProfile = ({ navigation }: { navigation: any }) => {
  const profile = useUserStore((state) => state.profile);
  const [details, setDetails] = useState({
    location: (profile[0] && profile[0].location) || "",
    description: (profile[0] && profile[0].bio) || "",
    igUserName: (profile[0] && profile[0].social) || "",
    city: (profile[0] && profile[0].city) || "",
    lat: (profile[0] && profile[0].lat) || "",
    lng: (profile[0] && profile[0].lng) || "",
  });

  const [loading, setLoading] = useState(false);
  const updateBioAndSocial = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({
        bio: details.description,
        social: details.igUserName,
        location: details.location,
        city: details.city,
        lat: details.lat,
        lng: details.lng,
      })
      .eq("uid", profile[0].uid)
      .select();
    if (error) {
      setLoading(false);
      console.log(error);
    } else {
      setLoading(false);
      useUserStore.setState({ profile: data });
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            paddingTop: 20,
            paddingBottom: 25,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={27}
            color="black"
            onPress={() => navigation.pop()}
          />
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Rubik-Regular",
              marginLeft: 20,
            }}
          >
            Edit Profile
          </Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <ScrollView keyboardShouldPersistTaps="always">
            <Details details={details} setDetails={setDetails} />
          </ScrollView>

          <Rates />
          <Category />
          <Equipment />
          <View
            style={{
              width: "90%",
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              marginHorizontal: "5%",
              marginBottom: 30,
            }}
          >
            {loading ? (
              <ActivityIndicator size={"small"} color="#4BAF4F" />
            ) : (
              <TouchableOpacity
                style={{
                  width: "100%",
                  // paddingHorizontal: 20,
                  marginTop: 0,
                }}
                onPress={updateBioAndSocial}
              >
                <Button
                  text={"Update"}
                  buttonStyle={{
                    backgroundColor: "#4BAF4F",
                    borderRadius: 10,
                  }}
                  textStyle={{}}
                  icon={<></>}
                  position={""}
                />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;
