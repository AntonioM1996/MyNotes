import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import MyNotesScreen from "../screens/MyNotesScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = () => {
    return (
        <Tab.Navigator tabBar={() => null} initialRouteName="Home">
            <Tab.Screen name="MyNotes" component={MyNotesScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="MyProfile" component={ProfileScreen} /> */}
        </Tab.Navigator>
    );
}

export default HomeNavigator