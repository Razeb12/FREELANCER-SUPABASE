/** @format */

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { memo, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { tokenStore } from "../../../store/tokenStore";
import { addSavedFreelancer, getSavedFreelancers } from "../../../helpers/saved";
import Toast from "react-native-toast-message";
import { freelancerStore } from "../../../store/freelancerStore";
import { getDistance } from "geolib";
import { userStore } from "../../../store/userStore";
import { observer } from "mobx-react";
import { cacheStore } from "../../../store/cacheStore";

const Details = ({ navigation, details, selectedSkill, check }) => {
  const [loading, setLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);


  const saveFreelancer = async (id) => {
    setLoading(true);

    setLoading(false);
  };


  return (
    <>
      <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
        {details?.firstname} {details?.lastname}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15
        }}
      >
        {details?.city && freelancerStore.freelancerDetails.city ? (
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              marginTop: 5,
              fontSize: 14
            }}
          >
            {/* 10Km away */}
            {getDistance(
              {
                latitude: parseFloat(details?.lat),
                longitude: parseFloat(details?.long)
              },
              {
                latitude: parseFloat(freelancerStore.freelancerDetails.lat),
                longitude: parseFloat(freelancerStore.freelancerDetails.lng)
              }
            )}
            m away
          </Text>
        ) : null}
        {details?.lat &&
        details?.long &&
        freelancerStore.freelancerDetails.city ? (
          <TouchableOpacity
            onPress={() => {
              if (tokenStore.authToken.token) {
                navigation.navigate("MapScreen", {
                  fullName: `${details.firstname} ${details.lastname}`,
                  selectedSkill: selectedSkill,
                  coordinates: {
                    latitude: Number(details.lat),
                    longitude: Number(details.long)
                  }
                });
                return;
              } else {
                Toast.show({
                  type: "error",
                  text1: "Please login to continue"
                });
                navigation.navigate("ProfileStack");
              }
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 12,
                marginLeft: 20,
                color: "#4BAF4F"
              }}
            >
              Open in maps
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="star" size={18} color="#4BAF4F" />
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Rubik-Regular",
              marginLeft: 7
            }}
          >
            {details.ratings.length >= 1
              ? details?.rate_star + "(" + details?.ratings.length + ")"
              : "No reviews yet"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* <Feather name="upload" size={24} color="#717171" /> */}

          {tokenStore.authToken.token && (
            <>
              {details?.id !== userStore.userDetails.id && (
                <>
                  {loading ? (
                    <ActivityIndicator size={"small"} color={"#4BAF4F"} />
                  ) : (
                    <>
                      <AntDesign
                        name={
                          check && check.includes(details?.user_id) ? "heart" : "hearto"
                        }
                        size={24}
                        style={{
                          color:
                            check && check.includes(details?.user_id)
                              ? "#4BAF4F"
                              : "#717171"
                        }}
                        onPress={() => {
                          saveFreelancer(details?.user_id);
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
      </View>
    </>
  );
};

export default memo(Details);
