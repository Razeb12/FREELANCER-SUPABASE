import { View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

interface CookSvgProps extends SvgProps {
  style?: StyleProp<ViewStyle>;
  color: string;
}

const CookSvg: React.FC<CookSvgProps> = ({ style, color }) => {
  return (
    <View style={style}>
      <Svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
      >
        <Path
          d="M3 4.19217C4.10457 4.19217 5 3.38292 5 2.38466C5 1.3864 4.10457 0.577148 3 0.577148C1.89543 0.577148 1 1.3864 1 2.38466C1 3.38292 1.89543 4.19217 3 4.19217Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 4.19217C11.1046 4.19217 12 3.38292 12 2.38466C12 1.3864 11.1046 0.577148 10 0.577148C8.89543 0.577148 8 1.3864 8 2.38466C8 3.38292 8.89543 4.19217 10 4.19217Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 4.19217C18.1046 4.19217 19 3.38292 19 2.38466C19 1.3864 18.1046 0.577148 17 0.577148C15.8954 0.577148 15 1.3864 15 2.38466C15 3.38292 15.8954 4.19217 17 4.19217Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3 15.0369C4.10457 15.0369 5 14.2276 5 13.2294C5 12.2311 4.10457 11.4219 3 11.4219C1.89543 11.4219 1 12.2311 1 13.2294C1 14.2276 1.89543 15.0369 3 15.0369Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10 15.0369C11.1046 15.0369 12 14.2276 12 13.2294C12 12.2311 11.1046 11.4219 10 11.4219C8.89543 11.4219 8 12.2311 8 13.2294C8 14.2276 8.89543 15.0369 10 15.0369Z"
          stroke={color}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 4.19238V5.99989C17 6.47928 16.7893 6.93902 16.4142 7.278C16.0391 7.61697 15.5304 7.80741 15 7.80741H3M3 4.19238V11.4224V4.19238ZM10 4.19238V11.4224V4.19238Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};

export default CookSvg;
