import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import DirectionArrow from "../components/DirectionArrow";
import { useUserStore } from "../../Store/UserStore";
import { DEFAULT_GALLERY_IMAGE } from "../../config";
import { supabase } from "../../lib/supabase";

interface FreelancerPictureCarouselProps {
  loading?: boolean;
  onPress?: () => void;
}

const FreelancerPictureCarousel: React.FC<FreelancerPictureCarouselProps> = ({
  loading,
  onPress,
}) => {
  let carouselRef = useRef(null);
  const gallery = useUserStore((state) => state.gallery);
  const profile = useUserStore((state) => state.profile);
  const [slideIndex, setSlideIndex] = useState(0);

  const data = profile[0].Gallery?.map((item: { id: string; url: string, name: string }) => ({
    id: item.id,
    url: item.url,
    name: item.name
  }));

  const defaultGallery = [{ id: 1, photo: DEFAULT_GALLERY_IMAGE }];
  const [done, setDone] = useState<boolean>(false);
  const newData = data?.length <= 0 ? defaultGallery : data;
  // console.log(newData)

  const deleteImage = async (id: string, name: string) => {
    loading = true;
    console.log(name);

    const { error } = await supabase.from("Gallery").delete().eq("id", id);
    if (error) {
      console.log(error);
    } else {
      const { error: err } = await supabase.storage
        .from("avatars")
        .remove([`${profile[0]?.uid}/gallery/${name}`]);
      if (err) {
        console.log(err);
      } else {
        const galleryData = profile[0].Gallery.filter(
          (item: { id: string }) => item.id !== id
        );
        const updatedProfile = { ...profile[0], Gallery: galleryData };
        useUserStore.getState().setProfile([updatedProfile]);
      }
    }

    setDone(!done);
    loading = true;
  };

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Carousel
          ref={carouselRef}
          loop={newData?.length > 1 ? true : false}
          width={Dimensions.get("window").width - 20}
          height={220}
          autoPlay={true}
          data={newData}
          pagingEnabled={true}
          scrollAnimationDuration={2000}
          onSnapToItem={(index) => setSlideIndex(index)}
          renderItem={({ index }) => (
            <View style={{ width: "100%", paddingHorizontal: 5 }}>
              <Image
                key={newData[index].id}
                source={{
                  uri: newData[index].url,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            </View>
          )}
        />
        <View
          style={{
            position: "absolute",
            bottom: 15,
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
            {newData?.map((item: any, index: number) => (
              <View
                key={index.toString()}
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
      <DirectionArrow
        style={{ position: "absolute", top: 90, left: 30 }}
        onPress={() => {
          carouselRef.current.prev();
        }}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </DirectionArrow>
      <DirectionArrow
        style={{ position: "absolute", top: 90, right: 30 }}
        onPress={() => {
          carouselRef.current.next();
        }}
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </DirectionArrow>
      <View
        style={{
          width: Dimensions.get("screen").width - 40,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#D8D8D8",
          borderBottomWidth: 1,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            width: "75%",
          }}
        >
          {data?.length <= 0
            ? defaultGallery.map((item) => (
                <Image
                  key={item.id}
                  source={{ uri: item.url }}
                  style={{
                    width: 70,
                    height: 50,
                    marginRight: 15,
                    borderRadius: 10,
                  }}
                />
              ))
            : data?.map((item: { id: string; url: string; name: string }) => (
                <View key={item.id} style={{ marginRight: 20, marginTop: 10 }}>
                  <Image
                    source={{ uri: item.url }}
                    style={{
                      width: 70,
                      height: 50,
                      borderRadius: 10,
                    }}
                  />
                  <Pressable
                    onPress={() => deleteImage(item.id, item.name)}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 14 / 2,
                      backgroundColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: -5,
                      right: -5,
                      zIndex: 1,
                    }}
                  >
                    <Ionicons name="close" size={12} color="#fff" />
                  </Pressable>
                </View>
              ))}
        </ScrollView>
        <View
          style={{
            borderLeftColor: "#C4C4C4",
            borderLeftWidth: 1,
            height: 40,
            marginLeft: 5,
          }}
        />
        {loading ? (
          <View
            style={{
              width: "17%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size={"small"} color="#4BAF4FE0" />
          </View>
        ) : (
          <TouchableOpacity style={{ width: "17%" }} onPress={onPress}>
            <View
              style={{
                width: "100%",
                height: 50,
                backgroundColor: "#4BAF4FE0",
                marginLeft: 5,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FreelancerPictureCarousel;
