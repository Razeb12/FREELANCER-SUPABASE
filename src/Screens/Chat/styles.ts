import { StyleSheet } from "react-native"
import {
	RFPercentage,
	heightPercentageToDP,
	widthPercentageToDP,
} from "../../utils/responsiveness.helpers"

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: widthPercentageToDP(5),
		paddingTop: heightPercentageToDP(2),
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5",
	},
	pageTitle: { fontSize: RFPercentage(2.5), fontWeight: "500" },
	switchButton: {
		width: widthPercentageToDP(40),
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		height: heightPercentageToDP(6),
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	switchContainer: {
		flexDirection: "row",
		marginTop: heightPercentageToDP(7),
		justifyContent: "center",
	},
	switchText: {
		fontSize: RFPercentage(1.7),
		color: "#fff",
		textTransform: "capitalize",
	},
	contentContainer: {
		paddingHorizontal: widthPercentageToDP(5),
		paddingVertical: heightPercentageToDP(3),
		height: heightPercentageToDP(71),
	},
	searchInput: {
		height: heightPercentageToDP(6),
		paddingHorizontal: widthPercentageToDP(5),
		backgroundColor: "#fff",
		borderRadius: 6,
		shadowColor: "#999",
		elevation: 6,
		shadowRadius: 6,
		marginBottom: heightPercentageToDP(2),
	},
	chatCard: {
		paddingHorizontal: widthPercentageToDP(5),
		borderRadius: 6,
		shadowColor: "#999",
		elevation: 6,
		shadowRadius: 6,
		height: heightPercentageToDP(7),
		paddingVertical: heightPercentageToDP(1),
		backgroundColor: "#fff",
		marginTop: heightPercentageToDP(2),
	},
	chatCardUser: {
		fontWeight: "500",
		fontSize: RFPercentage(2),
	},
	chatCardText: {
		color: "#666",
		fontSize: RFPercentage(1.5),
		marginTop: heightPercentageToDP(0.5),
	},
	chatContentContainer: {
		height: heightPercentageToDP(80),
		paddingHorizontal: widthPercentageToDP(5),
		paddingVertical: heightPercentageToDP(2),
	},
	bottomContainer: {
		flexDirection: "row",
		height: heightPercentageToDP(5),
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fff",
	},
	input: {
		height: "100%",
		width: widthPercentageToDP(85),
		backgroundColor: "#fafafa",
		paddingHorizontal: widthPercentageToDP(5),
		borderRadius: 20,
	},
	send: {
		alignItems: "center",
		justifyContent: "center",
		height: heightPercentageToDP(5),
		width: widthPercentageToDP(15),
		backgroundColor: "#4BAF4F",
	},
	sendText: {
		color: "#fff",
	},
	chatHeader: {
		paddingHorizontal: widthPercentageToDP(5),
		height: heightPercentageToDP(5),
		backgroundColor: "#fafafa",
		borderBottomColor: "#666",
		justifyContent: "center",
	},
	chatBubble: {
		maxWidth: widthPercentageToDP(60),
		paddingHorizontal: widthPercentageToDP(2),
		paddingVertical: heightPercentageToDP(1),
		backgroundColor: "#fafafa",
		marginTop: heightPercentageToDP(2),
	},
	title: {
		fontSize: RFPercentage(2),
		fontWeight: "500",
	},
})
