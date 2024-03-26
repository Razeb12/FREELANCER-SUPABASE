import React, { memo, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Profile } from "../../../utils/types";

const About = ({ details }: { details: Profile }) => {
  const [bioLength, setBioLength] = useState(120);

  const handleBioLength = () => {
    if (bioLength <= 120) {
      setBioLength(details.bio?.length);
    } else {
      setBioLength(120);
    }
  };
  return (
    <>
      <Text style={{ fontFamily: "Rubik-Regular", fontSize: 13 }}>
        {details?.bio?.length > bioLength
          ? `${details?.bio.substring(0, bioLength)}...`
          : details.bio}
      </Text>
      {details?.bio?.length > 120 && (
        <>
          {details?.bio?.length > bioLength ? (
            <TouchableOpacity onPress={handleBioLength}>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  color: "#4BAF4F",
                }}
              >
                See More
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleBioLength}>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  color: "#4BAF4F",
                }}
              >
                See Less
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

export default memo(About);
