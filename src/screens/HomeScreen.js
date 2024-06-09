import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
// import { useAuth } from "../hooks/useAuth";
import CustomText from "../components/CustomText";
import { STYLES } from "../services/Utils";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { saveNote, getNotes } from "../services/Utils";
import Icon from 'react-native-vector-icons/Ionicons';
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";
import RichTextEditor from "../components/RichTextEditor";

const HomeScreen = ({ navigation }) => {
    // const { user, signOut } = useAuth();
    const [inputEnabled, setInputEnabled] = useState(false);
    const [note, setNote] = useState();
    const textInputRef = useRef();
    const longPress = Gesture.LongPress();
    const hapticOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    longPress.onStart((event) => {
        console.log('LONG PRESS START');

        if (inputEnabled && note && note.length > 0) {
            handleSaveNote(note);
            RNReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
            toggleNoteInput();
        }
    });

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [inputEnabled]);

    const toggleNoteInput = function () {
        setInputEnabled(!inputEnabled);
        setNote(null);
    }

    const handleSaveNote = function (noteBody) {
        console.log("handleSaveNote", noteBody);

        if (noteBody && noteBody.length > 0) {
            saveNote(noteBody).then(result => {
                console.log("--- saveNote new Note Id ---");
                console.log(result);
            });
        }
    }

    const handleTextChange = function (value) {
        setNote(value);
    }

    const handleMyNotesPress = () => {
        navigation.navigate("MyNotes");
    }

    /* const handleMyProfilePress = () => {
        navigation.navigate("MyProfile");
    } */

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="file-tray-stacked-outline" style={styles.buttonIcon} onPress={handleMyNotesPress} />
                <CustomText style={styles.headerText}>MyNotes</CustomText>
                {/* <Icon name="person-outline" style={styles.buttonIcon} onPress={handleMyProfilePress} /> */}
            </View>
            <SafeAreaView style={styles.body}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <GestureDetector gesture={longPress}>
                        <TouchableOpacity style={styles.inputBox} onPress={toggleNoteInput}>
                            {inputEnabled ?
                                <TextInput ref={textInputRef} style={styles.textInput} multiline={true}
                                    onChangeText={handleTextChange} /> :
                                <CustomText style={styles.placeholder}>Tap here to type your note</CustomText>
                            }
                        </TouchableOpacity>
                    </GestureDetector>
                </GestureHandlerRootView>
            </SafeAreaView>
        </View>
    );
};

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
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic"
    },
    buttonIcon: {
        fontSize: 30,
        color: "white",
    },
    inputBox: {
        flex: 1,
        padding: 30
    },
    placeholder: {
        color: "grey",
        fontStyle: "italic",
        alignSelf: "center",
        marginBottom: "auto",
        marginTop: "auto"
    },
    textInput: {
        fontFamily: STYLES.FONT_FAMILY,
        color: STYLES.BACKGROUND_COLOR == "black" ? "white" : "black"
    }
});

export default HomeScreen;