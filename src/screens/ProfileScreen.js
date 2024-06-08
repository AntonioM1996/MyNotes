import React  from "react";
import { View, SafeAreaView, Button, StyleSheet, Image } from "react-native";
// import { useAuth } from "../hooks/useAuth";
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from "../components/CustomText";
import { STYLES } from "../services/Utils";

const ProfileScreen = ({ navigation }) => {
    // const { user, signOut } = useAuth();

    const handleHomePress = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="home-outline" style={styles.buttonIcon} onPress={handleHomePress} />
                {/* <CustomText style={styles.headerText}>{user.name}</CustomText> */}
            </View>
            <SafeAreaView style={styles.body}>
                <View style={styles.profileInfo}>
                    {/* <Image style={styles.profilePicture} source={{uri: user.profilePicture}}></Image>
                    <View style={styles.infoContainer}>
                        <CustomText style={[styles.profileText, { fontWeight: "bold", fontSize: 20 }]}>{user.name}</CustomText>
                        <CustomText style={[styles.profileText, { fontSize: 15, color: "grey" }]}>{user.email}</CustomText>
                        <CustomText style={[styles.profileText, { fontSize: 15, color: "grey" }]}>{user.id}</CustomText>
                    </View> */}
                </View>
                {/* <View style={styles.logoutButtonContainer}>
                    <Button title="Logout" onPress={signOut} />
                </View> */}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        backgroundColor: STYLES.BACKGROUND_COLOR
    },
    body: {
        flex: 1
    },
    logoutButtonContainer: {
        marginTop: "auto"
    },
    header: {
        backgroundColor: "black",
        height: 110,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 60
    },
    headerText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    buttonIcon: {
        fontSize: 30,
        color: "white",
    },
    profileInfo: {
        flex: 1,
        padding: 40,
        alignItems: "center"
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    infoContainer: {
        marginTop: 20
    },
    profileText: {
        fontSize: 17,
        marginBottom: 5,
        textAlign: "center"
    }
});

export default ProfileScreen;