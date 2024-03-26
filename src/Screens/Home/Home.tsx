import moment from "moment";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Dimensions,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import CookSvg from "../../components/CustomIcons/CookSvg";
import { color } from "../../utils/color";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useServiceStore } from "../../../Store/ServiceStore";
import { useUserStore } from "../../../Store/UserStore";
import { Button } from "../../components/Button";
import BottomModal from "../../components/BottomModal";
import LocationPanel from "./components/SearchPanels/LocationPanel";
import DatePanel from "./components/SearchPanels/DatePanel";
import ServicesPanel from "./components/SearchPanels/ServicePanel";
import { services } from "../../utils/data";
import ServiceCard from "./components/ServiceCard";
export default function Home({ navigation }: { navigation: any }) {
  const [contentLoading, setContentLoading] = useState(false);
  const [content, setContent] = useState<"location" | "services" | "date">(
    "services"
  );

  const [next, setNext] = useState();
  const [loading, setLoading] = useState(false);
  const refRBSheet = useRef<RBSheet | null>(null);
  const selectedService = useServiceStore((state) => state.selectedService);
  const selectedLocation = useServiceStore((state) => state.selectedLocation);
  const selectedDate = useServiceStore((state) => state.selectedDate);
  const closeBottomModal = () => {
    refRBSheet.current?.close();
  };
  const setFreelancerLocation = useUserStore(
    (state) => state.setFreelancerLocation
  );
  const setSelectedService = useServiceStore(
    (state) => state.setSelectedService
  );
  const openBottomModal = () => {
    refRBSheet.current?.open();
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Access not granted",
            "Please enable locations for this app in your phone settings"
          );
          setContentLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setFreelancerLocation({
          latitude: location.coords.latitude.toString(),
          longitude: location.coords.longitude.toString(),
        });
      } catch (err) {
        console.error(err);
      }
    };
    checkLocationPermission();
  }, []);

  const initializeSearch = async () => {
    try {
      setContentLoading(true);

      navigation.navigate("Locator");

      setContentLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        ref={(ref) => {}}
      >
        <StatusBar
          style="light"
          backgroundColor="transparent"
          networkActivityIndicatorVisible={loading}
        />
        <ImageBackground
          source={require("../../../assets/landing.png")}
          style={{
            width: "100%",
            height: Dimensions.get("screen").height - 55,
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode="cover"
        >
          <View style={{ width: "90%" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 26,
                marginBottom: 10,
                textAlign: "center",
                fontStyle: "italic",
                fontFamily: "Rubik-MediumItalic",
              }}
            >
              Find a Freelancer
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 20,
                fontFamily: "Rubik-Regular",
              }}
            >
              Freelancers for any service!
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                openBottomModal();
                setContent("services");
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingVertical: 16,
                  // paddingVertical:
                  //   searchStore.getSearchDetails.categories.length > 0
                  //     ? 10
                  //     : 16,
                  paddingHorizontal: 10,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <CookSvg style={{ marginHorizontal: 10 }} color="#5C5C5C" />
                <View
                  style={{
                    width: "88%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#5C5C5C",
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    Service
                  </Text>
                  {selectedService ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#5C5C5C",
                        fontFamily: "Rubik-Regular",
                      }}
                    >
                      {selectedService}
                    </Text>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                openBottomModal();
                setContent("location");
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <MaterialIcons name="my-location" size={24} color="#5C5C5C" />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#5C5C5C",
                      marginLeft: 10,
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    {"Location"}
                  </Text>
                  {selectedLocation ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#5C5C5C",
                        marginLeft: 10,
                        fontFamily: "Rubik-Regular",
                      }}
                    >
                      {selectedLocation}
                    </Text>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                openBottomModal();
                setContent("date");
              }}
            >
              <View
                style={{
                  width: "100%",
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              >
                <MaterialIcons name="date-range" size={24} color="#5C5C5C" />
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#5C5C5C",
                      marginLeft: 10,
                      fontFamily: "Rubik-Regular",
                    }}
                  >
                    Date
                  </Text>

                  {selectedDate ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#5C5C5C",
                        marginLeft: 10,
                        fontFamily: "Rubik-Regular",
                      }}
                    >
                      {moment(selectedDate.startDate).format("DD/MM/YYYY")} -
                      {moment(selectedDate.endDate).format("DD/MM/YYYY")}
                    </Text>
                  ) : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
              disabled={contentLoading}
              onPress={initializeSearch}
            >
              <Button
                text={contentLoading ? "Please wait..." : "Search"}
                textStyle={{
                  marginRight: 10,
                  fontFamily: "Rubik-Regular",
                }}
                buttonStyle={{
                  backgroundColor: color.primary,
                  borderRadius: 10,
                }}
                icon={
                  contentLoading ? (
                    <ActivityIndicator size={"small"} color="#fff" />
                  ) : (
                    <AntDesign name="search1" size={22} color="#fff" />
                  )
                }
                position="right"
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../../assets/logo.png")}
            style={{ position: "absolute", top: 50, left: 20 }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 50,
            }}
            // onPress={() => listViewRef.scrollToEnd({ animated: true })}
          >
            <Image source={require("../../../assets/arrow-down.png")} />
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginLeft: "5%",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Rubik-Medium",
              }}
            >
              Popular services
            </Text>
            <TouchableOpacity
              onPress={() => {
                openBottomModal();
                setContent("services");
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: color.textPrimary,
                  fontWeight: "400",
                  fontFamily: "Rubik-Regular",
                }}
              >
                see all
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelectedService(item.name), initializeSearch();
                }}
              >
                <ServiceCard image={item.img} title={item.name} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <BottomModal
            refRBSheet={refRBSheet}
            dragClose={true}
            keyboardAvoidingViewEnabled={true}
            // height={content === "location" ? 523 : 523}
          >
            {content === "location" ? (
              <LocationPanel close={() => closeBottomModal()} />
            ) : content === "services" ? (
              <ServicesPanel close={() => closeBottomModal()} />
            ) : content === "date" ? (
              <DatePanel close={() => closeBottomModal()} />
            ) : null}
          </BottomModal>
        </View>
      </ScrollView>
    </>
  );
}
