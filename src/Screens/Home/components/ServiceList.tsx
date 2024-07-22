import { TouchableOpacity, Text, Image, View } from "react-native";
import React from "react";
import { useServiceStore } from "../../../../Store/ServiceStore";


const ServiceList = ({
  item,
  close,
  service,
  nextPoint,
}: {
  item: any;
  service: boolean;
  nextPoint: Function;
  close: () => void
}) => {
  const setSelectedService = useServiceStore(
    (state) => state.setSelectedService
  );
  const handleItemClick = () => {
    const selectedValue = service === true ? item.name : item.name;
    setSelectedService(selectedValue);
    close()
  };

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EBEBEB",
      }}
      onPress={handleItemClick}
    >
      <Image
        source={require("../../../../assets/logo.png")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginRight: 10,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          width: "100%",
          height: "auto",
        }}
      >
        <Text style={{ fontSize: 14, fontFamily: "Rubik-Medium" }}>
          {service === true ? item.name : item.name}
        </Text>
        <Text
          style={{
            marginTop: 6,
            fontSize: 12,
            fontFamily: "Rubik-Regular",
            color: "#8A8A8A",
          }}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          Still {item.name} and many more.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceList;
