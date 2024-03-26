
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import
  {
    ActivityIndicator,
    Image,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";


import { getDistance } from "geolib";
import { useUserStore } from "../../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../../config";
import { Profile } from "../../../utils/types";

const FreelancerEquipmentCard = ({
  item,
  navigation,
}: {
  item: Profile;
  navigation: any;
}) => {
  const [loading, setLoading] = React.useState(false);
  const profile = useUserStore((state) => state.profile);
  const saveFreelancer = async (id: string) => {
    setLoading(true);

    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FreelancerProfile", {
          data: item,
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
          source={{ uri: DEFAULT_GALLERY_IMAGE }}
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
              {item.firstName} {item.lastName}
            </Text>
            {item && (
              <>
                {loading ? (
                  <ActivityIndicator size={"small"} color={"#4BAF4F"} />
                ) : (
                  <>
                    <AntDesign
                      name={
                        profile && profile.favorites?.includes(item.id)
                          ? "heart"
                          : "hearto"
                      }
                      size={24}
                      style={{
                        color:
                          profile && profile.favorites?.includes(item.id)
                            ? "#4BAF4F"
                            : "#717171",
                      }}
                      onPress={() => {
                        saveFreelancer(item.id);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </View>
          {item.skills.length > 0 && (
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                marginVertical: 5,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.skills
                .map((item: { name: string }) => item.name)
                .join(" • ")}
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {profile && profile.latitude && profile.longitude ? (
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  marginTop: 5,
                  fontSize: 14,
                }}
              >
                {getDistance(
                  {
                    latitude: item.latitude || 0,
                    longitude: item.longitude || 0,
                  },
                  {
                    latitude: parseFloat(profile?.latitude || "0"),
                    longitude: parseFloat(profile?.longitude || "0"),
                  }
                )}
                m away
              </Text>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <AntDesign name="star" size={17} color="#009C52" />
              <Text
                style={{
                  marginLeft: 4,
                  fontFamily: "Rubik-Regular",
                }}
              >
                {item.ratings > 0 ? item.ratings : "No reviews yet"}
              </Text>
            </View>
            {/* {item?.skills?.find(
              (item) => item.name === foundedSkill[0]?.name
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
                  item.skills
                    .find((item) => item.name === foundedSkill[0]?.name)
                    ?.special_equipment.find(
                      (item) =>
                        item.name.toLowerCase() ===
                        searchStore.getSearchDetails.equipment.toLowerCase()
                    )?.rate
                }
                /hr
              </Text>
            )} */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FreelancerEquipmentCard;
