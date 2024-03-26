import React, { memo } from "react"
import { Image, Text, View } from "react-native"

const Details = ({ name, distance, profileImage }: {name: string, distance:number,  profileImage :string}) => {
	return (
		<View
			style={{
				width: "100%",
				borderBottomColor: "#C4C4C4",
				borderBottomWidth: 1,
				paddingVertical: 20,
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<Image
				source={{ uri: profileImage }}
				style={{ width: 140, height: 100, borderRadius: 10 }}
			/>
			<View
				style={{
					paddingHorizontal: 10,
					justifyContent: "space-evenly",
					height: 100,
				}}
			>
				<Text style={{ fontSize: 16, fontFamily: "Rubik-Regular" }}>
					Diego Prime
				</Text>
				{distance !== null && (
					<Text style={{ fontSize: 14, fontFamily: "Rubik-Regular" }}>
						{distance}km away
					</Text>
				)}
				{/* <View style={{ flexDirection: "row", alignItems: "center" }}>
					<AntDesign name="star" size={20} color="#4BAF4F" />
					<Text
						style={{ marginLeft: 5, fontFamily: "Rubik-Regular" }}
					>
						{rateStar >= 1 || rateCount >= 1 ? (
							<>
								{rateStar}({rateCount})
							</>
						) : (
							"No reviews yet"
						)}
					</Text>
				</View> */}
			</View>
		</View>
	)
}

export default memo(Details)
