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

import CustomTextInput from "../../../../../components/CustomTextInput";
import { supabase } from "../../../../../../lib/supabase";
import Toast from "react-native-toast-message";
import { useUserStore } from "../../../../../../Store/UserStore";

interface SkillRatesProps {
  skill: any; // Replace 'any' with the actual type of 'skill'
  setSkills: Function; // Replace 'Function' with the actual type of 'setSkills'
  skills: any[]; // Replace 'any[]' with the actual type of 'skills'
  index: number;
  skillData: any[];
}

const SkillRates = ({
  skill,
  setSkills,
  skills,
  index,
  skillData,
}: SkillRatesProps) => {
  const [loading, setLoading] = useState(false);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const skillValue = useUserStore((state) => state.skills);

  const addSkillRate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("Skills")
      .insert({ name: skill.name, rate: skill.rate, type: "skill" })
      .select();

    if (error) {
      console.log(error);
    }
    setLoading(false);
    useUserStore.setState({ skills: !skillValue });
  };

  const updateSkillRate = async (id: string) => {
    setLoading(true);

    await supabase
      .from("Skills")
      .update({ name: skill.name, rate: skill.rate })
      .eq("id", id)
      .select();
    setLoading(false);
    useUserStore.setState({ skills: !skillValue });
  };

  const deleteSkillRate = async (id: string) => {
    setLoading(true);

    const { error } = await supabase.from("Skills").delete().eq("id", id);
    if (error) {
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
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: skills.length - index,
        }}
      >
        <View style={{ width: "37%" }}>
          {displaySuggestions && (
            <View
              style={{
                width: "100%",
                maxHeight: 150,
                zIndex: 10,
                overflow: "scroll",
                position: "absolute",
                top: 73,
                backgroundColor: "#fff",
                elevation: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: 30,
                borderRadius: 5,
              }}
            >
              []
            </View>
          )}
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Skills
          </Text>
          <CustomTextInput
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 14,
              borderRadius: 10,
              backgroundColor: "#F0F0F0",
              marginBottom: 20,
            }}
            value={skill.name}
            setValue={(text) => {
              setSkills([
                ...skills.slice(0, index),
                { ...skill, name: text },
                ...skills.slice(index + 1),
              ]);
              // setDisplaySuggestions(true);
            }}
          />
        </View>
        <View style={{ width: "37%" }}>
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Rates
          </Text>
          <CustomTextInput
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontSize: 14,
              borderRadius: 10,
              backgroundColor: "#F0F0F0",
              marginBottom: 20,
            }}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={skill.rate.toString()}
            setValue={(text) => {
              setSkills([
                ...skills.slice(0, index),
                { ...skill, rate: Number(text) },
                ...skills.slice(index + 1),
              ]);
            }}
          />
        </View>
        {loading ? (
          <View
            style={{
              width: "17%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"small"} color="#D6D6D6" />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              width: "17%",
              backgroundColor: "#4BAF4F",
              height: "auto",
              paddingVertical: Platform.OS === "android" ? "4%" : "3%",
              marginTop: 13,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              Keyboard.dismiss();

              if (skill.name !== "" && skill.rate !== "") {
                const matchingSkill = skillData.find(
                  (item) => item.id === skill.id
                );

                if (matchingSkill) {
                  Alert.alert("Edit Skill", "Select what to do", [
                    {
                      text: "Delete",
                      style: "destructive",
                      onPress: () => deleteSkillRate(matchingSkill.id),
                    },
                    {
                      text: "Update",
                      style: "default",
                      onPress: () => updateSkillRate(matchingSkill.id),
                    },
                    {
                      text: "Close",
                      style: "default",
                    },
                  ]);
                } else {
                  addSkillRate();
                }
              } else {
                Toast.show({
                  type: "error",
                  text1: "Please fill all fields",
                });
              }
            }}
          >
            <Text style={{ color: "#fff", fontFamily: "Rubik-Regular" }}>
              Set
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

export default SkillRates;
