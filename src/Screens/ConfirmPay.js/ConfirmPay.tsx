import { Ionicons } from "@expo/vector-icons";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import React, { memo, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import GreenStarSvg from "../../../assets/RNSVG/greenStarSvg";
import InfoSvg from "../../../assets/RNSVG/infoSvg";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../utils/responsiveness.helpers";

import styles from "./styles";

import { cards } from "../../utils/data";
import MasterCardSvg from "../../../assets/RNSVG/masterCardSvg";
import PlusSvg from "../../../assets/RNSVG/plusSvg";
import { useUserStore } from "../../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../../config";
import moment from "moment";
import { getDistance } from "geolib";
import { supabase } from "../../../lib/supabase";

const ConfirmPay = ({ navigation, route }: { navigation: any; route: any }) => {
  const [selectedCard, setSelectedCard] = useState();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [donate, setDonate] = useState(0);
  const profile = useUserStore((state) => state.profile);
  const [totalPrice, setTotalPrice] = useState(0);
  const savedCards = useUserStore((state) => state.cards);

  console.log(savedCards);

  useEffect(() => {
    getTotalPrice();
  }, []);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `https://seal-app-ucm3i.ondigitalocean.app/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice }),
      }
    );

    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Freelancer Inc",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: false,
    });

    await openPaymentSheet();
    if (!error) {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };
  // console.log(profile)

  const createBookings = async () => {
    setLoading(true);
    const user = "";

    // Create a new booking entry
    const newBookingEntry = {
      fullname: route.params.freelancer.user.fullname,
      freelancerId: route.params.freelancer.user.uid,
      amount: totalPrice,
      skills: route.params.freelancer.selectedSkillAndService,
      startDate: route.params.freelancer.startDate,
      endDate: route.params.freelancer.endDate,
      status: "Pending",
      percentage: getPercentage(),
      donation: donate,
      photo: route.params.freelancer.user.profilePhoto,
      bookingPhoto: profile[0]?.profilePhoto,
      bookingName: profile[0]?.fullname,
      bookingId: profile[0]?.uid,
    };

    const { data, error } = await supabase
      .from("Bookings")
      .insert([newBookingEntry])
      .select();
    if (error) {
      console.log(error, "here is the culprit");
    } else {
      navigation.navigate("Booking");
    }
    setLoading(false);
    // Alert the user
  };

  const getPercentage = () => {
    const result = 0.05 * Number(route.params.freelancer.total);
    return Math.round(result);
  };

  const getTotalPrice = () => {
    let totalPrice = Number(route.params.freelancer.total) + getPercentage();
    let roundedUp = Math.ceil(totalPrice / 5) * 5;
    if (roundedUp === totalPrice && totalPrice % 5 === 0) {
      roundedUp += 5;
    }
    setDonate(Math.round(roundedUp - totalPrice));
    setTotalPrice(roundedUp);
    //  console.log(donate, totalPrice, roundedUp);
  };

  // console.log(route.params.freelancer?.user.reviews?.length);
  const roundedTotalTime = Math.ceil(route.params.freelancer.totalTime);
  return (
    <StripeProvider
      publishableKey={
        "pk_test_51OdYbXKSbVD3WHZNX6xwobxiDLv8hUfsDGbQatB2ndvVYOqeNT6QiGBI6IuqoFcIe1IsiilpcEksxqKgdkGeILQE00XxFWIjKJ"
      }
      merchantIdentifier="merchant.com.freelancerapp"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="chevron-back-outline"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Confirm and Pay</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.boxContainer}>
            <Image
              source={
                route.params.freelancer.user.profilePhoto
                  ? { uri: route.params.freelancer.user.profilePhoto }
                  : { uri: DEFAULT_GALLERY_IMAGE }
              }
              style={{ width: "40%", height: "100%" }}
              resizeMode="center"
            />
            <View style={styles.infoContainer}>
              <Text>
                {route.params.freelancer.user.firstname}{" "}
                {route.params.freelancer.user.lastname}
              </Text>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  marginTop: 10,
                  marginBottom: 10,
                  fontSize: 12,
                }}
              >
                {Math.round(
                  getDistance(
                    {
                      latitude: route.params.freelancer.user.lat || 0,
                      longitude: route.params.freelancer.user.lng || 0,
                    },
                    {
                      latitude: parseFloat(profile[0]?.lat || "0"),
                      longitude: parseFloat(profile[0]?.lng || "0"),
                    }
                  ) / 1000
                )}
                km away
              </Text>
              {/* <Text style={styles.distanceText}>0km away</Text> */}
              <View style={styles.ratings}>
                <GreenStarSvg style={styles.star} />
                <Text>{route.params.freelancer?.user.reviews?.length}</Text>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.divider} />

            <View style={styles.summaryContent}>
              <View style={styles.sections}>
                <Text style={styles.sectionTitle}>Booked Dates</Text>
                <Text style={styles.sectionInfo}>
                  {moment(route.params.freelancer.startDate).format(
                    "DD-MM-YYYY"
                  )}{" "}
                  to{" "}
                  {moment(route.params.freelancer.endDate).format("DD-MM-YYYY")}
                </Text>
              </View>
              <View
                style={{
                  ...styles.sections,
                  marginTop: heightPercentageToDP(1),
                }}
              >
                <Text style={styles.sectionInfo}>Time</Text>
                <Text style={styles.sectionInfo}>{roundedTotalTime}hrs</Text>
              </View>

              {route.params.freelancer.specialEquipment === false ? (
                <View style={{ marginTop: heightPercentageToDP(2.5) }}>
                  <Text>Service</Text>

                  {route.params.freelancer.selectedSkillAndService.map(
                    (skill, index: number) => (
                      <View
                        key={index}
                        style={{
                          ...styles.sections,
                          marginTop: heightPercentageToDP(1),
                          alignItems: "flex-start",
                        }}
                      >
                        <Text style={styles.sectionInfo}>{skill.name}</Text>
                        <Text
                          style={styles.sectionPrice}
                        >{`US $${skill.rate}/hr`}</Text>
                      </View>
                    )
                  )}
                  <View
                    style={{
                      ...styles.sections,
                      marginTop: heightPercentageToDP(1),
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.sectionInfo}>Service Fee</Text>
                    <Text style={styles.sectionPrice}>${getPercentage()}</Text>
                  </View>
                </View>
              ) : (
                <View style={{ marginTop: heightPercentageToDP(2.5) }}>
                  <Text>Special Equipment</Text>
                  {route.params.freelancer.selectedSkillAndService.map(
                    (skill, index: number) => (
                      <View
                        key={index}
                        style={{
                          ...styles.sections,
                          marginTop: heightPercentageToDP(1),
                          alignItems: "flex-start",
                        }}
                      >
                        <Text style={styles.sectionInfo}>{skill.name}</Text>
                        <Text
                          style={styles.sectionPrice}
                        >{`US $${skill.rate}/hr`}</Text>
                      </View>
                    )
                  )}
                  <View
                    style={{
                      ...styles.sections,
                      marginTop: heightPercentageToDP(1),
                      alignItems: "flex-start",
                    }}
                  >
                    <Text style={styles.sectionInfo}>Service Fee</Text>
                    <Text style={styles.sectionPrice}>{donate}</Text>
                  </View>
                </View>
              )}
              <View
                style={{
                  ...styles.sections,
                  marginTop: heightPercentageToDP(2.5),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text>Round up and Donate</Text>
                  <InfoSvg
                    style={{
                      marginLeft: widthPercentageToDP(2),
                    }}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text>$</Text>
                  <TextInput
                    value={donate.toString()}
                    onChangeText={(text) => setDonate(parseInt(text) || 0)}
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <View
              style={{
                ...styles.sections,
                paddingHorizontal: widthPercentageToDP(5),
              }}
            >
              <Text>Total</Text>
              <Text style={styles.sectionPrice}>US ${totalPrice}</Text>
            </View>
          </View>
          <View style={styles.payment}>
            {/* <Text>Payment Methods</Text>
            {savedCards.map((cardNumber) => (
              <TouchableOpacity
                key={cardNumber}
                style={styles.selectCard}
                onPress={() => setSelectedCard(cardNumber.number)}
              >
                <View style={styles.left}>
                  <View style={styles.radioContainer}>
                    {selectedCard === cardNumber && (
                      <View style={styles.radio} />
                    )}
                  </View>
                  <Text style={styles.cardNumber}>{cardNumber.number}</Text>
                </View>
                <MasterCardSvg />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.selectCard}
              onPress={() => navigation.navigate("paymentMethod")}
            >
              <View style={styles.left}>
                <PlusSvg style={{ marginRight: widthPercentageToDP(8) }} />
                <Text style={styles.cardNumber}>Add Payment Method</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.button}
              onPress={
                // () => createBookings()
                () => initializePaymentSheet().then(() => createBookings())
              }
            >
              {loading ? (
                <ActivityIndicator color={"#4BAF4F"} size={"small"} />
              ) : (
                <Text style={styles.buttonText}>Send Booking Request</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.gap} />
        </ScrollView>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default memo(ConfirmPay);
