import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import SkillRates from "../components/SkillRates";
import { useUserStore } from "../../../../../../Store/UserStore";
import { supabase } from "../../../../../../lib/supabase";

const Rates = () => {
  const profile = useUserStore((state) => state.profile);
  const skill = useUserStore((state) => state.skills);
  const [skillData, setSkillData] = useState<Skill[]>([]);

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
        setSkills(
          data.map((skill) => ({
            ...skill,
            rate: skill.rate.toString(),
          }))
        );
      }
      console.log(skill);
      setLoading(false);
    };

    fetchSkills();
  }, [skill]);
  const [loading, setLoading] = useState(false);
  interface Skill {
    name: string;
    rate: string;
    id: string;
  }

  const [skills, setSkills] = useState<Skill[]>([]);

  return (
    <View style={{ width: "100%", paddingBottom: 30, zIndex: 1 }}>
      <View
        style={{
          backgroundColor: "#E1E1E1",
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontFamily: "Rubik-Regular" }}>
          Update Rates
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
            {skills.map((skill, index) => (
              <SkillRates
                skill={skill}
                skills={skills}
                setSkills={setSkills}
                key={index}
                index={index}
                skillData={skillData}
              />
            ))}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                //   justifyContent: "center",
                width: "auto",
              }}
              onPress={() => {
                setSkills([
                  ...skills,
                  { name: "", rate: "", id: Math.random().toString() },
                ]);
              }}
            >
              <MaterialCommunityIcons
                name="plus-box"
                size={26}
                color="#4BAF4F"
              />
              <Text style={{ fontFamily: "Rubik-Regular", marginLeft: 10 }}>
                Add Skill
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Rates;
