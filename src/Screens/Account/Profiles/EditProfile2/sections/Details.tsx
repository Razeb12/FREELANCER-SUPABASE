import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../../../../../config";
import CustomTextInput from "../../../../../components/CustomTextInput";
interface DetailsProps {
  details: any; // Replace 'any' with the actual type of 'details'
  setDetails: (value: any) => void; // Replace 'any' with the actual type of the argument
}

const Details = ({ details, setDetails }: DetailsProps) => {
  const [location, setLocation] = useState(details.location || "");
  const [locationIcon, setLocationIcon] = useState(true);

  return (
    <View style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}>
      <Text style={{ paddingBottom: 15, fontFamily: "Rubik-Regular" }}>
        Location
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#F0F0F0",
          borderRadius: 10,
          marginBottom: 30,
        }}
      >
        <GooglePlacesAutocomplete
          placeholder="Enter your location"
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
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
            setDetails((prev: any) => ({
              ...prev,
              location: data.description,
              lat: details?.geometry.location.lat,
              lng: details?.geometry.location.lng,
              city: city,
            }));
          }}
          renderRow={(rowData) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
          textInputProps={{
            placeholderTextColor: "#444444",
            value: location,
            onFocus: () => {
              setLocationIcon(false);
            },
            onBlur: () => {
              setLocationIcon(true);
            },
            onChangeText: (text) =>
              (text.length > 0 || location.length === 1) && setLocation(text),
          }}
        />
        {locationIcon && (
          <View
            style={{
              width: "20%",
              height: 35,
              backgroundColor: "transparent",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="my-location" size={24} color="#4BAF4F" />
          </View>
        )}
      </View>
      <Text style={{ paddingBottom: 15, fontFamily: "Rubik-Regular" }}>
        Bio
      </Text>
      <CustomTextInput
        style={{
          width: "100%",
          height: 100,
          paddingHorizontal: 20,
          paddingVertical: 15,
          fontSize: 14,
          borderRadius: 10,
          backgroundColor: "#F0F0F0",
          marginBottom: 7,
        }}
        multiline={true}
        value={details.description}
        setValue={(text: string | any[]) => {
          if (text.length <= 200) {
            setDetails((prev: any) => ({ ...prev, description: text }));
          }
        }}
      />
      <Text
        style={{
          textAlign: "right",
          fontFamily: "Rubik-Regular",
          paddingBottom: 15,
          color: "#B6B6B6",
        }}
      >
        {details.description.length}/200 characters
      </Text>
      <Text style={{ paddingBottom: 15, fontFamily: "Rubik-Regular" }}>
        Social Handle
      </Text>
      <CustomTextInput
        style={{
          width: "100%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 14,
          borderRadius: 10,
          backgroundColor: "#F0F0F0",
          marginBottom: 30,
        }}
        value={details.igUserName}
        setValue={(text: any) =>
          setDetails((prev: any) => ({ ...prev, igUserName: text }))
        }
      />
    </View>
  );
};

export default Details;
