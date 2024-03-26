import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";


import FreelancerIndicator from "./components/FreelancerIndicator";
import UserIndicator from "./components/UserIndicator";
import { useServiceStore } from "../../../Store/ServiceStore";
import { useUserStore } from "../../../Store/UserStore";
import { GOOGLE_API_KEY } from "../../../config";


const MapScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const coordinates = {
    accuracy: 100,
    altitude: 25.899999618530273,
    altitudeAccuracy: 71.85021209716797,
    heading: 0,
    
    speed: 0,
    mocked: false,
    timestamp: 1705117805193,
  };
  const location = useUserStore((state) => state.freelancerLocation);
  const { fullName, selectedSkill } = route.params;
  const serviceStore = useServiceStore();



  let mapRef = useRef<MapView | null>(null);
  useEffect(() => {
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 120, left: 50, bottom: 50 },
    });
  }, [location?.longitude, location?.latitude]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 25,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={27}
          color="black"
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 15, left: 15 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Rubik-Regular",
            marginLeft: 20,
            textAlign: "center",
          }}
        >
          {serviceStore.selectedService || "No Service"}
        </Text>
      </View>
      <Text
        style={{
          paddingHorizontal: 20,
          fontSize: 14,
          fontFamily: "Rubik-Regular",
          marginBottom: 20,
        }}
      >
        {/* {getDistance(coordinates, {
          latitude: Number(freelancerStore.freelancerDetails.lat),
          longitude: Number(freelancerStore.freelancerDetails.lng),
        })}{" "} */}
        km away
      </Text>
      <View style={{ flex: 1 }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
          style={styles.map}
          region={{
            ...coordinates,
            latitudeDelta: 0.1922,
            longitudeDelta: 0.1421,
          }}
          mapType="terrain"
          zoomEnabled={true}
        >
          <Marker coordinate={coordinates} identifier="destination">
            <FreelancerIndicator name={fullName as string} />
          </Marker>
          <Marker
            coordinate={{
              latitude: parseFloat(location?.latitude ?? "0"),
              longitude: parseFloat(location?.longitude ?? "0"),
            }}
            identifier="origin"
          >
            <UserIndicator />
          </Marker>
          <MapViewDirections
            apikey={GOOGLE_API_KEY}
            destination={coordinates}
            origin={{
              latitude: parseFloat(location?.latitude ?? "0"),
              longitude: parseFloat(location?.longitude ?? "0"),
            }}
            strokeWidth={3}
            strokeColor={"#2B7FFF"}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
