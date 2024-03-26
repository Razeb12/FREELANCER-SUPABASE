import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "../../../components/Button";
import RangeSlider from "../../../components/RangeSlider/RangeSlider";


type FilterProps = {
  close: () => void;
  fromValuePrice: number;
  setFromValuePrice: (value: number) => void;
  toValuePrice: number;
  setToValuePrice: (value: number) => void;
  fromValueRate: number;
  setFromValueRate: (value: number) => void;
  toValueRate: number;
  setToValueRate: (value: number) => void;
  lowestValue: number;
  highestValue: number;
  lowestRate: number;
  highestRate: number;
};

const Filter = ({
  close,
  fromValuePrice,
  setFromValuePrice,
  toValuePrice,
  setToValuePrice,
  fromValueRate,
  setFromValueRate,
  toValueRate,
  setToValueRate,
  lowestValue,
  highestValue,
  lowestRate,
  highestRate,
}: FilterProps) => {
  const reset = () => {
    setFromValueRate(0);
    setToValueRate(5);
    close();
  };

  const applyFilter = () => {
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
          marginBottom: 20,
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
      <View style={{ alignItems: "flex-end", marginHorizontal: 20 }}>
        <TouchableOpacity onPress={reset}>
          <Text
            style={{
              fontSize: 12,
              color: "#4BAF4F",
              fontFamily: "Rubik-Regular",
            }}
          >
            Reset
          </Text>
        </TouchableOpacity>
      </View>

      {lowestValue !== highestValue ? (
        <>
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              Prices
            </Text>
            <RangeSlider
              setLow={(min) => setFromValuePrice(min)}
              setHigh={setToValuePrice}
              min={lowestValue}
              max={highestValue}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              top: 40,
            }}
          >
            <View
              style={{
                width: 100,
                backgroundColor: "#E1F0E1",
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 7,
              }}
            >
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                ${fromValuePrice}
              </Text>
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                -
              </Text>
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                ${toValuePrice}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Price
          </Text>
          <Text style={{ textAlign: "center", fontFamily: "Rubik-Regular" }}>
            All freelancers have same price of ${highestValue}.
          </Text>
        </View>
      )}
      {lowestRate !== highestRate ? (
        <>
          <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 40 }}>
            <Text
              style={{
                fontFamily: "Rubik-Regular",
                fontSize: 14,
                marginBottom: 10,
              }}
            >
              Rating
            </Text>
            <RangeSlider
              setLow={setFromValueRate}
              setHigh={setToValueRate}
              min={lowestRate}
              max={highestRate}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              top: 40,
            }}
          >
            <View
              style={{
                width: 100,
                backgroundColor: "#E1F0E1",
                paddingVertical: 15,
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 7,
                marginBottom: 70,
              }}
            >
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                {fromValueRate}
              </Text>
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                -
              </Text>
              <Text style={{ color: "#4BAF4F", fontFamily: "Rubik-Regular" }}>
                {toValueRate}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Rating
          </Text>
          <Text style={{ textAlign: "center" }}>
            All freelancers have same ratings of {highestRate} stars.
          </Text>
        </View>
      )}

      <TouchableOpacity
        onPress={applyFilter}
        style={{ width: "90%", marginHorizontal: "5%" }}
      >
        <Button
          text={"Apply"}
          buttonStyle={{ backgroundColor: "#4BAF4F", borderRadius: 10 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default memo(Filter);
