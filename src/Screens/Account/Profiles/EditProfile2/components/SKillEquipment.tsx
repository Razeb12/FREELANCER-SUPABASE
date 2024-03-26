import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Toast from "react-native-toast-message";
import Checkbox from "expo-checkbox";
import { Button } from "../../../../../components/Button";
import CustomTextInput from "../../../../../components/CustomTextInput";
import { Equipments } from "../../../../../utils/types";
import { useUserStore } from "../../../../../../Store/UserStore";
import { supabase } from "../../../../../../lib/supabase";

const SKillEquipment = ({
  equipment,
  equip,
  setSelectedEquipment,
  index,
  equipmentData,
  skillData,
}: {
  equipment: Equipments;
  equip: any;
  setSelectedEquipment: Function;
  index: number;
  equipmentData: any[];
  skillData: any[];
}) => {
  const [loading, setLoading] = useState(false);
  const skillValue = useUserStore((state) => state.skills);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const profile = useUserStore((state) => state.profile);
  const user = useUserStore((state) => state.user);
  const [rate, setRateValue] = useState<number>();
  const [isRented, setIsRented] = useState(false);
  const [choiceItem, setChoiceItem] = useState("");

  const addEquipments = async (equipment: {
    name: string;
    equipment: string;
    id: string;
    is_rented: boolean;
    skill_name: string;
    skill_rate: number;
    skill_id: string;
    rate: number;
  }) => {
    setLoading(true);

    const { error } = await supabase
      .from("Equipments")
      .insert({
        name: equipment.name,
        // skill_id: equipment.id,
        is_rented: equipment.is_rented,
        skill_name: equipment.skill_name,
        // skill_rate: equipment.skill_rate,
        rate: equipment.rate,
      })
      .select();

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setLoading(false);
      useUserStore.setState({ skills: !skillValue });
    }
  };
  const updateEquipments = async (equipment: {
    name: string;
    equipment: string;
    id: string;
    is_rented: boolean;
    skill_name: string;
    skill_rate: number;
    skill_id: string;
    rate: number;
  }) => {
    setLoading(true);

    const { error } = await supabase
      .from("Equipments")
      .update({
        name: equipment.name,
        // skill_id: equipment.id,
        is_rented: equipment.is_rented,
        skill_name: equipment.skill_name,
        // skill_rate: equipment.skill_rate,
        rate: equipment.rate,
      })
      .eq("id", equipment.id)
      .select();

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setLoading(false);
      useUserStore.setState({ skills: !skillValue });
    }
  };
  const deleteEquipments = async (equipment: { id: string }) => {
    setLoading(true);
    const { error } = await supabase
      .from("Equipments")
      .delete()
      .eq("id", equipment.id)
      .select();

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setLoading(false);
      useUserStore.setState({ skills: !skillValue });
    }
  };
  return (
    <>
      <View
        style={{
          width: "100%",
          marginBottom: 15,
          borderWidth: 1,
          borderColor: "#E1E1E1",
          paddingVertical: 15,
          paddingHorizontal: 10,
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <View style={{ width: "100%" }}>
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Skills
          </Text>
          <SelectDropdown
            buttonStyle={{
              width: "100%",
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: "#F0F0F0",
            }}
            buttonTextStyle={{
              fontFamily: "Rubik-Regular",
              fontSize: 13,
              textAlign: "left",
            }}
            defaultButtonText={
              (
                skillData &&
                skillData.filter(
                  (item) => item?.name === equipment.skill_name
                )[0]
              )?.name || "Select Skill"
            }
            data={
              skillData
                ? skillData
                    ?.filter(
                      (item) =>
                        !equipmentData.some((cat) => cat.name === item.name)
                    )
                    .map((item) => item.name)
                : []
            }
            renderDropdownIcon={() => (
              <FontAwesome name="chevron-down" size={15} color="black" />
            )}
            renderCustomizedRowChild={(item) => (
              <View
                style={{
                  marginHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Rubik-Regular",
                    fontSize: 15,
                  }}
                >
                  {item}
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                    borderWidth: 1,
                    borderColor: choiceItem === item ? "#4BAF4F" : "#9F9F9F", // Apply background color based on isSelected
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20 / 2,
                      backgroundColor:
                        choiceItem === item ? "#4BAF4F" : "#9F9F9F",
                    }}
                  />
                </View>
              </View>
            )}
            onSelect={(selectedItem) => {
              setChoiceItem(selectedItem);
              const selectedId = skillData.find(
                (item) => item.name === selectedItem
              )?.id;
              setChoiceItem(selectedItem);
              setSelectedEquipment([
                ...equip.slice(0, index),
                {
                  ...equip[index],
                  skill_name: selectedItem,
                  skill_id: selectedId,
                },
                ...equip.slice(index + 1),
              ]);
            }}
            dropdownStyle={{ borderRadius: 20 }}
            rowStyle={{ paddingVertical: 7 }}
            rowTextStyle={{ fontSize: 13, fontFamily: "Rubik-Regular" }}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10, zIndex: 1 }}>
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Special Equipment
          </Text>
          <CustomTextInput
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: Platform.OS === "android" ? 10 : 15,
              fontSize: 14,
              borderRadius: 10,
              backgroundColor: "#F0F0F0",
              //   marginBottom: 20,
            }}
            value={equipment.name}
            setValue={(text: string) => {
              setSelectedEquipment([
                ...equip.slice(0, index),
                { ...equip[index], name: text },
                ...equip.slice(index + 1),
              ]);
              setDisplaySuggestions(true);
            }}
            onBlur={() => setDisplaySuggestions(false)}
            onFocus={() => setDisplaySuggestions(true)}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Rates
          </Text>
          <CustomTextInput
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: Platform.OS === "android" ? 10 : 15,
              fontSize: 14,
              borderRadius: 10,
              backgroundColor: "#F0F0F0",
            }}
            value={equipment.rate?.toString()}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            setValue={(text: string) => {
              setSelectedEquipment([
                ...equip.slice(0, index),
                { ...equip[index], rate: text },
                ...equip.slice(index + 1),
              ]);
            }}
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Checkbox
            value={equipment.is_rented}
            onValueChange={(newValue) => {
              setSelectedEquipment([
                ...equip.slice(0, index),
                { ...equip[index], is_rented: newValue },
                ...equip.slice(index + 1),
              ]);
            }}
            color="green"
          />
          <Text style={{ fontFamily: "Rubik-Regular", marginLeft: 5 }}>
            Rent Only
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: "100%",
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color="#4BAF4F" />
          ) : (
            <TouchableOpacity
              style={{ width: "100%", borderRadius: 10, overflow: "hidden" }}
              onPress={() => {
                Keyboard.dismiss();
                if (equipment) {
                  const matchingSkill = equipmentData.find(
                    (item) => item.id === equipment.id
                  );
                  if (matchingSkill?.id) {
                    Alert.alert("Skill Category", "Select what to do", [
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteEquipments(equipment),
                      },
                      {
                        text: "Update",
                        style: "default",
                        onPress: () => updateEquipments(equipment),
                      },
                      {
                        text: "Close",
                        style: "default",
                      },
                    ]);
                  } else {
                    addEquipments(equipment);
                  }
                } else {
                  Toast.show({
                    type: "error",
                    text1: "Please fill all the fields",
                  });
                }
              }}
            >
              <Button text="Set" buttonStyle={{ backgroundColor: "#4BAF4F" }} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SKillEquipment;
