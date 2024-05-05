import { createStackNavigator } from "@react-navigation/stack"
import LoginScreen from "../../screens/auth/LoginScreen"
import RegisterScreen from "../../screens/auth/RegisterScreen"
import MainTabNavigation from "./TabNavigation"
import { useEffect, useState } from 'react'
import AuthContext from "../context/auth"
import * as SecureStore from 'expo-secure-store';
import ErrorComponent from "../ErrorComponent"
import CreatePostScreen from "../../screens/CreatePostScreen"



const Stack = createStackNavigator()

function MainNavigation() {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        SecureStore.getItemAsync("access_token")
            .then(result => {
                if (result) {
                    setIsSignedIn(true)
                }
            })
            .catch(err => {
                console.log(err);
                // return <ErrorComponent />
                setIsSignedIn(false)
            })
    }, [])

    return (
        <AuthContext.Provider value={{
            isSignedIn,
            setIsSignedIn
        }}>
            <Stack.Navigator>
                {
                    !isSignedIn ? <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                        :
                        <Stack.Screen
                            name="Main"
                            component={MainTabNavigation}
                            options={{
                                headerShown: false
                            }}
                        />
                }
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </AuthContext.Provider>
    )
}

export default MainNavigation;