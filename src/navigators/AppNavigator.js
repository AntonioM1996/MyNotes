import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from "../screens/SignInScreen";
import HomeNavigator from "./HomeNavigator";

const AppNavigator = () => {
    const { user } = useAuth();
    const Stack = createNativeStackNavigator();

    useEffect(() => {
        console.log("--- AppNavigator, user ---");
        console.log(user);
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user &&
                    <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
                }
                {user && 
                    <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{headerShown: false}} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;