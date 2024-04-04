import { AntDesign } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserStore } from "../../../../Store/UserStore";
import { supabase } from "../../../../lib/supabase";
import { Button } from "../../../components/Button";
import ConfirmModal from "../../../components/ConfirmModal";
import CustomTextInput from "../../../components/CustomTextInput";
import { color } from "../../../utils/color";
import InfoModal from "./InfoModal";

const FreelancerBooking = ({ item, navigation }) => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [value, setValue] = useState("");
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(true);
  const [completeLoad, setCompleteLoad] = useState(false);
  const [declineLoad, setDeclineLoad] = useState(false);
  const user = useUserStore((state) => state.profile);
  const loadNewData = useUserStore((state) => state.loading);
  const completeBooking = async () => {
    try {
      setVisible(false);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const markRatingTrue = async () => {
    try {
      setVisible(false);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const decline = async () => {};

  const submitRating = (id: string) => async () => {
    setLoading(true);
    const { error } = await supabase
      .from("Reviews")
      .insert([
        {
          review: value,
          rating: defaultRating,
          ratedBy: user[0].fullname,
          owner: item.uid,
        },
      ])
      .select();

    if (error) {
      console.error(error);
    } else {
      await supabase
        .from("Bookings")
        .update({ is_reviwed: true })
        .eq("id", id)
        .select();
    }
    useUserStore.getState().setLoading(!loadNewData);
    setLoading(false);
    setVisible(false);
  };

  const currentDate = moment();

  const endDate = moment(item?.endDate);

  return (
    <Pressable
      style={{
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 7,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        height: 120,
      }}
    >
      <View
        style={{
          width: "35%",
          height: "100%",
          marginRight: 10,
        }}
      >
        <View>
          <Image
            source={
              item?.photo
                ? {
                    uri: item.bookingPhoto,
                  }
                : require("../../../../assets/freelancer.png")
            }
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
          {item?.status === "Completed" &&
          currentDate.isAfter(endDate) &&
          !item.is_reviwed ? (
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={{
                paddingVertical: 10,
                backgroundColor: "#4BAF4F",
                position: "absolute",
                bottom: 0,
                width: "100%",
                borderBottomLeftRadius: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontFamily: "Rubik-Regular",
                  textAlign: "center",
                }}
              >
                Add Review
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View
        style={{
          paddingRight: 10,
          width: "62%",
          justifyContent: "space-between",
          height: "88%",
        }}
      >
        <View
          style={{
            height: "45%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#000000",
              fontFamily: "Rubik-Regular",
            }}
          >
            {item.bookingName} Booked:
          </Text>
          {item.skills.map((skill: { name: string }, index: number) => (
            <Text
              key={index}
              style={{
                fontSize: 12,
                fontFamily: "Rubik-Regular",
              }}
              numberOfLines={1}
              ellipsizeMode={"tail"}
            >
              {skill.name}
            </Text>
          ))}
          {item.status !== "Completed" && item.status !== "Awaiting" && (
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color="#4E4E4E"
              style={{ position: "absolute", right: 0, top: 0 }}
              onPress={() => setVisibleModal(true)}
            />
          )}
        </View>
        <View
          style={{
            height: "20%",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="calendar-outline"
            size={19}
            color="#949494"
          />
          <Text
            style={{
              fontSize: 10,
              color: "#949494",
              fontFamily: "Rubik-Regular",
              marginLeft: 5,
            }}
          >
            {moment(item.startDate).format("D/M/YYYY")} -{" "}
            {moment(item.endDate).format("D/M/YYYY")}
          </Text>
        </View>
        <View
          style={{
            height: "20%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#949494",
              fontFamily: "Rubik-Regular",
            }}
          >
            Status:{" "}
            <Text
              style={{
                color:
                  item.status === "Pending"
                    ? "#F8B200"
                    : item.status === "In Progress"
                    ? "#0036F6"
                    : item.status === "Completed"
                    ? "#4BAF4F"
                    : "red",
              }}
            >
              {item.status}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              fontFamily: "Rubik-Regular",
            }}
          >
            ${item?.amount || 0}
          </Text>
        </View>
      </View>
      <ConfirmModal visible={visible} setVisible={setVisible}>
        <View
          style={{
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "#fff",
            marginTop: 100,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 15,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400" }}>Review</Text>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
              onPress={() => setVisible(false)}
            />
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 15,
              paddingBottom: 15,
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {maxRating.map((item, key) => {
                  return (
                    <AntDesign
                      key={key}
                      name="star"
                      size={30}
                      color={item <= defaultRating ? "#4BAF4F" : "#DBECDC"}
                      style={{
                        marginLeft: key !== 0 ? 10 : 0,
                      }}
                      onPress={() => {
                        setDefaultRating(item);
                      }}
                    />
                  );
                })}
              </View>
            </View>
            <CustomTextInput
              value={value}
              setValue={(value) => setValue(value)}
              placeholder="Leave a comment"
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              style={{
                backgroundColor: "transparent",
                paddingVertical: 10,
                fontSize: 14,
                borderBottomWidth: 1,
                borderBottomColor: active ? "#4BAF4F" : "#CFCFCF",
                marginBottom: 20,
              }}
            />
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <ActivityIndicator size={"small"} color={color.primary} />
              ) : (
                <TouchableOpacity
                  onPress={submitRating(item.id)}
                  style={{
                    borderRadius: 7,
                    overflow: "hidden",
                    width: "100%",
                  }}
                >
                  <Button
                    text={"Add"}
                    buttonStyle={{
                      backgroundColor: color.primary,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ConfirmModal>
      <InfoModal
        visible={visibleModal}
        setVisible={setVisibleModal}
        item={item}
        role="freelancer"
        completeLoad={completeLoad}
        decline={decline}
        declineLoad={declineLoad}
        completeBooking={completeBooking}
      />
    </Pressable>
  );
};

export default FreelancerBooking;
