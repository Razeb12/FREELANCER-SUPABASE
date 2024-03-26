import React from "react";
import { View, Text } from "react-native";

// Define an interface for the component's props
interface CustomMarkerProps {
  amount: number;
  freelancerId: any;
  selectedFreelancer: string;
  name: string;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({
  amount,
  freelancerId,
  selectedFreelancer,
  name,
}) => {
  return (
    <View
      style={{
        padding: 6,
        backgroundColor: freelancerId === selectedFreelancer ? "#4BAF4F" : "#fff",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: "#009C52",
      }}
    >
      <Text
        style={{
          fontSize: 10,
          fontFamily: "Rubik-Regular",
          color: freelancerId === selectedFreelancer ? "#FFF" : "#4BAF4F",
        }}
      >
        {amount >= 0 ? `$${amount}` : name}
      </Text>
    </View>
  );
};

export default CustomMarker;
