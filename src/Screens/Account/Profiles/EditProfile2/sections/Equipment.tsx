import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import SKillEquipment from "../components/SKillEquipment";
import { Equipments, Skills } from "../../../../../utils/types";
import { useUserStore } from "../../../../../../Store/UserStore";
import { supabase } from "../../../../../../lib/supabase";

const Equipment = () => {
  // const [loading, setLoadings] = useState(false);
  const profile = useUserStore((state) => state.profile);
  const { loading, setLoading } = useUserStore();
  const skill = useUserStore((state) => state.skills);
  const [skillData, setSkillData] = useState<Equipments[]>([]);
  const [equipments, setEquipments] = useState<Equipments[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipments[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Skills")
        .select()
        .eq("uid", profile[0].uid);
      if (error) {
        console.error("Error fetching skills:", error);
      } else {
        setSkillData(data);
      }
      setLoading(false);
    };
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("Equipments")
        .select()
        .eq("uid", profile[0].uid);
      if (error) {
        console.error("Error fetching", error);
      } else {
        setEquipmentData(data);
        setEquipments(
          data.map((equipment) => ({
            ...equipment,
            equipment: equipment?.name,
          }))
        );
      }
      setLoading(false);
    };

    fetchSkills();
    fetchCategories();
  }, [skill]);

  return (
    <View style={{ width: "100%", paddingBottom: 30 }}>
      <View
        style={{
          backgroundColor: "#E1E1E1",
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular" }}>
          Special Equipment
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            {equipments?.map((equipment, index) => (
              <SKillEquipment
                equip={equipments}
                setSelectedEquipment={setEquipments}
                index={index}
                key={index}
                skillData={skillData}
                equipmentData={equipmentData}
                equipment={equipment}
              />
            ))}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",

                width: "auto",
              }}
              onPress={() => {
                setEquipments([
                  ...equipments,
                  {
                    id: "",
                    equipment: "",
                    rate: 0,
                    is_rented: false,
                    name: "",
                    skill_id: "",
                    skill_name: "",
                    skill_rate: "",
                  },
                ]);
              }}
            >
              <MaterialCommunityIcons
                name="plus-box"
                size={26}
                color="#4BAF4F"
              />
              <Text style={{ fontFamily: "Rubik-Regular", marginLeft: 10 }}>
                Add Equipment
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Equipment;
