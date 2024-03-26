/** @format */

import React from "react"
import { TextStyle, ViewStyle, View, Text } from "react-native"

interface ButtonProps {
	buttonStyle?: ViewStyle
	text: string
	textStyle?: TextStyle
	icon?: JSX.Element
	position?: string
}

export const Button = ({
	buttonStyle,
	text,
	textStyle,
	icon,
	position,
}: ButtonProps) => {
	return (
		<View
			style={{
				width: "100%",
				paddingVertical: 15,
				justifyContent: "center",
				alignItems: "center",
				...buttonStyle,
			}}
		>
			{!icon ? (
				<Text
					style={{
						color: "#fff",
						fontSize: 14,
						fontFamily: "Rubik-Regular",
						...textStyle,
					}}
				>
					{text}
				</Text>
			) : position === "left" ? (
				<View style={{ flexDirection: "row" }}>
					{icon}
					<Text
						style={{
							color: "#fff",
							fontSize: 14,
							fontFamily: "Rubik-Regular",
							...textStyle,
						}}
					>
						{text}
					</Text>
				</View>
			) : (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text
						style={{
							color: "#fff",
							fontSize: 14,
							fontFamily: "Rubik-Regular",
							...textStyle,
						}}
					>
						{text}
					</Text>
					{icon}
				</View>
			)}
		</View>
	)
}
