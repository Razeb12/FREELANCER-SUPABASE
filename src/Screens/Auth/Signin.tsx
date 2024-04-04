import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { validateEmail, validatePassword } from "../../utils/Validation";
import CustomTextInput from "../../components/CustomTextInput";
import { supabase } from "../../../lib/supabase";
import { useUserStore } from "../../../Store/UserStore";

export default function Signin(props: {
  closeBottomModal: () => void;
  switchToSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const [passwordActive, setPasswordActive] = useState(false);
  const signInUser = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setLoading(false);
    } else {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select(
          "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Bookings(*), Reviews(*)"
        )
        .eq("uid", data?.user?.user_metadata.sub);
      const { data: profiles, error: err } = await supabase
        .from("profiles")
        .select(
          "*, Skills(*), Equipments(*), Favorites(*), Gallery(*), Bookings(*), Reviews(*)"
        )
        .neq("uid", data?.user?.user_metadata.sub);

      if (error) {
        console.error("Error fetching", error);
      } else {
        useUserStore.getState().setFreelancers(profiles);
        useUserStore.getState().setUser(data?.user.user_metadata);
        useUserStore.getState().setProfile(profile);
        useUserStore.getState().setFavorites(profile[0].Favorites);
        useUserStore.getState().setImage(profile[0].profilePhoto);
       
        props.closeBottomModal();
        setLoading(false);
      }
    }
  };

  const validate = async () => {
    if (email === "") {
      Toast.show({
        type: "error",
        text1: "Email address is required",
      });
    } else if (!validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Email address is not valid",
      });
    } else if (password === "") {
      Toast.show({
        type: "error",
        text1: "Password is required",
      });
    } else if (!validatePassword(password)) {
      Toast.show({
        type: "error",
        text1: "Password is not valid",
        text2: "Password must be at least 8 characters long",
      });
    } else {
      setLoading(true);
      //   let value = await signin({
      //     email: email.toLowerCase(),
      //     password: password,
      //   });

      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F2F2F2",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "400" }}></Text>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={props.closeBottomModal}
        />
      </View>
      <Text
        style={{
          fontFamily: "Rubik-Regular",
          paddingHorizontal: 20,
          paddingVertical: 20,
          fontSize: 22,
        }}
      >
        Login
      </Text>
      <Text
        style={{
          fontFamily: "Rubik-Regular",
          paddingHorizontal: 20,
          paddingBottom: 30,
          fontSize: 14,
          color: "#565656",
        }}
      >
        Please enter your registration email and password.
      </Text>
      <CustomTextInput
        placeholder={"Email or username"}
        style={{
          width: "90%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 15,
          elevation: 5,
          borderRadius: 10,
          marginTop: 10,
          marginLeft: "5%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          backgroundColor: "#fff",
        }}
        value={email}
        setValue={(text: React.SetStateAction<string>) => setEmail(text)}
        keyboardType="email-address"
      />
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          backgroundColor: "#fff",
          marginTop: 20,
          marginLeft: "5%",
          borderRadius: 10,
          elevation: 5,
          borderWidth: passwordActive ? 1 : 0,
          borderColor: passwordActive ? "#4BAF4F" : undefined,
        }}
      >
        <CustomTextInput
          placeholder={"Password"}
          style={{
            width: "80%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: "#fff",
          }}
          value={password}
          setValue={(text: React.SetStateAction<string>) => setPassword(text)}
          onFocus={() => setPasswordActive(true)}
          onBlur={() => setPasswordActive(false)}
          secureTextEntry={!visible}
        />
        <View
          style={{
            width: "20%",
            height: 35,
            backgroundColor: "#fff",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={visible ? "eye-off" : "eye"}
            size={24}
            color="black"
            onPress={() => setVisible(!visible)}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          paddingRight: 20,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity>
          <Text
            style={{
              color: "#4BAF4F",
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
          >
            Forgot Password
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color={"#4BAF4F"} size={"small"} />
        ) : (
          <TouchableOpacity
            onPress={signInUser}
            style={{
              backgroundColor: "#4BAF4F",
              width: "100%",
              borderRadius: 10,
              marginBottom: 30,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Rubik-Regular",
                color: "#fff",
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1 }} />
      {/* <TouchableOpacity
        style={{ marginLeft: 20, marginBottom: 15 }}
        onPress={props.switchToSignup}
      >
        <Text
          style={{
            color: "#4BAF4F",
            fontSize: 16,
            fontFamily: "Rubik-Regular",
          }}
        >
          Sign Up
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={{ marginLeft: 20, marginBottom: 20 }}
        onPress={props.switchToSignup}
      >
        <Text
          style={{
            color: "#4BAF4F",
            fontSize: 16,
            fontFamily: "Rubik-Regular",
          }}
        >
          Become a freelancer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
