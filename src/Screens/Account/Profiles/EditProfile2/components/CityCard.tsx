import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Item {
  lat: number;
  lng: number;
  name: string;
}

interface CityCardProps {
  item: Item;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
  setLocation: (location: string) => void;
  setDisplay: (display: boolean) => void;
}

const CityCard: FC<CityCardProps> = ({
  item,
  setCoordinates,
  setLocation,
  setDisplay,
}) => {
  const setLocationDetails = () => {
    setCoordinates({ lat: item.lat, lng: item.lng });
    setLocation(item.name);
    setDisplay(false);
  };

  return (
    <TouchableOpacity onPress={setLocationDetails}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default CityCard;
