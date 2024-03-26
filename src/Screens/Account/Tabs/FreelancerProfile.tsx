//@ts-nocheck

import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FreelancerPictureCarousel from "../../../components/FreelancerPictureCarousel";
import Toast from "react-native-toast-message";

import ReviewCard from "../../../components/ReviewCard";
import { useUserStore } from "../../../../Store/UserStore";
import { supabase } from "../../../../lib/supabase";
import { ScrollView } from "react-native-gesture-handler";

const FreelancerProfile = ({ navigation }: { navigation: any }) => {
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState<string>("");
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const screenWidth = Dimensions.get("window").width;
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

      // const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${profile[0].uid}/gallery/${image.fileName}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        console.log(uploadError, "error");
        throw uploadError;
      }
      const { data: downloadUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path);

      const { data: galleryData, error } = await supabase
        .from("Gallery")
        .insert({
          url: downloadUrl.publicUrl,
          name: `${image.fileName}.${fileExt}`,
        })
        .select();

      if (error) {
        console.log(error);
      }
      const updatedProfile = {
        ...profile[0],
        Gallery: [...profile[0].Gallery, ...galleryData],
      };
      useUserStore.getState().setProfile([updatedProfile]);
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

  if (loading) {
    return (
      <View
        style={{
          height: Dimensions.get("window").height - 190,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color="#D8D8D8" />
      </View>
    );
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 20 }} />
      <FreelancerPictureCarousel loading={imageLoading} onPress={pickImage} />
      <View style={{ height: 20 }} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 16,
            marginBottom: 15,
          }}
        >
          {profile[0]?.fullname}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="star" size={20} color="#4BAF4F" />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Rubik-Regular",
              marginLeft: 7,
            }}
          >
            No review yet
            {/* {profile?.reviews?.length > 0
              ? profile?.reviews?.length
              : "No reviews yet"} */}
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1,
        }}
      >
        {profile[0]?.Skills?.map((skill, index) => (
          <View
            key={skill.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: index === 0 ? 0 : 10,
            }}
          >
            <Text
              style={{
                color: "#767676",
                fontFamily: "Rubik-Regular",
              }}
            >
              {skill.name}
            </Text>
            <Text
              style={{
                color: "#4BAF4F",
                fontFamily: "Rubik-Regular",
              }}
            >
              {` $${skill.rate}/hr`}
            </Text>
          </View>
        ))}
      </View>
      <View style={{ height: 20 }} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#767676",
              fontFamily: "Rubik-Regular",
            }}
          >
            Phone Number
          </Text>
          <Text style={{ color: "#000", fontFamily: "Rubik-Regular" }}>
            {profile[0] && profile[0]?.phonenumber}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#767676",
              fontFamily: "Rubik-Regular",
            }}
          >
            Email Address
          </Text>
          <Text style={{ color: "#000", fontFamily: "Rubik-Regular" }}>
            {profile[0] && profile[0]?.email}
          </Text>
        </View>
      </View>
      <View style={{ height: 20 }} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "Rubik-Regular",
            fontSize: 16,
            paddingBottom: 20,
          }}
        >
          My Bio
        </Text>
        <Text style={{ fontSize: 13, fontFamily: "Rubik-Regular" }}>
          {profile[0] && profile[0].bio ? profile[0]?.bio : "N/A"}
        </Text>
      </View>
      <View style={{ height: 20 }} />
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Rubik-Regular",
            color: "#4BAF4F",
            borderColor: "#4BAF4F",
            borderWidth: 1,
            borderRadius: 10,
            textAlign: "center",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
        onPress={() => navigation.navigate("AvailabilityList")}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Rubik-Regular",
            color: "#4BAF4F",
            borderColor: "#4BAF4F",
            borderWidth: 1,
            borderRadius: 10,
            textAlign: "center",
            paddingBottom: 10,
            paddingTop: 10,
          }}
        >
          Set Availability
        </Text>
      </TouchableOpacity>
      <View style={{ height: 60 }} />
      <View
        style={{
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            paddingHorizontal: 20,
            fontFamily: "Rubik-Regular",
          }}
        >
          My Reviews
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignContent: "flex-start",
            marginVertical: 20,
          }}
        >
          {profile[0]?.Reviews?.length > 0 ? (
            <>
              <ScrollView
                horizontal
                style={{
                  paddingHorizontal: 0,
                  paddingBottom: 20,
                }}
                pagingEnabled
              >
                {profile[0]?.Reviews.filter((item, idx) => idx < 6).map(
                  (item, index) => (
                    <ReviewCard
                      style={{
                        width: screenWidth - 10,
                        marginTop: 20,
                        marginRight: 10,
                      }}
                      details={item}
                      key={index}
                    />
                  )
                )}
              </ScrollView>
            </>
          ) : (
            <View
              style={{
                width: "100%",
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Rubik-Regular",
                }}
              >
                No Reviews yet to view
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default FreelancerProfile;
