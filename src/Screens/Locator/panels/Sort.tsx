import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SortCard from "../components/SortCard";

import { Profile } from "../../../utils/types";
import { useServiceStore } from "../../../../Store/ServiceStore";
import { useUserStore } from "../../../../Store/UserStore";

const Sort = ({ close, sortData }: { close: () => void; sortData: any }) => {
  const serviceStore = useServiceStore();
  const userStore = useUserStore();

  const mainSortList = [
    { value: "Price low to high", status: false },
    { value: "Price high to low", status: false },
    { value: "Rating low to high", status: false },
    { value: "Rating high to low", status: false },
  ];

  const [sortList, setSortList] = useState(mainSortList);
  const [data] = useState(sortData);

  // console.log(sortData[0].Skills);

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
        <Text style={{ fontSize: 16, fontWeight: "400" }}>Sort by</Text>
        <MaterialCommunityIcons
          name="window-close"
          size={24}
          color="black"
          onPress={() => close()}
        />
      </View>
      {sortList.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => {
            if (sortData.length !== 0) {
              let sortedFreelancers;
              if (item.value === "Price low to high") {
                sortedFreelancers = [...sortData].sort((a, b) => {
                  const skillA =
                    a.Skills && a.Skills.length > 0
                      ? a.Skills.reduce(
                          (prev, curr) => (prev.rate > curr.rate ? prev : curr),
                          { rate: 0 }
                        )
                      : { rate: 0 };
                  const skillB =
                    b.Skills && b.Skills.length > 0
                      ? b.Skills.reduce(
                          (prev, curr) => (prev.rate > curr.rate ? prev : curr),
                          { rate: 0 }
                        )
                      : { rate: 0 };
                  return skillA.rate - skillB.rate;
                });
              } else if (item.value === "Price high to low") {
                sortedFreelancers = [...sortData].sort((a, b) => {
                  const skillA =
                    a.Skills && a.Skills.length > 0
                      ? a.Skills.reduce(
                          (prev, curr) => (prev.rate > curr.rate ? prev : curr),
                          { rate: -Infinity }
                        )
                      : { rate: -Infinity };
                  const skillB =
                    b.Skills && b.Skills.length > 0
                      ? b.Skills.reduce(
                          (prev, curr) => (prev.rate > curr.rate ? prev : curr),
                          { rate: -Infinity }
                        )
                      : { rate: -Infinity };
                  return skillB.rate - skillA.rate;
                });
              } else if (item.value === "Rating high to low") {
                sortedFreelancers = [...sortData].sort((a, b) => {
                  const ratingA =
                    a.Reviews && a.Reviews.length > 0
                      ? a.Reviews.reduce(
                          (prev, curr) => prev + curr.rating,
                          0
                        ) / a.Reviews.length
                      : 0;
                  const ratingB =
                    b.Reviews && b.Reviews.length > 0
                      ? b.Reviews.reduce(
                          (prev, curr) => prev + curr.rating,
                          0
                        ) / b.Reviews.length
                      : 0;
                  return ratingB - ratingA;
                });
              } else if (item.value === "Rating low to high") {
                sortedFreelancers = [...sortData].sort((a, b) => {
                  const ratingA =
                    a.Reviews && a.Reviews.length > 0
                      ? a.Reviews.reduce(
                          (prev, curr) => prev + curr.rating,
                          0
                        ) / a.Reviews.length
                      : 0;
                  const ratingB =
                    b.Reviews && b.Reviews.length > 0
                      ? b.Reviews.reduce(
                          (prev, curr) => prev + curr.rating,
                          0
                        ) / b.Reviews.length
                      : 0;
                  return ratingA - ratingB;
                });
              }

              userStore.setFreelancers(sortedFreelancers as Profile[]);
              close();
            }
          }}
        >
          <SortCard value={item.value} status={item.status} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sort;
