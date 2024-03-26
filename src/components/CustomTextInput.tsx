import React, { useState, FC } from "react";
import {
  TextInput,
  TextInputProps,
  TextStyle,
  StyleProp,
  KeyboardTypeOptions,
} from "react-native";

interface CustomTextInputProps extends Omit<TextInputProps, "onChangeText"> {
  placeholder?: string;
  setValue: (text: string) => void;
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: () => void;
  onFocus?: () => void;
  editable?: boolean;
  placeholderTextColor?: string;
}

const CustomTextInput: FC<CustomTextInputProps> = ({
  placeholder,
  value,
  setValue,
  style,
  keyboardType,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  onBlur = undefined,
  onFocus = undefined,
  editable = true,
  placeholderTextColor = "#C5C6D0",
}) => {
  const [active, setActive] = useState(false);

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={setValue}
      keyboardType={keyboardType || "default"}
      secureTextEntry={secureTextEntry}
      style={[
        {
          fontFamily: "Rubik-Regular",
          borderWidth: active ? 1 : 0,
          borderColor: active ? "#4BAF4F" : "transparent",
        },
        style,
      ]}
      multiline={multiline}
      numberOfLines={numberOfLines}
      onBlur={() => {
        setActive(false);
        onBlur && onBlur();
      }}
      editable={editable}
      onFocus={() => {
        setActive(true);
        onFocus && onFocus();
      }}
    />
  );
};

export default CustomTextInput;
