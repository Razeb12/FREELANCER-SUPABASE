import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomTextInput from "../../../../components/CustomTextInput";
import { color } from "../../../../utils/color";
import ServiceList from "../ServiceList";
import { Button } from "../../../../components/Button";
import { useUserStore } from "../../../../../Store/UserStore";
import { useServiceStore } from "../../../../../Store/ServiceStore";

const ServicesPanel = ({
  close,
  next,
}: {
  close: () => void;
  next: () => void;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [content, setContent] = useState("service");
  const [loading, setLoading] = useState(false);
  const freelancer = useUserStore((state) => state.freelancers);
  const serviceStore = useServiceStore();

  const clearSelectedService = () => {
    serviceStore.setSelectedService("");
    close();
  };

  const skills = new Set();
  const equipments = new Set();
  if (freelancer) {
    Object.values(freelancer).forEach((freelancer) => {
      if (freelancer.Equipments) {
        freelancer.Equipments.forEach((equipment: any) => {
          equipments.add(JSON.stringify(equipment));
        });
      }
      if (freelancer.Skills) {
        freelancer.Skills.forEach((skill: any) => {
          skills.add(JSON.stringify(skill));
        });
      }
    });
  }

  const uniqueSkills = Array.from(skills)
    .map((value) => JSON.parse(String(value)))
    .filter((value, index, self) => {
      return index === self.findIndex((t) => t.name === value.name);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const uniqueEquipments = Array.from(equipments)
    .map((value) => JSON.parse(String(value)))
    .filter((value, index, self) => {
      return index === self.findIndex((t) => t.equipment === value.equipment);
    })
    .sort((a, b) => a.equipment.localeCompare(b.equipment));

  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F2F2F2",
          paddingHorizontal: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80%",
          }}
        >
          <View
            style={{
              width: "70%",
              backgroundColor: "#E2E2E2",
              marginLeft: "15%",
              height: 38,
              borderRadius: 7,
              flexDirection: "row",
              justifyContent: "center",
              paddingHorizontal: 3,
              paddingVertical: 3,
              overflow: "hidden",
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  content === "service" ? "#4BAF4F" : "transparent",
                borderRadius: 7,
              }}
              onPress={() => setContent("service")}
            >
              <Text
                style={{
                  color: content === "service" ? "#fff" : "#000",
                  fontSize: 14,
                }}
              >
                Service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  content === "equipment" ? "#4BAF4F" : "transparent",
                borderRadius: 7,
              }}
              onPress={() => setContent("equipment")}
            >
              <Text
                style={{
                  color: content === "equipment" ? "#fff" : "#000",
                  fontSize: 14,
                }}
              >
                Equipment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={() => close()}
          style={{ position: "absolute", right: 20 }}
        />
      </View>
      <CustomTextInput
        placeholder={
          content === "equipment"
            ? "Search for an equipment"
            : "Search for a service"
        }
        style={{
          width: "90%",
          paddingHorizontal: 20,
          paddingVertical: 10,
          fontSize: 14,
          elevation: 5,
          borderRadius: 10,
          marginTop: 20,
          marginLeft: "5%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          backgroundColor: "#fff",
        }}
        value={searchValue}
        setValue={(text) => setSearchValue(text)}
      />
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={"large"} color={color.primary} />
        </View>
      ) : (
        <>
          {content === "service" ? (
            <FlatList
              data={Array.from(uniqueSkills).filter((item) => {
                return (
                  item &&
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                );
              })}
              keyExtractor={(item, idx) => idx?.toString()}
              renderItem={({ item }) => (
                <ServiceList
                  item={item}
                  service={true}
                  nextPoint={next}
                  close={close}
                />
              )}
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            />
          ) : (
            <FlatList
              data={Array.from(uniqueEquipments).filter((item) => {
                return (
                  item &&
                  item.name.toLowerCase().includes(searchValue.toLowerCase())
                );
              })}
              keyExtractor={(item, idx) => idx?.toString()}
              renderItem={({ item }) => (
                <ServiceList
                  item={item}
                  service={false}
                  nextPoint={next}
                  close={close}
                />
              )}
              style={{
                flex: 1,
                paddingHorizontal: 20,
                marginTop: 20,
              }}
            />
          )}
        </>
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={clearSelectedService}>
          <Button
            text={"Clear"}
            textStyle={{ color: "#000", fontSize: 15 }}
            buttonStyle={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 10,
              borderBottomColor: "#000",
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServicesPanel;
