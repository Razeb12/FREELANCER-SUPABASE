import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from "../../../../components/Button";

import { color } from "../../../../utils/color";
import { useServiceStore } from "../../../../../Store/ServiceStore";
import { useUserStore } from "../../../../../Store/UserStore";
import { GOOGLE_API_KEY } from "../../../../../config";

const LocationPanel = ({
  close,
  next,
}: {
  close: () => void;
  next: () => void;
}) => {
  const setSelectedLocation = useServiceStore(
    (state) => state.setSelectedLocation
  );
  const selectedLocation = useServiceStore((state) => state.selectedLocation);
  const serviceStore = useServiceStore();
  const [location, setLocation] = useState(selectedLocation || "");

  const setFreelancerLocation = useUserStore(
    (state) => state.setFreelancerLocation
  );

  const clearSelectedLocation = () => {
    serviceStore.setSelectedLocation("");
    setLocation("");

    console.log(location);
    close();
  };
  const handleLocationSelect = (rowData: string) => {
    const selectedLocation = rowData;
    setSelectedLocation(selectedLocation);
    close();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F2F2F2",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "400" }}>Location</Text>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={() => close()}
        />
      </View>
      {/* <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: 10,
          marginLeft: "5%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 3,
          paddingHorizontal: 5,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search for your city"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          onPress={(data, details = null) => {
            const city =
              details?.address_components?.find((component) =>
                component.types.includes("locality")
              )?.long_name ?? "Default City Name";
            handleLocationSelect(city);
            if (details?.geometry?.location) {
              setFreelancerLocation({
                latitude: details.geometry.location.lat.toString(),
                longitude: details.geometry.location.lng.toString(),
              });
            }

            close();
          }}
          styles={{
            textInput: {
              fontFamily: "Rubik-Regular",
            },
          }}
          renderRow={(rowData) => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="location-sharp"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontFamily: "Rubik-Regular" }}>
                {rowData.description}
              </Text>
            </View>
          )}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
            types: "(cities)",
          }}
        
          textInputProps={{
            placeholderTextColor: "#444444",
            value: location,
            onChangeText: (text) =>
              (text.length > 0 || location.length === 1) && setLocation(text),
          }}
        />
      </View> */}
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: 10,
          marginLeft: "5%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 3,
          paddingHorizontal: 5,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Search for your city"
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          keepResultsAfterBlur={true}
          minLength={3}
          onFail={(error) => console.error(error)}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          currentLocation={true}
          currentLocationLabel="Use current location"
          onPress={(data, details = null) => {
            const city =
              details?.address_components?.find((component) =>
                component.types.includes("locality")
              )?.long_name ?? "Default City Name";
            handleLocationSelect(city);
            if (details?.geometry?.location) {
              setFreelancerLocation({
                latitude: details.geometry.location.lat.toString(),
                longitude: details.geometry.location.lng.toString(),
              });
            }

            close();
          }}
          textInputProps={{
            placeholderTextColor: "#444444",
            value: location,
            onChangeText: (text) =>
              (text.length > 0 || location.length === 1) && setLocation(text),
          }}
        />
      </View>
      <View style={{ flex: 1 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={() => clearSelectedLocation()}>
          <Button
            text={"Clear"}
            textStyle={{ color: "#000", fontSize: 15 }}
            buttonStyle={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              borderBottomColor: "#000",
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => close()}>
          <Button
            text={"Next"}
            textStyle={{ color: "#fff", fontSize: 15 }}
            buttonStyle={{
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 5,
              backgroundColor: color.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationPanel;
