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
// import Toast from "react-native-toast-message";
import { DEFAULT_GALLERY_IMAGE } from "../../../config";
import { useUserStore } from "../../../Store/UserStore";
import { Profile } from "../../../utils/types";

const EquipmentProfileCard = ({
  navigation,
  freelancer,
}: {
  freelancer: Profile;
  navigation: any;
  selectedFreelancer: string;
  setSelectedFreelancer: Function;
}) => {
  const [loading, setLoading] = React.useState(false);

  const profile = useUserStore((state) => state.profile);
  const saveFreelancer = async (id: string) => {
    console.log(id);
    setLoading(true);

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
        navigation.navigate("FreelancerProfile", {
          data: freelancer,
          // service: foundedSkill[0]?.name,
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
          source={{ uri: DEFAULT_GALLERY_IMAGE }}
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
          // onPress={() => setSelectedFreelancer()}
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
            Super Prime
          </Text>
          {freelancer && (
            <>
              {loading ? (
                <ActivityIndicator size={"small"} color={"#4BAF4F"} />
              ) : (
                <>
                  <AntDesign
                    name={
                      profile && profile.favorites?.includes(freelancer.id)
                        ? "heart"
                        : "hearto"
                    }
                    size={24}
                    style={{
                      color:
                        profile && profile.favorites?.includes(freelancer.id)
                          ? "#4BAF4F"
                          : "#717171",
                    }}
                    onPress={() => {
                      saveFreelancer(freelancer.id);
                    }}
                  />
                </>
              )}
            </>
          )}
        </View>
        <View style={{ flex: 1 }} />
        {/* {freelancer?.skills.length > 0 && (
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {freelancer?.skills
              .find((skill) => skill.name === foundedSkill[0]?.name)
              ?.special_equipment.map((item) => item.name)
              .join(" • ")}
          </Text>
        )} */}
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
            <AntDesign name="star" size={17} color="#009C52" />
            <Text
              style={{
                marginLeft: 4,
                fontFamily: "Rubik-Regular",
              }}
            >
              no reviews yet
              {/* {freelancer?.rate_star > 0
                ? freelancer.rate_star
                : "no reviews yet"} */}
            </Text>
          </View>
          {/* {freelancer?.skills?.find(
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
                freelancer?.skills
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
    </Pressable>
  );
};

export default EquipmentProfileCard;
