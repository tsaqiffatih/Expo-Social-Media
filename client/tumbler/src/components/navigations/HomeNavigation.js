// import {} from '@'

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import PostDetailScreen from "../../screens/PostDetailScreen";
import CreatePostScreen from "../../screens/CreatePostScreen";



const Stack = createStackNavigator()


function HomeNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeNavigator"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="DetailPost"
                component={PostDetailScreen}
                options={{
                    title: 'Detail',
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeNavigation;