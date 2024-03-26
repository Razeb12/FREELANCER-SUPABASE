import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import BackSvg from "../../../assets/RNSVG/backSvg";
import { useState } from "react";
import CardSvg from "../../../assets/RNSVG/cardSvg";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "../../utils/responsiveness.helpers";
import { TextInput } from "react-native-gesture-handler";
import { supabase } from "../../../lib/supabase";
import { CardField, CardForm } from "@stripe/stripe-react-native";

const PaymentMethod = ({ navigation }: { navigation: any; route: any }) => {
  const [addNewCard, setAddNewCard] = useState(false);
  const [iban, setIban] = useState("");
  const [expiry, setExpiry] = useState("");
  const [code, setCode] = useState("");

  const addCard = async () => {
    if (iban && expiry && code) {
      const { data, error } = await supabase
        .from("Cards")
        .insert({ number: Number(iban), expiry_date: expiry, code: code })
        .select();

      if (error) {
        console.log(error);
      } else {
        console.log(data);
        setIban(""), setExpiry(""), setCode("");
      }
    }
  };

  console.log(iban, expiry, code);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackSvg
          onPress={() =>
            addNewCard ? setAddNewCard(false) : navigation.goBack()
          }
        />
        <Text style={styles.headerTitle}>
          {addNewCard ? "New Card" : "Add Payment Method"}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {addNewCard ? (
          <>
            <CardForm
              placeholders={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={{
                backgroundColor: "#FFFFFF",
                textColor: "#000000",
                borderColor: "#000000",
              }}
              style={{
                width: "100%",
                height: 200,
                marginVertical: 30,
              }}
              onFormComplete={(cardDetails) => {
                console.log(cardDetails);
              
              }}
            />
            <Text>Card details</Text>
            <View style={styles.cardNumberContainer}>
              <CardSvg style={{ marginRight: widthPercentageToDP(8) }} />
              <TextInput
                placeholder="Card number"
                placeholderTextColor={"#6B7280"}
                onChangeText={(text) => setIban(text)}
              />
            </View>
            <View style={styles.cardInfo}>
              <TextInput
                placeholder="Expiry date"
                placeholderTextColor={"#6B7280"}
                style={styles.cardInfoFields}
                onChangeText={(text) => setExpiry(text)}
              />
              <TextInput
                placeholder="Secure code"
                placeholderTextColor={"#6B7280"}
                style={styles.cardInfoFields}
                onChangeText={(text) => setCode(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => addCard()}
              style={{
                ...styles.button,
                marginTop: heightPercentageToDP(2),
              }}
            >
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text>Setup Options</Text>
            {/* <TouchableOpacity style={styles.selectCard}>
              <View style={styles.left}>
                <View style={styles.radioContainer}>
                  <View style={styles.radio} />
                </View>
                <Text style={styles.cardNumber}>Stripe</Text>
              </View>
              <View style={styles.paymentTypeContainer}>
                <Text style={styles.paymentTypeText}>Stripe</Text>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.selectCard}>
              <View style={styles.left}>
                <View style={styles.radioContainer}>
                  <View style={styles.radio} />
                </View>
                <Text style={styles.cardNumber}>Paypal</Text>
              </View>
              <View style={styles.paymentTypeContainer}>
                <Text style={styles.paymentTypeText}>Paypal</Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.selectCard}
              onPress={() => setAddNewCard(true)}
            >
              <View style={styles.left}>
                <CardSvg
                  style={{
                    marginRight: widthPercentageToDP(8),
                  }}
                />
                <Text style={styles.cardNumber}>Debit/Credit Card</Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethod;
