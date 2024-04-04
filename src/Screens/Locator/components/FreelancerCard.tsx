/** @format */

import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import Toast from "react-native-toast-message";

import { getDistance } from "geolib";

import { useUserStore } from "../../../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../../../config";
import { supabase } from "../../../../lib/supabase";
import { useServiceStore } from "../../../../Store/ServiceStore";

const FreelancerCard = ({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) => {
  const [loading, setLoading] = React.useState(false);
  const profile = useUserStore((state) => state.profile);
  const user = useUserStore((state) => state.user);
  const [refresh, setRefresh] = React.useState(false);
  const favs = useUserStore((state) => state.favorites);
  const serviceStore = useServiceStore();
  const saveFreelancer = async (id: string) => {
    setLoading(true);

    const existingFavorite = favs.find(
      (favorite: any) => favorite.freelancer_id === id
    );

    if (existingFavorite) {
      const { error } = await supabase
        .from("Favorites")
        .delete()
        .eq("uid", user.sub)
        .eq("freelancer_id", id);

      if (error) {
        console.log(error);
      }
      useUserStore
        .getState()
        .setFavorites(favs.filter((fav: any) => fav.freelancer_id !== id));
    } else {
      const { data, error } = await supabase
        .from("Favorites")
        .insert({ freelancer_id: id })
        .eq("uid", user.sub)
        .select();

      if (error) {
        console.log(error);
      }
      useUserStore
        .getState()
        .setFavorites([...useUserStore.getState().favorites, ...(data ?? [])]);
    }

    setLoading(false);
  };

  console.log("am here");

  return (
    <TouchableOpacity
      onPress={() => {
        // Filter the Reviews array
        const reviews = item.Reviews.filter(
          (review) => review.owner === item.uid
        );

        navigation.navigate("FreelancerProfile", {
          data: item,
          reviews: reviews,
          // service: searchStore.getSearchDetails.service
        });
      }}
      style={{
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Image
          source={
            item ? { uri: item.profilePhoto } : { uri: DEFAULT_GALLERY_IMAGE }
          }
          style={{
            width: "100%",
            height: 200,
          }}
          resizeMode="cover"
        />
        <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
              }}
            >
              {item.fullname}
            </Text>
            {item && user && (
              <>
                {loading ? (
                  <ActivityIndicator size={"small"} color={"#4BAF4F"} />
                ) : (
                  <>
                    <AntDesign
                      name={
                        favs &&
                        favs.some(
                          (favorite: any) => favorite.freelancer_id === item.uid
                        )
                          ? "heart"
                          : "hearto"
                      }
                      size={24}
                      style={{
                        color:
                          favs &&
                          favs.some(
                            (favorite: any) =>
                              favorite.freelancer_id === item.uid
                          )
                            ? "#4BAF4F"
                            : "#717171",
                      }}
                      onPress={() => {
                        saveFreelancer(item.uid);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </View>
          {item.Skills?.length > 0 && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  marginVertical: 5,
                }}
                ellipsizeMode="tail"
                numberOfLines={4}
              >
                {item.Skills.map((item: { name: string }) => item.name).join(
                  " • "
                )}
              </Text>
              {serviceStore.selectedService && (
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 16,
                    marginVertical: 5,
                  }}
                >
                  {item.Skills.map((skill: { name: string; rate: number }) => {
                    if (skill.name === serviceStore.selectedService) {
                      return `$${skill.rate}`; // Add a $ before the value
                    }
                  })}
                </Text>
              )}
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {profile && profile[0].lat && profile[0].lng ? (
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  marginTop: 5,
                  fontSize: 14,
                }}
              >
                {Math.round(
                  getDistance(
                    {
                      latitude: item.lat || 0,
                      longitude: item.lng || 0,
                    },
                    {
                      latitude: parseFloat(profile[0]?.lat || "0"),
                      longitude: parseFloat(profile[0]?.lng || "0"),
                    }
                  ) / 1000
                ) > 0
                  ? `${Math.round(
                      getDistance(
                        {
                          latitude: item.lat || 0,
                          longitude: item.lng || 0,
                        },
                        {
                          latitude: parseFloat(profile[0]?.lat || "0"),
                          longitude: parseFloat(profile[0]?.lng || "0"),
                        }
                      ) / 1000
                    )} km away`
                  : null}
              </Text>
            ) : null}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              {item?.Reviews?.some((review) => review.owner === item.uid) ? (
                <AntDesign name="star" size={17} color="#009C52" />
              ) : (
                <AntDesign name="staro" size={17} color="#009C52" />
              )}

              <Text
                style={{
                  marginLeft: 4,
                  fontFamily: "Rubik-Regular",
                }}
              >
                {item?.Reviews?.filter((review) => review.owner === item.uid)
                  .length > 0
                  ? item.Reviews.filter((review) => review.owner === item.uid)
                      .length
                  : "No reviews yet"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FreelancerCard;
