//@ts-nocheck

import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useUserStore } from "../../../../Store/UserStore";
import { supabase } from "../../../../lib/supabase";
import EditableTextInput from "../../../components/EditableTextInput";

export default function UserProfile(props: {}) {
  const profile = useUserStore((state) => state.profile);
  const url = useUserStore((state) => state.profile);
  const img = useUserStore((state) => state.image);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [hasGalleryPermission, setHasGalleryPermission] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);
  const [email, setEmail] = useState<string>("");
  const [first, setFirst] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { image, setImage } = useUserStore();
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    if (profile[0]) {
      setFirst(true);
      setFirstName(profile[0].firstname);
      setLastName(profile[0].lastname);
      setPhoneNo(profile[0].phonenumber);
      setEmail(profile[0].email);
    }
  }, [profile]);

  const updateUserDetails = async () => {
    const displayName = `${firstName} ${lastName}`;
  };

  const pickImage = async () => {
    try {
      setImageLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }
      const fileSizeInMB = result.assets[0].fileSize / (1024 * 1024);
      if (fileSizeInMB > 3) {
        Toast.show({
          type: "error",
          text1: "Please select a file smaller than 3MB.",
        });
        setImageLoading(false);
        return;
      }
      const image = result.assets[0];
      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${profile[0].uid}/${profile[0].uid}.${fileExt}`;
      setImage(null);
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
          upsert: true,
        });

      if (uploadError) {
        console.log(uploadError, "error");
        throw uploadError;
      }
      const { data: downloadUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path);

      const { data: profileData, error } = await supabase
        .from("profiles")
        .update({ profilePhoto: downloadUrl.publicUrl })
        .eq("uid", profile[0].uid)
        .select();

      if (error) {
        console.log(error);
        return;
      }
      Toast.show({
        type: "success",
        text1: "Profile photo updated successfully!",
      });

      setImage(downloadUrl.publicUrl);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <View>
      <View style={{ height: 20 }} />
      <View
        style={{
          marginHorizontal: "5%",
          width: "90%",
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          borderRadius: 10,
        }}
      >
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{ width: 70, height: 70, borderRadius: 70 / 2 }}
            onPress={pickImage}
          >
            <Image
              key={imageLoading}
              source={
                image ? { uri: image } : require("../../../../assets/user.png")
              }
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 70 / 2,
                borderColor: "#4BAF4F",
                borderWidth: 3,
                // padding: 10,
              }}
            />
            {imageLoading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0000006B",
                  borderRadius: 70 / 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"small"} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <EditableTextInput
          label="First Name"
          value={firstName}
          setValue={(text: React.SetStateAction<string>) => setFirstName(text)}
        />
        <EditableTextInput
          label="Last Name"
          value={lastName}
          setValue={(text: React.SetStateAction<string>) => setLastName(text)}
        />
        <Text
          style={{
            fontSize: 14,
            fontFamily: "Rubik-Regular",
            color: "#9E9E9E",
          }}
        >
          Email Address
        </Text>
        <View
          style={{
            borderBottomColor: "#D9D9D9",
            borderBottomWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TextInput
            style={{
              paddingVertical: 10,
              fontFamily: "Rubik-Regular",
              fontSize: 14,
              width: "100%",
              backgroundColor: "#fff",
              color: "#D9D9D9",
            }}
            value={email}
            editable={false}
          />
        </View>
        <EditableTextInput
          label="Phone Number"
          value={phoneNo}
          setValue={(text: any) => setPhoneNo(text)}
        />
      </View>
      {changePasswordLoading ? (
        <ActivityIndicator
          size={"small"}
          color={"#4BAF4F"}
          style={{ marginVertical: 10 }}
        />
      ) : (
        <TouchableOpacity style={{ paddingVertical: 20, marginHorizontal: 20 }}>
          <Text style={{ color: "#4BAF4F" }}>Change Password</Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <ActivityIndicator size={"small"} color="#4BAF4F" />
        ) : (
          <TouchableOpacity style={{ width: "100%" }}></TouchableOpacity>
        )}
      </View>
      {/* <BottomModal
        dragClose={false}
        height={Dimensions.get("window").height - 200}
        refRBSheet={ref}
      >
        <ChangePassword close={() => ref.current.close()} />
      </BottomModal> */}
    </View>
  );
}
