import { Entypo } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

import EquipmentListCard from "./EquipmentListCard";

interface EquipmentProps {
  details: any[]; // Replace 'any' with the actual type
  setRentOnlyEquipment: (value: boolean) => void;
  selectedSkillAndService: any[]; // Replace 'any' with the actual type
  setSelectedSkillAndService: (value: any[]) => void; // Replace 'any' with the actual type
  selectedSkill: any; // Replace 'any' with the actual type
  setVisible: () => void;
}

const Equipment: React.FC<EquipmentProps> = ({
  details,
  selectedSkillAndService,
  setSelectedSkillAndService,
  selectedSkill,
  setVisible,
  setRentOnlyEquipment,
}) => {


  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "#4BAF4F",
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
          paddingRight: 5,
          marginBottom: 5,
        }}
      >
        <Entypo
          name="chevron-small-up"
          size={24}
          color={"#717171"}
          onPress={setVisible}
        />
      </View>
      {details && details.length > 0 && (
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#E3E3E3",
          }}
        >
          <Text>All Equipments</Text>
        </View>
      )}
      {details && details.length > 0 ? (
        details.map((item, index) => (
          <EquipmentListCard
            item={item}
            key={item.id}
            specialEquipmentId={item.id}
            border={index === details.length - 1 ? 0 : 1}
            selectedSkillAndService={selectedSkillAndService}
            setSelectedSkillAndService={setSelectedSkillAndService}
            selectedSkill={selectedSkill}
            setRentOnlyEquipment={setRentOnlyEquipment}
          />
        ))
      ) : (
        <Text
          style={{ textAlign: "center", paddingVertical: 10, fontSize: 14 }}
        >
          No equipment found for the selected skill
        </Text>
      )}
    </View>
  );
};

export default Equipment;
