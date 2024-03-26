import {
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./styles"
import { useState } from "react"
import { chatAccountType, tempUsers } from "../../utils/data"

const Inbox = ({ navigation }: any) => {
	const [selectedAccountType, setSelectedAccountType] = useState(
		chatAccountType[0]
	)
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.pageTitle}>Inbox</Text>

				<View style={styles.switchContainer}>
					{chatAccountType.map((accountType) => (
						<Pressable
							key={accountType}
							style={{
								...styles.switchButton,
								backgroundColor:
									selectedAccountType === accountType
										? "#4BAF4F"
										: "transparent",
							}}
							onPress={() => setSelectedAccountType(accountType)}
						>
							<Text
								style={{
									...styles.switchText,
									color:
										selectedAccountType === accountType
											? "#fff"
											: "#888",
								}}
							>
								{accountType}
							</Text>
						</Pressable>
					))}
				</View>
			</View>
			<ScrollView
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
				stickyHeaderIndices={[0]}
			>
				<TextInput
					placeholder="Search"
					placeholderTextColor="#666"
					style={styles.searchInput}
				/>

				{tempUsers.map((user) => (
					<TouchableOpacity
						key={user}
						style={styles.chatCard}
						onPress={() => navigation.navigate("chat")}
					>
						<Text style={styles.chatCardUser}>{user}</Text>
						<Text style={styles.chatCardText}>
							how are you doing ?
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</SafeAreaView>
	)
}

export default Inbox
