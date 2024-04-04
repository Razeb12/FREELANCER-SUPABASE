import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Platform,
  View,
} from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  translucent?: boolean;
  animation?: ModalProps["animationType"];
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  setVisible,
  children,
  translucent = true,
  animation = "fade",
}) => {
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Modal
          animationType={animation}
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
          statusBarTranslucent={translucent}
        >
          <View style={{ flex: 1, backgroundColor: "#0000006B" }}>
            {children}
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ConfirmModal;
