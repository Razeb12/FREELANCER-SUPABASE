import { View, Text, TouchableOpacity } from "react-native";
import React, { memo, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SortCard from "../../Locator/components/SortCard";
const sortData = [
  { value: "All", status: "all" },
  { value: "Completed", status: "completed" },
  { value: "Pending", status: "pending" },
  { value: "Upcoming", status: "upcoming" },
];

const Filter = ({ close, onSortChange }) => {
  const [sort] = useState(sortData);

  const [selectedSort, setSelectedSort] = useState();

  const selectSort = (idx) => {
    setSelectedSort(idx);
    onSortChange(sort[idx].value);
    close();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FBFBFB" }}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#F2F2F2",
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "400" }}>Filter</Text>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={() => close()}
        />
      </View>
      {sort?.map((item, idx) => (
        <TouchableOpacity key={idx} onPress={() => selectSort(idx)}>
          <SortCard value={item.value} status={selectedSort === idx} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default memo(Filter);
