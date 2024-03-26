import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState } from "react";

import SelectDropdown from "react-native-select-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import CustomTextInput from "../../../../../components/CustomTextInput";
import { Button } from "../../../../../components/Button";

import Toast from "react-native-toast-message";
import { useUserStore } from "../../../../../../Store/UserStore";
import { supabase } from "../../../../../../lib/supabase";

type CategorySet = {
  id: string;
  name: string;
  category: string;
};

interface CategoryProps {
  category: CategorySet;
  setSelectedCategory: Function;
  categories: any[];
  index: number;
  skillData: any[];
  categoryData: any[];
}

const SkillCategory = ({
  category,
  setSelectedCategory,
  categories,
  index,
  skillData,
  categoryData,
}: CategoryProps) => {
  const profile = useUserStore((state) => state.profile);
  const skillValue = useUserStore((state) => state.skills);
  const [loading, setLoadings] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [choiceItem, setChoiceItem] = useState("");

  const { setLoading } = useUserStore();

  const deleteCategory = async (categoryId: string) => {
    console.log(categoryId);
    setLoading(true);

    const { error } = await supabase
      .from("Categories")
      .delete()
      .eq("id", categoryId);
    if (error) {
      setLoading(false);
    } else {
      setLoading(false);
      useUserStore.setState({ skills: !skillValue });
    }
  };

  const addCategory = async (category: {
    name: string;
    category: string;
    id: string;
  }) => {
    setLoading(true);

    const { error } = await supabase
      .from("Categories")
      .insert({
        name: category.name,
        category: category.category,
        skill_id: category.id,
      })
      .select();

    if (error) {
      console.log(error);
    }
    setLoading(false);
    useUserStore.setState({ skills: !skillValue });
  };

  const updateCategory = async (category: {
    id: string;
    name: string;
    category: string;
  }) => {
    setLoading(true);
    console.log(category);

    const { error } = await supabase
      .from("Categories")
      .update({
        name: category.name,
        category: category.category,
      })
      .eq("id", category.id)
      .select();

    if (error) {
      console.log(error);
    }
    setLoading(false);
    useUserStore.setState({ skills: !skillValue });
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
                skillData.filter((item) => item.name === category.name)[0]
              )?.name || "Select Skill"
            }
            data={
              skillData
                ? skillData
                    ?.filter(
                      (item) =>
                        !categoryData.some((cat) => cat.name === item.name)
                    )
                    .map((item) => item.name)
                : []
            }
            renderCustomizedRowChild={(item, isSelected) => (
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
                    borderColor: choiceItem === item ? "#4BAF4F" : "#9F9F9F",
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
            renderDropdownIcon={() => (
              <FontAwesome name="chevron-down" size={15} color="black" />
            )}
            onSelect={(selectedItem) => {
              const selectedId = skillData.find(
                (item) => item.name === selectedItem
              )?.id;
              setChoiceItem(selectedItem);
              setSelectedCategory([
                ...categories.slice(0, index),
                { ...categories[index], name: selectedItem, id: selectedId },
                ...categories.slice(index + 1),
              ]);
            }}
            dropdownStyle={{ borderRadius: 20 }}
            rowStyle={{ paddingVertical: 7 }}
            rowTextStyle={{ fontSize: 13, fontFamily: "Rubik-Regular" }}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10, zIndex: 1 }}>
          <Text style={{ fontFamily: "Rubik-Regular", paddingBottom: 15 }}>
            Category
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
            value={category.category}
            setValue={(text) => {
              setSelectedCategory([
                ...categories.slice(0, index),
                { ...categories[index], category: text },
                ...categories.slice(index + 1),
              ]);
            }}
          />
        </View>
        <View
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
                if (category.name && category.category) {
                  const matchingSkill = categoryData.find(
                    (item) => item.id === category.id
                  );
                  if (matchingSkill?.id) {
                    Alert.alert("Skill Category", "Select what to do", [
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteCategory(category.id),
                      },
                      {
                        text: "Update",
                        style: "default",
                        onPress: () => updateCategory(category),
                      },
                      {
                        text: "Close",
                        style: "default",
                      },
                    ]);
                  } else {
                    addCategory(category);
                  }
                } else {
                  console.log(category.name, category.category);
                  Toast.show({
                    type: "error",
                    text1: "Please fill all the fields",
                  });
                }
              }}
            >
              <Button
                text="Set"
                textStyle={{}}
                icon={<></>}
                buttonStyle={{ backgroundColor: "#4BAF4F" }}
                position={""}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default SkillCategory;
