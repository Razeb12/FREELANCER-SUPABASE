import { SafeAreaView } from "react-native-safe-area-context"
import styles from "./styles"
import {
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	TextInput,
} from "react-native"
import { tempChat } from "../../utils/data"

const Chat = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.chatHeader}>
				<Text style={styles.title}>Best Man</Text>
			</View>
			<ScrollView
				contentContainerStyle={styles.chatContentContainer}
				showsVerticalScrollIndicator={false}
			>
				{tempChat.map((message, index) => (
					<View
						key={message}
						style={{
							flexDirection:
								index % 2 === 0 ? "row-reverse" : undefined,
						}}
					>
						<View
							style={{
								...styles.chatBubble, 
								borderTopLeftRadius:
									index % 2 === 0 ? 10 : undefined,
								borderBottomLeftRadius:
									index % 2 === 0 ? 10 : undefined,
								borderTopRightRadius:
									index % 2 === 0 ? undefined : 10,
								borderBottomRightRadius:
									index % 2 === 0 ? undefined : 10,
							}}
						>
							<Text>{message}</Text>
						</View>
					</View>
				))}
			</ScrollView>
			<KeyboardAvoidingView style={styles.bottomContainer}>
				<TextInput
					placeholder="type your message..."
					multiline
					style={styles.input}
				/>
				<TouchableOpacity style={styles.send}>
					<Text style={styles.sendText}>Send</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}

export default Chat
