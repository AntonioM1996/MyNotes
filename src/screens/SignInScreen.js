import React from "react";
import { View, StyleSheet, Platform, PlatformColor } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import CustomText from "../components/CustomText";
import Icon from 'react-native-vector-icons/Ionicons';
import { STYLES } from "../services/Utils";

const SignInScreen = () => {
    const { googleSignIn } = useAuth();

    return (
        <View style={styles.container}>
            <CustomText style={styles.headerText}>SIUM.</CustomText>
            {/* <CustomText style={styles.subtitleText}>Welcome to the SIUM experience</CustomText> */}
            <Icon name="logo-google" onPress={googleSignIn} style={styles.googleButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: STYLES.BACKGROUND_COLOR
    },
    googleButton: {
        fontSize: 50,
        marginTop: 200,
        color: STYLES.BACKGROUND_COLOR == "black" ? "white" : "black"
    },
    headerText: {
        fontSize: 50,
        fontWeight: "bold",
        fontStyle: "italic",
        color: STYLES.BACKGROUND_COLOR == "black" ? "white" : "black"
    },
    subtitleText: {
        fontSize: 12,
        fontWeight: "bold",
    }
});

export default SignInScreen;