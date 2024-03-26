import React from "react";
import { Text, View } from "react-native";

const BookDetail = () => {


//   useEffect(() => {
//     getTotalPrice();
//   }, []);

//   const getPercentage = () => {
//     const result = 0.05 * Number(details.total_price);
//     return Math.round(result);
//   };

// const getTotalPrice = () => {
//   let totalPrice = Number(details.total_price) + getPercentage();
//   const roundedUp = Math.ceil((totalPrice + 4) / 5) * 5;
//   setDonate(Math.round(roundedUp - totalPrice));
//   getFullTotal(roundedUp);
//   setTotalPrice(roundedUp);
// };



  return (
    <>
      <View
        style={{
          width: "100%",
          backgroundColor: "#F6F6F6",
          borderRadius: 10,
        }}
      >
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#C4C4C4",
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "Rubik-Regular" }}>
            Booking Summary
          </Text>
        </View>
        {/* <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#C4C4C4",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Rubik-SemiBold",
                fontSize: 12,
              }}
            >
              {details.startDate} - {details.endDate}
            </Text>
            <Text
              style={{
                fontFamily: "Rubik-SemiBold",
                fontSize: 12,
              }}
            >
              {details.startTime} - {details.endTime}
            </Text>
          </View>
          {details.service && (
            <>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  paddingBottom: 10,
                }}
              >
                Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: "#717171",
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                  }}
                >
                  {details.service.skill}
                </Text>
                <Text
                  style={{
                    color: "#4BAF4F",
                    fontFamily: "Rubik-Regular",
                    fontSize: 14,
                  }}
                >
                  US ${details.service.price}/hr
                </Text>
              </View>
            </>
          )}

          {details.special_equipment.length > 0 && (
            <>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  paddingBottom: 10,
                }}
              >
                Special Equipment
              </Text>
              {details.special_equipment.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom:
                      index === details.special_equipment.length - 1 ? 20 : 10,
                  }}
                  key={index}
                >
                  <Text
                    style={{
                      color: "#717171",
                      fontFamily: "Rubik-Regular",
                      fontSize: 14,
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: "#4BAF4F",
                      fontFamily: "Rubik-Regular",
                      fontSize: 14,
                    }}
                  >
                    US ${item.price}/hr
                  </Text>
                </View>
              ))}
            </>
          )}

         
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // paddingBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  paddingRight: 7,
                }}
              >
                Round up and Donate
              </Text>
              <MaterialCommunityIcons
                name="information-outline"
                size={20}
                color="#4E4E4E"
                onPress={() => setVisible(true)}
              />
            </View>
            <View
              style={{
                padding: 10,
                borderColor: "#4BAF4F",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  // color: "#949494",
                  fontFamily: "Rubik-Regular",
                  fontSize: 14,
                  marginLeft: 4,
                }}
              >
                $
              </Text>
              <CustomTextInput
                value={donate.toString()}
                style={{ width: "auto", paddingRight: 0 }}
                editable={false}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
          >
            Total
          </Text>
          <Text
            style={{
              color: "#4BAF4F",
              fontFamily: "Rubik-Regular",
              fontSize: 14,
            }}
          >
            US ${totalPrice}
          </Text>
        </View> */}
      </View>
      {/* <ConfirmModal visible={visible} setVisible={setVisible}>
        <View
          style={{
            width: "90%",
            marginLeft: "5%",
            backgroundColor: "#fff",
            marginTop: 100,
            borderRadius: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              height: 50,
              backgroundColor: "#F2F2F2",
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "400" }}>
              Round up & Donate
            </Text>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
              onPress={() => setVisible(false)}
            />
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: 20,
              color: "#464646",
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
              est mi ut nibh lobortis libero id pulvinar. Ullamcorper in mauris
              sociis tincidunt vitae ligula. Enim.
            </Text>
          </View>
        </View>
      </ConfirmModal> */}
    </>
  );
};

export default BookDetail;
