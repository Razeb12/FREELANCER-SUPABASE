import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Text,
    TextInput,
    TextInputProps,
    View
} from "react-native";

interface EditableTextInputProps extends TextInputProps {
  label: string;
  value: string;
  setValue: (text: string) => void;
}

const EditableTextInput: React.FC<EditableTextInputProps> = ({
  label,
  value,
  setValue,
}) => {
  return (
    <>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "Rubik-Regular",
          color: "#9E9E9E",
          //   marginBottom: 10,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          borderBottomColor: "#D9D9D9",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <TextInput
          style={{
            paddingVertical: 10,
            fontFamily: "Rubik-Regular",
            fontSize: 14,
            width: "85%",
            backgroundColor: "#fff",
            color: "#000",
          }}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        <MaterialIcons name="mode-edit" size={24} color="#4BAF4F" />
      </View>
    </>
  );
};

export default EditableTextInput;
