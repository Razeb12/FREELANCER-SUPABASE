import { StyleSheet } from "react-native"
import {
	RFPercentage,
	heightPercentageToDP,
	widthPercentageToDP,
} from "../../utils/responsiveness.helpers"

export default StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		flex: 1,
	},
	scrollContainer: {
		paddingTop: heightPercentageToDP(5),
		paddingHorizontal: widthPercentageToDP(5),
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: widthPercentageToDP(5),
	},
	headerTitle: {
		marginLeft: widthPercentageToDP(5),
		fontSize: RFPercentage(2.5),
	},
	boxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	infoContainer: {
		marginLeft: widthPercentageToDP(5),
	},
	distanceText: {
		marginVertical: heightPercentageToDP(1),
	},
	ratings: {
		flexDirection: "row",
		alignItems: "center",
	},
	star: {
		marginRight: widthPercentageToDP(1),
	},
	textInfo: {},
	divider: {
		height: heightPercentageToDP(0.1),
		marginVertical: heightPercentageToDP(2),
		backgroundColor: "rgba(217, 217, 217, 1)",
	},
	summaryContainer: {
		backgroundColor: "#F6F6F6",
		borderRadius: 10,
		paddingVertical: heightPercentageToDP(2),
	},
	summaryTitle: {
		paddingHorizontal: widthPercentageToDP(5),
		fontSize: RFPercentage(2.5),
	},
	summaryContent: {
		paddingHorizontal: widthPercentageToDP(5),
	},
	sections: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: RFPercentage(1.7),
	},
	sectionInfo: {
		fontSize: RFPercentage(1.4),
		color: "#4B5563",
	},
	sectionPrice: {
		fontSize: RFPercentage(1.7),
		color: "#4BAF4F",
	},
	inputContainer: {
		borderColor: "#4BAF4F",
		borderWidth: 1,
		borderRadius: 10,
		width: widthPercentageToDP(10),
		height: heightPercentageToDP(5),
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	input: {
		color: "rgba(107, 114, 128, 0.59)",
	},
	payment: {
		marginTop: heightPercentageToDP(5),
	},
	button: {
		marginTop: heightPercentageToDP(5),
		backgroundColor: "#4BAF4F",
		justifyContent: "center",
		alignItems: "center",
		height: heightPercentageToDP(6),
		borderRadius: 10,
	},
	buttonText: {
		color: "#fff",
	},
	gap: {
		height: heightPercentageToDP(5),
	},
	radioContainer: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#D9D9D9",
		backgroundColor: "#fff",
		marginRight: widthPercentageToDP(8),
		justifyContent: "center",
		alignItems: "center",
	},
	radio: {
		width: 15,
		height: 15,
		borderRadius: 10,
		backgroundColor: "#4BAF4F",
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
	},
	selectCard: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: heightPercentageToDP(2),
		height: heightPercentageToDP(7),
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#4BAF4F",
		paddingHorizontal: widthPercentageToDP(5),
		borderRadius: 10,
	},
	cardNumber: {
		color: "#6B7280",
	},
	paymentTypeContainer: {
		backgroundColor: "#000",
		width: widthPercentageToDP(15),
		height: heightPercentageToDP(5),
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	paymentTypeText: {
		color: "#fff",
	},
	cardNumberContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#4BAF4F",
		height: heightPercentageToDP(7),
		paddingHorizontal: widthPercentageToDP(5),
		marginTop: heightPercentageToDP(2),
	},
	cardInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: heightPercentageToDP(2),
	},
	cardInfoFields: {
		width: "45%",
		height: heightPercentageToDP(7),
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#4BAF4F",
		paddingHorizontal: widthPercentageToDP(5),
	},
})
