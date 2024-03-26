import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Feather } from "@expo/vector-icons";
import { LineChart, BarChart } from "react-native-chart-kit";

const Graph = ({ type, data, year, setYear, monthlyTotals }) => {
  const [displayMonths, setDisplayMonths] = useState([0, 1, 2, 3, 4, 5]); // Array of the first 6 months
  // Number of months to display initially

  // console.log(data);
  //   GENERATE LIST OF YEARS
  const generateArrayOfYears = () => {
    let max = new Date().getFullYear();
    let min = max - 3;
    let years = [];

    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  };

  const labels = data.map((item) => item.month);

  return (
    <View style={{ paddingVertical: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#454545",
            fontFamily: "Rubik-Regular",
            fontSize: 16,
          }}
        >
          {type}
        </Text>
        <SelectDropdown
          data={generateArrayOfYears()}
          dropdownOverlayColor="transparent"
          buttonStyle={{
            width: 90,
            height: 40,
            backgroundColor: "#F6F6F6",
            borderRadius: 10,
            padding: 0,
          }}
          buttonTextStyle={{
            fontFamily: "Rubik-Regular",
            fontSize: 13,
            textAlign: "left",
          }}
          renderDropdownIcon={() => (
            <Feather name="chevron-down" size={15} color="black" />
          )}
          defaultValue={year}
          onSelect={(selectedItem) => {
            setYear(selectedItem);
          }}
          rowStyle={{ paddingVertical: 7 }}
          rowTextStyle={{ fontSize: 14, fontFamily: "Rubik-Regular" }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            color: "#4BAF4F",
            fontFamily: "Rubik-Regular",
            fontSize: 16,
          }}
          onPress={() =>
            setDisplayMonths(
              displayMonths[0] === 0 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5]
            )
          }
        >
          {displayMonths[0] === 0 ? "See more" : "See less"}
        </Text>
      </View>

      <View style={{ backgroundColor: "#F6F6F6", paddingVertical: 20 }}>
        {data.length <= 1 ? (
          <>
            <BarChart
              data={{
                labels: [
                  "Jan",
                  "Feb",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ].filter((_, index) => displayMonths.includes(index)),
                datasets: [
                  {
                    data: monthlyTotals.filter((_, index) =>
                      displayMonths.includes(index)
                    ),
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get("window").width}
              height={180}
              yAxisLabel="$"
              showValuesOnTopOfBars
              withHorizontalLabels={false}
              yAxisInterval={2}
              chartConfig={{
                backgroundColor: "#474747",
                backgroundGradientFrom: "#F6F6F6",
                backgroundGradientTo: "#F6F6F6",
                fillShadowGradientTo: "#4BAF4F",
                fillShadowGradientFrom: "#4BAF4F",
                decimalPlaces: 0,

                propsForBackgroundLines: {
                  stroke: "#E1E1E1",
                  strokeWidth: 1,
                },
                propsForDots: {
                  r: "0",
                },
                color: (opacity = 1) => `#009C52`,
                labelColor: (opacity = 1) => `#474747`,
              }}
              style={{
                left: -50,
              }}
            />
          </>
        ) : (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 3,
            }}
          >
            <Text>No Statistics Yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Graph;
