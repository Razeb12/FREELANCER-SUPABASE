import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { memo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../../../components/Button";
import { color } from "../../../utils/color";
import ConfirmModal from "../../../components/ConfirmModal";
import { supabase } from "../../../../lib/supabase";
import { useUserStore } from "../../../../Store/UserStore";

const InfoModal = ({
  visible,
  setVisible,
  item,
  value,
  completeLoad,
  decline,
  declineLoad,
  role,
}) => {
  const loadNewData = useUserStore((state) => state.loading);
  const complete = async (value: any) => {
    const { data, error } = await supabase
      .from("Bookings")
      .update({ status: "Upcoming" })
      .eq("id", item.id)
      .single();

    if (error) {
      console.log(error);
    }
    useUserStore.getState().setLoading(!loadNewData);

    setVisible(false);
  };

  const completeBooking = async () => {
    const { data, error } = await supabase
      .from("Bookings")
      .update({ status: "Awaiting" })
      .eq("id", item.id)
      .single();

    if (error) {
      console.log(error);
    }
    useUserStore.getState().setLoading(!loadNewData);

    setVisible(false);
  };
  const closeBooking = async () => {
    const { data, error } = await supabase
      .from("Bookings")
      .update({ status: "Completed" })
      .eq("id", item.id)
      .single();

    if (error) {
      console.log(error);
    }
    useUserStore.getState().setLoading(!loadNewData);

    setVisible(false);
  };

  return (
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
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            Booking {item.status}
          </Text>
          <MaterialCommunityIcons
            name="window-close"
            size={24}
            color="black"
            onPress={() => setVisible(false)}
          />
        </View>
        <View
          style={{ width: "100%", paddingHorizontal: 15, paddingBottom: 15 }}
        >
          <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
            We hope you had a great experience with{" "}
            {item && `${item.bookingName} `}. If you have not done so already,
            please leave a review for {item ? item.firstName : item.firstName}{" "}
            and let others know of your experience.
          </Text>
          <View style={{ height: 20 }} />
          <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
            Have a great day!
          </Text>
          {item && (
            <>
              {role === "freelancer" && item.status === "Pending" ? (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  {completeLoad ? (
                    <ActivityIndicator size={"small"} color={color.primary} />
                  ) : (
                    <TouchableOpacity
                      onPress={() => complete(value)}
                      disabled={completeLoad || declineLoad}
                      style={{ width: "100%" }}
                    >
                      <Button
                        text={"Confirm Booking"}
                        textStyle={{ color: color.primary }}
                        buttonStyle={{
                          borderWidth: 1,
                          borderColor: color.primary,
                          borderRadius: 7,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : role === "freelancer" &&
                item.status !== "Completed" &&
                item.status !== "Pending" ? (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  {completeLoad ? (
                    <ActivityIndicator size={"small"} color={color.primary} />
                  ) : (
                    <TouchableOpacity
                      onPress={completeBooking} // Call the completeBooking function here
                      disabled={completeLoad || declineLoad}
                      style={{ width: "100%" }}
                    >
                      <Button
                        text={"Complete Booking"}
                        textStyle={{ color: color.primary }}
                        buttonStyle={{
                          borderWidth: 1,
                          borderColor: color.primary,
                          borderRadius: 7,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : item.status !== "Completed" &&
                item.status !== "Upcoming" &&
                item.status !== "Awaiting" ? (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  {declineLoad ? (
                    <ActivityIndicator size={"small"} color={color.primary} />
                  ) : (
                    <TouchableOpacity
                      onPress={decline}
                      disabled={completeLoad || declineLoad}
                      style={{ width: "100%" }}
                    >
                      <Button
                        text={"Cancel Booking"}
                        textStyle={{ color: "#D84235" }}
                        buttonStyle={{
                          borderWidth: 1,
                          borderColor: "#858585",
                          borderRadius: 7,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : item.status === "Awaiting" ? (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  {declineLoad ? (
                    <ActivityIndicator size={"small"} color={color.primary} />
                  ) : (
                    <TouchableOpacity
                      onPress={closeBooking}
                      disabled={completeLoad || declineLoad}
                      style={{ width: "100%" }}
                    >
                      <Button
                        text={"Close Booking"}
                        textStyle={{ color: color.primary }}
                        buttonStyle={{
                          borderWidth: 1,
                          borderColor: color.primary,
                          borderRadius: 7,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  {declineLoad ? (
                    <ActivityIndicator size={"small"} color={color.primary} />
                  ) : (
                    <TouchableOpacity
                      onPress={decline}
                      disabled={completeLoad || declineLoad}
                      style={{ width: "100%" }}
                    >
                      {/* <Button
                        text={"Cancel Booking"}
                        textStyle={{ color: "#D84235" }}
                        buttonStyle={{
                          borderWidth: 1,
                          borderColor: "#858585",
                          borderRadius: 7,
                        }}
                      /> */}
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </ConfirmModal>
  );
};

export default InfoModal;
