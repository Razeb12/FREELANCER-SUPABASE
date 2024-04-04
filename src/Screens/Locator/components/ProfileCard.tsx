import { AntDesign } from "@expo/vector-icons";

import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useUserStore } from "../../../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../../../config";
import { supabase } from "../../../../lib/supabase";

const ProfileCard = ({
  selectedFreelancer,
  freelancers,
  setSelectedFreelancer,
  navigation,
}) => {
  const [loading, setLoading] = React.useState(false);
  const freelancer = useUserStore((state) =>
    state.freelancers?.find((f) => f.id === selectedFreelancer)
  );
  const user = useUserStore((state) => state.user);
  // const profile = useUserStore((state) => state.profile);
  const favs = useUserStore((state) => state.favorites);

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

  return (
    <Pressable
      style={{
        width: "90%",
        height: 100,
        marginHorizontal: "5%",
        marginBottom: 25,
        backgroundColor: "#fff",
        borderRadius: 9,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: -Dimensions.get("window").scale * 63,
        zIndex: 3000,
      }}
      onPress={() => {
        setSelectedFreelancer();
        navigation.navigate("FreelancerProfile", {
          data: freelancer,
          // service: searchStore.getSearchDetails.service,
        });
      }}
    >
      <View
        style={{
          width: "35%",
          height: "100%",
          borderTopLeftRadius: 9,
          borderBottomLeftRadius: 9,
          overflow: "hidden",
        }}
      >
        <Image
          source={{
            uri: freelancer?.profilePhoto
              ? freelancer?.profilePhoto
              : DEFAULT_GALLERY_IMAGE,
          }}
          style={{ width: "100%", height: "100%" }}
        />
        <Pressable
          style={{
            position: "absolute",
            top: 9,
            left: 9,
            padding: 3,
            borderRadius: 14,
            backgroundColor: "#01010180",
          }}
          onPress={() => setSelectedFreelancer()}
        >
          <AntDesign name="close" size={15} color="#fff" />
        </Pressable>
      </View>
      <View
        style={{
          width: "65%",
          height: "100%",
          borderTopRightRadius: 9,
          borderBottomRightRadius: 9,
          backgroundColor: "#fff",
          paddingHorizontal: 13,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Rubik-Regular", fontSize: 16 }}>
            {freelancer?.firstname} {freelancer?.lastname}
          </Text>
          {freelancer && (
            <>
              {loading ? (
                <ActivityIndicator size={"small"} color={"#4BAF4F"} />
              ) : (
                <>
                  <AntDesign
                    name={
                      favs &&
                      favs.some(
                        (favorite: any) =>
                          favorite.freelancer_id === freelancer.uid
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
                            favorite.freelancer_id === freelancer.uid
                        )
                          ? "#4BAF4F"
                          : "#717171",
                    }}
                    onPress={() => {
                      saveFreelancer(freelancer.uid);
                    }}
                  />
                </>
              )}
            </>
          )}
        </View>
        <View style={{ flex: 1 }} />
        {freelancer?.Skills && freelancer?.Skills.length > 0 && (
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {freelancer?.Skills.map((item) => item.name).join(" • ")}
          </Text>
        )}
        <View style={{ flex: 1 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {freelancer?.Reviews?.length > 0 ? (
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
              {freelancer?.Reviews?.length > 0
                ? freelancer?.Reviews?.length
                : "no reviews yet"}
            </Text>
          </View>
          {/* {freelancer?.skills?.find(
						(item) =>
							item.name === searchStore.getSearchDetails.service
					) && (
						<Text
							style={{
								fontFamily: "Rubik-Regular",
								marginTop: 5,
								fontSize: 14,
								color: "#009C52",
							}}
						>
							US $
							{
								freelancer?.skills.find(
									(item) =>
										item.name ===
										searchStore.getSearchDetails.service
								).rate
							}
							/hr
						</Text>
					)} */}
        </View>
      </View>
    </Pressable>
  );
};

export default ProfileCard;
