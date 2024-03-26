
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Text, View } from "react-native"

const SortCard = ({ value, status }: { value: string, status: boolean }) => {
	return (
		<View
			style={{
				width: "100%",
				paddingHorizontal: 20,
				paddingVertical: 10,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<Text>{value}</Text>
			{status && (
				<Ionicons name="checkmark-sharp" size={24} color="#4BAF4F" />
			)}
		</View>
	)
}

export default SortCard
