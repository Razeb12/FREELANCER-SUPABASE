import React from "react";
import { Dimensions, FlatList, Platform, Text, View } from "react-native";
import FreelancerCard from "./FreelancerCard";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import ProfileCard from "./ProfileCard";
import { Profile } from "../../../utils/types";

const FreelancersResult = ({
  navigation,
  freelancers,
  selectedFreelancer,
  setSelectedFreelancer,
}: {
  freelancers: Profile[];
  navigation: any;
  selectedFreelancer: string | "";
  setSelectedFreelancer: Function;
}) => {
  const modalPopup = Dimensions.get("window").height - 225;
  const translateYSharedValue = useSharedValue(modalPopup);
  const isGestureActive = useSharedValue(false);
  const context = useSharedValue({ y: 0 });


  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateYSharedValue.value };
      isGestureActive.value = true;
    })
    .onUpdate(({ translationY }) => {
      let sumTranslationY = translationY + context.value.y;
      if (sumTranslationY <= modalPopup && sumTranslationY >= 0) {
        translateYSharedValue.value = sumTranslationY;
      }
    })
    .onEnd(() => {
      if (translateYSharedValue.value > 500) {
        translateYSharedValue.value = withTiming(modalPopup, {
          duration: 200,
        });
        isGestureActive.value = false;
      } else if (translateYSharedValue.value <= 400) {
        translateYSharedValue.value = withTiming(0, { duration: 200 });
        isGestureActive.value = false;
      }
      isGestureActive.value = false;
      // console.log(translateYSharedValue.value);
    });

  const rBottomSheet = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateYSharedValue.value }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: "100%",
          width: "100%",
          position: "absolute",
          bottom: isGestureActive.value ? 0 : Platform.OS === "ios" ? 0 : 0,
          transform: [
            {
              translateY: modalPopup,
            },
          ],
        },
        rBottomSheet,
      ]}
    >
      {selectedFreelancer && (
        <>
          {freelancers.map((freelancer) => (
            <ProfileCard
              key={freelancer.id}
              freelancers={freelancer}
              selectedFreelancer={selectedFreelancer}
              setSelectedFreelancer={setSelectedFreelancer}
              navigation={navigation}
            />
          ))}
        </>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <GestureDetector gesture={gesture}>
          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  padding: 2,
                  borderRadius: 5,
                  backgroundColor: "#C4C4C4",
                  marginVertical: 15,
                }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontFamily: "Rubik-Regular",
                marginBottom: 15,
              }}
            >
              All freelancers found
            </Text>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: "90%",
                  padding: 1,
                  backgroundColor: "#E3E3E3",
                }}
              />
            </View>
          </View>
        </GestureDetector>

        <FlatList
          data={freelancers.length > 0 ? freelancers : []}
          renderItem={({ item }) => (
            <FreelancerCard item={item} navigation={navigation} />
          )}
          onScroll={(event) => {
            translateYSharedValue.value = 0;
          }}
          keyExtractor={(item) => item.id}
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        />
      </View>
    </Animated.View>
  );
};

export default FreelancersResult;
