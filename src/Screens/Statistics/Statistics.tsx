import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Graph from "./components/Graph";
import TotalCard from "./components/TotalCard";

import moment from "moment";
import { useUserStore } from "../../../Store/UserStore";
import { supabase } from "../../../lib/supabase";

const Statistics = ({ navigation }: { navigation: any }) => {
  const [content, setContent] = useState("user");
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState();
  const profile = useUserStore((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [userTotalAmount, setUserTotalAmount] = useState<number>();
  const [freelancerTotalAmount, setFreelancerTotalAmount] = useState<number>();
  const [userLength, setUserLength] = useState<number>();
  const [freelancerLength, setFreelancerLength] = useState<number>();
  const [monthlyTotals, setMonthlyTotals] = useState([0, 0, 0, 0, 0, 0]);
  const [formattedMonthlyTotals, setFormattedMonthlyTotals] = useState([
    "$0.00",
    "$0.00",
    "$0.00",
    "$0.00",
    "$0.00",
    "$0.00",
  ]);

  useEffect(() => {
    if (content === "user") {
      fetchFreelancers();
    } else {
      fetchUsers();
    }

    // Cleanup function
    return () => {};
  }, [content, year]);

  const fetchFreelancers = async () => {
    setLoading(true);

    const { data: bookedFreelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("bookingId", profile[0].uid);
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }

    let usersArray = bookedFreelancers;
    usersArray = usersArray?.filter(
      (user) => moment(user.created_at).year() === year
    );

    usersArray = usersArray?.sort((a, b) => b.created_at - a.created_at);
    const totalAmount = usersArray.reduce(
      (total, user) => total + user.amount,
      0
    );
    // Calculate the total amount for each month
    const monthlyTotals = Array(12).fill(0);
    usersArray.forEach((user) => {
      const month = moment(user.created_at).month(); // Get the month of the createdAt date (0 for January, 1 for February, etc.)
      if (month < 6) {
        // If the month is from January to June
        monthlyTotals[month] += user.amount; // Add the user's amount to the total for that month
      }
    });
    const formattedTotals = monthlyTotals.map(
      (total) => `$${total.toFixed(2)}`
    );

    setUserLength(usersArray.length);
    setFormattedMonthlyTotals(formattedTotals);
    setUserTotalAmount(totalAmount); // Store the total amount
    setMonthlyTotals(monthlyTotals); // Store the monthly totals
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    const { data: freelancers, error: err } = await supabase
      .from("Bookings")
      .select("*")
      .eq("freelancerId", profile[0].uid)
      .eq("status", "Completed");
    // .neq("uid", session?.user.user_metadata.sub);
    if (err) {
      console.log(err);
    }
    setFreelancerLength(freelancers?.length);
    let usersArray = freelancers;
    usersArray = usersArray?.filter(
      (user) => moment(user.created_at).year() === year
    );

    usersArray = usersArray?.sort((a, b) => b.created_at - a.created_at);
    const totalAmount = usersArray.reduce(
      (total, user) => total + user.amount,
      0
    );
    // Calculate the total amount for each month
    const monthlyTotals = Array(12).fill(0);
    usersArray.forEach((user) => {
      const month = moment(user.created_at).month(); // Get the month of the createdAt date (0 for January, 1 for February, etc.)
      if (month < 6) {
        // If the month is from January to June
        monthlyTotals[month] += user.amount; // Add the user's amount to the total for that month
      }
    });
    const formattedTotals = monthlyTotals.map(
      (total) => `$${total.toFixed(2)}`
    );

    setFreelancerLength(usersArray.length);
    setMonthlyTotals(monthlyTotals);
    setFreelancerTotalAmount(totalAmount); // Store the total amount
    setLoading(false);

    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FBFBFBE5" }}>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 25,
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="chevron-back-outline"
          size={27}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{ fontSize: 22, fontFamily: "Rubik-Regular", marginLeft: 20 }}
        >
          Statistics
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: 20,
          borderBottomColor: "#CFCFCF",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 40,
              paddingVertical: 15,
              backgroundColor: content === "user" ? "#4BAF4F" : "transparent",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => setContent("user")}
          >
            <Text
              style={{
                color: content === "user" ? "#fff" : "#767676",
                fontSize: 12,
                fontFamily: "Rubik-Regular",
              }}
            >
              User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 15,
              backgroundColor:
                content === "freelancer" ? "#4BAF4F" : "transparent",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            onPress={() => setContent("freelancer")}
          >
            <Text
              style={{
                color: content === "freelancer" ? "#fff" : "#767676",
                fontFamily: "Rubik-Regular",
                fontSize: 12,
              }}
            >
              Freelancer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#4BAF4F" />
        </View>
      ) : (
        <>
          {content === "user" ? (
            <ScrollView>
              <Graph
                type="Expenses"
                monthlyTotals={monthlyTotals}
                year={year}
                setYear={setYear}
                data={data?.graph || []}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 40,
                  paddingHorizontal: 15,
                }}
              >
                <TotalCard title="Total Bookings" amount={userLength || 0} />
                <TotalCard
                  title="Total Expenses"
                  amount={userTotalAmount?.toLocaleString("en-US") || 0}
                  showSymbol={true}
                />
              </View>
            </ScrollView>
          ) : (
            <ScrollView>
              <Graph
                monthlyTotals={monthlyTotals}
                type="Income"
                year={year}
                setYear={setYear}
                data={data?.graph || []}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 40,
                  paddingHorizontal: 15,
                }}
              >
                <TotalCard
                  title="Total Bookings"
                  amount={freelancerLength || 0}
                />
                <TotalCard
                  title="Total Income"
                  amount={freelancerTotalAmount?.toLocaleString("en-US") || 0}
                  showSymbol={true}
                />
              </View>
            </ScrollView>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Statistics;
