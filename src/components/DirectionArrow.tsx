// @ts-nocheck

import React, { ReactNode } from "react";
import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface DirectionArrowProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const DirectionArrow: React.FC<DirectionArrowProps> = ({
  style = {},
  children,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        padding: 5,
        borderRadius: 10,
        backgroundColor: "#F8F8F899",
        ...style,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

export default DirectionArrow;
