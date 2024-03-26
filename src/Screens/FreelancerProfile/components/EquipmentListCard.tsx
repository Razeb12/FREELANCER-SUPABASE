import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface EquipmentListCardProps {
  item: any;
  border: any;
  setRentOnlyEquipment: (value: boolean) => void;
  selectedSkillAndService?: any;
  setSelectedSkillAndService?: any;
  selectedSkill?: any;
  specialEquipmentId?: any;
}

const EquipmentListCard: React.FC<EquipmentListCardProps> = ({
  item,
  border,
  setRentOnlyEquipment,
  selectedSkillAndService,
  setSelectedSkillAndService,
}) => {
  const [isChecked, setChecked] = useState(false);

  const [hasRented, setHasRented] = useState(false);

  useEffect(() => {
    const hasRentedItem = selectedSkillAndService.some(
      (data: any) => data.is_rented === true
    );
    if (hasRentedItem === true && selectedSkillAndService.length !== 0) {
      setHasRented(true);
    } else {
      setHasRented(false);
    }
  }, [selectedSkillAndService]);

  const onChange = (status: boolean) => {
    if (status) {
      const duplicate = selectedSkillAndService.filter(
        (data: any) => data.name === item.name // Replace 'any' with the actual type
      );
      if (duplicate.length === 0) {
        setSelectedSkillAndService((prevState: any) => [
          // Replace 'any' with the actual type
          ...prevState,
          {
            id: item.id,
            name: item.name,
            rate: item.rate,
          },
        ]);
      }
    } else {
      setSelectedSkillAndService((prevState: any) =>
        prevState.filter((data: any) => data.id !== item.id)
      );
    }
    setChecked(status);
  };

  const rentWithoutService = (status: boolean) => {
    {
      if (status) {
        const duplicate = selectedSkillAndService.filter(
          (data: any) => data.name === item.name // Replace 'any' with the actual type
        );
        if (duplicate.length === 0) {
          setSelectedSkillAndService((prevState: any) => [
            // Replace 'any' with the actual type
            ...prevState,
            {
              id: item.id,
              name: item.name,
              rate: item.rate,
              is_rented: item.is_rented,
            },
          ]);
        }
      } else {
        setSelectedSkillAndService((prevState: any) =>
          prevState.filter((data: any) => data.id !== item.id)
        );
      }
      setChecked(status);
    }
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: "#E2E2E2",
        borderBottomWidth: border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            fontFamily: "Rubik-Regular",
            color: "#454545",
            width: "70%",
          }}
        >
          {item.name}
          {item.is_rented === true && (
            <Text style={{ color: "red", marginLeft: 2 }}>*</Text>
          )}
        </Text>
      </View>
      {item.rate && (
        <Text style={{ fontFamily: "Rubik-Regular", color: "#454545" }}>
          ${item.rate}
        </Text>
      )}
      <Checkbox
        style={{ margin: 8, backgroundColor: "#fff" }}
        value={isChecked}
        onValueChange={item.is_rented !== true ? onChange : rentWithoutService}
        color={isChecked ? "#009C52" : "#858585"}
      />
    </View>
  );
};

export default EquipmentListCard;
