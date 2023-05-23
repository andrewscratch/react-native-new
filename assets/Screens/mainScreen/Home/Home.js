import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";

import CommentsScreen from "../CommentsScreen/CommentsScreen";
import MapScreen from "../MapScreen/MapScreen";
import PostScreen from "../PostsScreen/PostsScreen";
import { authSignOutUser } from "../../../../redux/auth/authOperations";

const Stack = createStackNavigator();

export default function Home() {

  const dispatch = useDispatch();

  const signOut = () => {
dispatch(authSignOutUser())
  }

  return (
    <Stack.Navigator initialRouteName="PostScreen">
      <Stack.Screen
        name="PostScreen"
        options={{
          title: "Posts",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
          ),
          headerRightContainerStyle: { paddingRight: 10 },
        }}
        component={PostScreen}
      />
      <Stack.Screen
        options={() => ({
          headerTitleAlign: "center",
        })}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={() => ({
          headerTitleAlign: "center",
        })}
        name="MapScreen"
        component={MapScreen}
      />
    </Stack.Navigator>
  );
}