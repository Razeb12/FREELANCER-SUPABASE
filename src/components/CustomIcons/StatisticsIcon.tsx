import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";

const StatisticsIcon = () => {
  return (
    <View>
      <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
        <Path
          d="M14.3571 15.6429V7.92857M4.07143 1.5H16.9286C17.6106 1.5 18.2646 1.77092 18.7468 2.25315C19.2291 2.73539 19.5 3.38944 19.5 4.07143V16.9286C19.5 17.6106 19.2291 18.2646 18.7468 18.7468C18.2646 19.2291 17.6106 19.5 16.9286 19.5H4.07143C3.38944 19.5 2.73539 19.2291 2.25315 18.7468C1.77092 18.2646 1.5 17.6106 1.5 16.9286V4.07143C1.5 3.38944 1.77092 2.73539 2.25315 2.25315C2.73539 1.77092 3.38944 1.5 4.07143 1.5V1.5ZM6.64286 15.5593V5.35714V15.5593ZM10.5 15.6236V10.5V15.6236Z"
          stroke="#454545"
          stroke-width="1.3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
};

export default StatisticsIcon;
