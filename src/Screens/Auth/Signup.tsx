import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import CustomTextInput from "../../components/CustomTextInput";
import { supabase } from "../../../lib/supabase";
import { useUserStore } from "../../../Store/UserStore";
export default function Signup(props: {
  closeBottomModal: () => void;
  switchToSignin: () => void;
}) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordActive, setPasswordActive] = useState<boolean>(false);
  const [confirmPasswordActive, setConfirmPasswordActive] =
    useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const loadings = useUserStore((state) => state.loading);
  const createProfile = async (response: any) => {
    if (response.user) {
    }
  };
  const userRegisteration = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          fullName: `${firstName} ${lastName}`,
          email: email,
        },
      },
    });


    if (error) {
      Toast.show({
        type: "error",
        text1: error.message as any,
      });
      setLoading(false);
      useUserStore.getState().setLoading(!loadings);
    } else {
      props.closeBottomModal();
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
      <ScrollView style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            paddingHorizontal: 20,
            paddingVertical: 20,
            fontSize: 22,
          }}
        >
          Sign up
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <CustomTextInput
          placeholder={"First Name"}
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
            marginBottom: 15,
          }}
          value={firstName}
          setValue={(text: React.SetStateAction<string>) => setFirstName(text)}
        />
        <CustomTextInput
          placeholder={"Last Name"}
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
            marginBottom: 15,
          }}
          value={lastName}
          setValue={(text: React.SetStateAction<string>) => setLastName(text)}
        />
        <CustomTextInput
          placeholder={"Email"}
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
            marginBottom: 15,
          }}
          value={email}
          setValue={(text: React.SetStateAction<string>) => setEmail(text)}
          keyboardType="email-address"
        />
        <CustomTextInput
          placeholder={"Phone Number"}
          style={{
            width: "90%",
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            elevation: 2,
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
            marginBottom: 15,
          }}
          value={phone}
          setValue={(text: React.SetStateAction<string>) => setPhone(text)}
          keyboardType="numeric"
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
            marginTop: 10,
            marginLeft: "5%",
            borderRadius: 10,
            elevation: 2,
            borderWidth: passwordActive ? 1 : 0,
            borderColor: passwordActive ? "#4BAF4F" : "",
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
            onBlur={() => setPasswordActive(false)}
            onFocus={() => setPasswordActive(true)}
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
            elevation: 2,
            borderWidth: confirmPasswordActive ? 1 : 0,
            borderColor: confirmPasswordActive ? "#4BAF4F" : "",
          }}
        >
          <CustomTextInput
            placeholder={"Confirm Password"}
            style={{
              width: "80%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 15,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
              backgroundColor: "#fff",
            }}
            value={confirmPassword}
            setValue={(text: React.SetStateAction<string>) =>
              setConfirmPassword(text)
            }
            onBlur={() => setConfirmPasswordActive(false)}
            onFocus={() => setConfirmPasswordActive(true)}
            secureTextEntry={!confirmVisible}
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
              name={confirmVisible ? "eye-off" : "eye"}
              size={24}
              color="black"
              onPress={() => setConfirmVisible(!confirmVisible)}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color={"#4BAF4F"} size={"small"} />
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#4BAF4F",
                width: "100%",
                borderRadius: 10,
                marginBottom: 30,
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
              onPress={userRegisteration}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "Rubik-Regular",
                  color: "#fff",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 22,
            paddingRight: 20,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Checkbox
            style={{ margin: 8, backgroundColor: "#fff" }}
            value={isChecked}
            onValueChange={setChecked}
            color={"#009C52"}
          />
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            I accept the Terms and Conditions and Privacy and Cookie Notice
          </Text>
        </View>
        <Text
          style={{
            color: "#000",
            fontFamily: "Rubik-Regular",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Already have an account?
        </Text>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 30,
          }}
        >
          <TouchableOpacity onPress={props.switchToSignin}>
            <Text
              style={{
                color: "#4BAF4F",
                fontSize: 14,
                fontFamily: "Rubik-Regular",
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
