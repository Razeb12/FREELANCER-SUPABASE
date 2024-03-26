import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import SkillCategory from "../components/SkillCategory";
import { useUserStore } from "../../../../../../Store/UserStore";
import { supabase } from "../../../../../../lib/supabase";
type Category = {
  id?: string;
  name: string;
  category: string;
};
const Category = () => {
  const [loading, setLoading] = useState(false);
  const profile = useUserStore((state) => state.profile);
  const skill = useUserStore((state) => state.skills);
  const [skillData, setSkillData] = useState<Category[]>([]);
  const [categoryData, setCategoryData] = useState<Category[]>([]);

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
        .from("Categories")
        .select()
        .eq("uid", profile[0].uid);
      if (error) {
        console.error("Error fetching", error);
      } else {
        setCategoryData(data);
        setCategories(
          data.map((skill) => ({
            ...skill,
            category: skill?.category,
          }))
        );
      }
      setLoading(false);
    };

    fetchSkills();
    fetchCategories();
  }, [skill]);

  const [categories, setCategories] = useState<Category[]>([]);
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
          Service Category
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
            {categories.map((item: any, index: any) => (
              <SkillCategory
                key={index}
                setSelectedCategory={setCategories}
                category={item}
                categories={categories}
                index={index}
                skillData={skillData}
                categoryData={categoryData}
              />
            ))}
            {!skillData.every((skill) =>
              categories.some((cat) => cat.name === skill.name)
            ) && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "auto",
                }}
                onPress={() => {
                  setCategories([
                    ...categories,
                    { name: "", category: "", id: "" },
                  ]);
                }}
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={26}
                  color="#4BAF4F"
                />
                <Text style={{ fontFamily: "Rubik-Regular", marginLeft: 10 }}>
                  Add Category
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Category;
