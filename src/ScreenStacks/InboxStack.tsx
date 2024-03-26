import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inbox from "../Screens/Inbox/Inbox";
import Chatting from "../Screens/Chatting/Chatting";



const Stack = createNativeStackNavigator();

const InboxStack = () => {
  return (
    <Stack.Navigator initialRouteName="inbox">
      <Stack.Screen
        name="inbox"
        component={Inbox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chatting"
        component={Chatting}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default InboxStack;
