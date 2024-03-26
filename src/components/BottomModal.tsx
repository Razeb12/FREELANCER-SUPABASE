

import React, { FC, ReactNode } from "react";
import { Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

interface BottomModalProps {
  children: ReactNode;
  refRBSheet: React.RefObject<RBSheet>;
  dragClose: boolean;
  allowNotification?: boolean;
  keyboardAvoidingViewEnabled?: boolean;
  height?: number;
}

const toastConfig = {
  success: (props: React.ComponentPropsWithoutRef<typeof BaseToast>) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#4BAF4F",
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        fontFamily: "Rubik-Regular",
        color: "#000",
      }}
      text2Style={{ fontSize: 12, fontFamily: "Rubik-Regular" }}
    />
  ),
  error: (props: React.ComponentPropsWithoutRef<typeof ErrorToast>) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        backgroundColor: "#fff",
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "#000",
        fontFamily: "Rubik-Regular",
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: "Rubik-Regular",
      }}
    />
  ),
};

const BottomModal: FC<BottomModalProps> = ({
  children,
  refRBSheet,
  dragClose,
  allowNotification = true,
  keyboardAvoidingViewEnabled = true,
  height,
}) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={dragClose}
      closeOnPressMask={true}
      keyboardAvoidingViewEnabled={keyboardAvoidingViewEnabled}
      customStyles={{
        wrapper: {},
        draggableIcon: {
          backgroundColor: "#000",
          display: "none",
        },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          overflow: "hidden",
        },
      }}
      height={height || Dimensions.get("screen").height - 100}
    >
      {children}
      {allowNotification && <Toast config={toastConfig} />}
    </RBSheet>
  );
};

export default BottomModal;
