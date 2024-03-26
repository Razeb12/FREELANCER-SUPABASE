// import moment from "moment";
import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";

import SliderIcon from "../../components/CustomIcons/SliderIcon";
import SortIcon from "../../components/CustomIcons/SortIcon";
import FreelancersResult from "./components/FreelancersResult";

import Sort from "./panels/Sort";
import BottomModal from "../../components/BottomModal";
import Filter from "./panels/Filter";
import CustomMarker from "./components/CustomMarker";
import { useUserStore } from "../../../Store/UserStore";
import { useServiceStore } from "../../../Store/ServiceStore";
import moment from "moment";

const Locator = ({ navigation }: { navigation: any }) => {
  const refRBSheet1 = useRef<RBSheet | null>(null);
  const refRBSheet2 = useRef<RBSheet | null>(null);
  const freelancers = useUserStore((state) => state.freelancers);
  const location = useUserStore((state) => state.freelancerLocation);
  const serviceStore = useServiceStore();
  const [selectedFreelancer, setSelectedFreelancer] = useState("");
  const [fromValuePrice, setFromValuePrice] = useState(0);
  const [toValuePrice, setToValuePrice] = useState(0);
  const [isChecked, setChecked] = useState(false);
  const [fromValueRate, setFromValueRate] = useState(0);
  const [toValueRate, setToValueRate] = useState(5);
  const [mapFreelancer, setMapFreelancer] = useState();
  const [lowestValue, setLowestValue] = useState(0);
  const [highestValue, setHighestValue] = useState(0);
  const selectedService = useServiceStore((state) => state.selectedService);

  const [lowestRate] = useState(0);
  const [highestRate] = useState(5);

  const filteredFreelancers = freelancers?.filter((freelancer) => {
    const startDates = serviceStore.selectedDate?.startDate;
    const endDates = serviceStore.selectedDate?.endDate;

    const startDate = moment(startDates).format("DD-MM-YYYY");
    const endDate = moment(endDates).format("DD-MM-YYYY");

    return (
      (!serviceStore.selectedService ||
        (freelancer.Skills &&
          freelancer.Skills.some((skill: { name: string | string[] }) =>
            skill.name.includes(serviceStore?.selectedService as string)
          )) ||
        (freelancer.Equipments &&
          freelancer.Equipments.some(
            (equipment: { name: string | null }) =>
              equipment.name === serviceStore.selectedService
          ))) &&
      (!serviceStore.selectedLocation ||
        (freelancer.city &&
          freelancer.city.toLowerCase() ===
            serviceStore.selectedLocation.toLowerCase())) &&
      (!serviceStore.selectedDate ||
        (freelancer.availability &&
          freelancer.availability.some((date: string) => {
            const formattedDate = moment(date).format("DD-MM-YYYY");
            return moment(formattedDate, "DD-MM-YYYY").isBetween(
              moment(startDate, "DD-MM-YYYY"),
              moment(endDate, "DD-MM-YYYY"),
              null,
              "[]"
            );
          })))
    );
  });
  const closeBottomModal1 = () => {
    refRBSheet1.current?.close();
  };
  const closeBottomModal2 = () => {
    refRBSheet2.current?.close();
  };
  const openBottomModal2 = () => {
    refRBSheet2.current?.open();
  };
  const openBottomModal1 = () => {
    refRBSheet1.current?.open();
  };
  const selectedDate = useServiceStore((state) => state.selectedDate);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FBFBFBF2",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={"transparent"} />
      <View
        style={{
          paddingVertical: 10,
          paddingLeft: 5,
          paddingRight: 15,
          flexDirection: "row",
          alignItems: "center",
          flex: 0.1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={{
            flex: 1,
            marginHorizontal: 10,
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 10,
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 12,
              width: "100%",
              marginRight: 15,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {serviceStore.selectedService || "Services"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              // backgroundColor: "red",
              overflow: "hidden",
            }}
          >
            {serviceStore.selectedLocation ? (
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  marginTop: 5,
                  color: "#7D7D7D",
                  fontSize: 12,
                  marginRight: 15,
                }}
              >
                {serviceStore.selectedLocation}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              // backgroundColor: "red",
              overflow: "hidden",
            }}
          >
            {selectedDate && (
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  marginTop: 5,
                  color: "#7D7D7D",
                  fontSize: 12,
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {moment(selectedDate?.startDate).format("DD-MM-YYYY")} -{" "}
                {moment(selectedDate?.endDate).format("DD-MM-YYYY")}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 15 }}>
            <SortIcon onPress={() => openBottomModal2()} />
          </View>
          {/* <SliderIcon onPress={() => openBottomModal1()} /> */}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
          }}
          initialRegion={{
            latitude: parseFloat(location?.latitude ?? "0"),
            longitude: parseFloat(location?.longitude ?? "0"),
            latitudeDelta: 0.2922,
            longitudeDelta: 0.2421,
          }}
        >
          {filteredFreelancers &&
            filteredFreelancers.length > 0 &&
            filteredFreelancers
              .filter((freelancer) => freelancer.lat && freelancer.lng)
              .filter((item) => item.city !== null)
              .map((freelancer, index) => {
                // Add a small offset to the lat and lng
                const lat = parseFloat(freelancer.lat) + index * 0.0059;
                const lng = parseFloat(freelancer.lng) + index * 0.0059;
                const skills = freelancer.Skills;
                const selectedSkill = skills?.filter(
                  (skill) => skill.name === selectedService
                );

                return (
                  <Marker
                    key={freelancer.id}
                    coordinate={{
                      latitude: lat,
                      longitude: lng,
                    }}
                    onPress={() => setSelectedFreelancer(freelancer.id)}
                  >
                    <CustomMarker
                      amount={selectedSkill && selectedSkill[0]?.rate}
                      name={freelancer?.firstname}
                      freelancerId={freelancer?.id}
                      selectedFreelancer={selectedFreelancer}
                    />
                  </Marker>
                );
              })}
        </MapView>
        <FreelancersResult
          freelancers={filteredFreelancers || []}
          navigation={navigation}
          selectedFreelancer={selectedFreelancer}
          setSelectedFreelancer={setSelectedFreelancer}
        />
      </View>
      <BottomModal refRBSheet={refRBSheet1} dragClose={false} height={520}>
        <Filter
          fromValuePrice={fromValuePrice}
          setFromValuePrice={setFromValuePrice}
          toValuePrice={toValuePrice}
          setToValuePrice={setToValuePrice}
          fromValueRate={fromValueRate}
          setFromValueRate={setFromValueRate}
          toValueRate={toValueRate}
          setToValueRate={setToValueRate}
          lowestValue={lowestValue}
          highestValue={highestValue}
          lowestRate={lowestRate}
          highestRate={highestRate}
          close={() => closeBottomModal1()}
        />
      </BottomModal>

      <BottomModal refRBSheet={refRBSheet2} dragClose={false} height={320}>
        <Sort sortData={freelancers} close={closeBottomModal2} />
      </BottomModal>
    </SafeAreaView>
  );
};

export default Locator;
