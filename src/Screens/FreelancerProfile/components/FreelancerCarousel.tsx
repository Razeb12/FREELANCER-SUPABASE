import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Profile } from "../../../utils/types";

const FreelancerCarousel = ({ gallery }: { gallery: Profile }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <View style={{ width: "100%" }}>
      <Carousel
        loop={gallery.galleryPhotos?.length > 1 ? true : false}
        width={Dimensions.get("window").width}
        height={270}
        autoPlay={true}
        data={
          gallery.Gallery?.length > 0
            ? gallery.Gallery?.map((photo) => ({ name: photo }))
            : [{ name: require("../../../../assets/freelancer.png") }]
        }
        pagingEnabled={true}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setSlideIndex(index)}
        renderItem={({ index }) => (
          <Image
            source={
              gallery.Gallery?.length > 0
                ? { uri: gallery.Gallery[index].url }
                : require("../../../../assets/freelancer.png")
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: 17,
          width: "100%",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {gallery.galleryPhotos?.map((item, index) => (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 10 / 2,
                backgroundColor: slideIndex === index ? "#4BAF4F" : "#C4C4C4",
                marginLeft: index === 0 ? 0 : 20,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default FreelancerCarousel;
