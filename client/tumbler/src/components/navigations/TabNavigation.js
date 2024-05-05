import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigation from './HomeNavigation'
import ProfileScreen from '../../screens/ProfileScreen'
import SearchScreen from '../../screens/SearchScreen'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity dan Text
import { useContext } from 'react'
import * as SecureStore from 'expo-secure-store';
import AuthContext from '../context/auth'
import { gql } from '@apollo/client'
import CreatePostScreen from '../../screens/CreatePostScreen'

const Tab = createBottomTabNavigator()

function MainTabNavigation({ navigation }) {

    const auth = useContext(AuthContext)

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#141414"
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={HomeNavigation}
                options={{
                    headerStyle: {
                        backgroundColor: '#141414',
                    },
                    headerTitleStyle: {
                        color: "#fff",
                        fontSize: 25,
                        height: 50
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='home' color={'white'} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    headerStyle: {
                        backgroundColor: '#141414',
                    },
                    headerTitleStyle: {
                        color: "#fff",
                        fontSize: 25
                    },
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='search' color={'white'} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Creat-Post"
                component={CreatePostScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='plus-square' color={'white'} size={size} />
                    ),
                    headerStyle: {
                        backgroundColor: '#141414',
                    },
                    headerTitleStyle: {
                        color: "#fff",
                        fontSize: 25
                    },
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={({ navigation }) => ({
                    headerStyle: {
                        backgroundColor: '#141414',
                    },
                    headerTitleStyle: {
                        color: "#fff",
                        fontSize: 25
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={async () => {
                                const token = await SecureStore.deleteItemAsync("access_token")
                                auth.setIsSignedIn(false)
                            }}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <Feather name='user' color={'white'} size={size} />
                    )
                })}
            />
        </Tab.Navigator>
    )
}

export default MainTabNavigation
