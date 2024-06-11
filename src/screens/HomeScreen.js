import React, { useEffect, useRef, useState } from "react";
import { View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import { STYLES } from "../services/Utils";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import { saveNote } from "../services/Utils";
import Icon from 'react-native-vector-icons/Ionicons';
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";

const HomeScreen = ({ navigation, route }) => {
    const [note, setNote] = useState();
    const [noteToEdit, setNoteToEdit] = useState();
    const [showInput, setShowInput] = useState(false);
    const textInputRef = useRef();
    const longPress = Gesture.LongPress();
    const hapticOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };

    useEffect(() => {
        console.log("HomeScreen useEffect...");

        const unsubscribe = navigation.addListener('focus', () => {
            console.log("HomeScreen params", route.params);

            if (route.params?.noteToEdit) {
                setNoteToEdit(route.params.noteToEdit);
                setNote(route.params.noteToEdit?.body);
                setShowInput(true);
            }
            else {
                setNote(null);
                setNoteToEdit(null);
                setTimeout(() => { setShowInput(true) }, 300);
            }

            // setShowInput(true);

            /* if (!route.params?.noteToEdit) {
                setTimeout(() => { textInputRef.current?.focus() }, 300);
            } */
        });

        const unsubscribe1 = navigation.addListener('blur', () => {
            setShowInput(false);
            route.params = undefined;
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => { unsubscribe(); unsubscribe1(); }
    }, [navigation, route]);

    longPress.onStart((event) => {
        console.log('LONG PRESS START');

        if (note && note.length > 0) {
            handleSaveNote(note);
            RNReactNativeHapticFeedback.trigger("impactLight", hapticOptions);
        }
    });

    const handleSaveNote = function (noteBody) {
        console.log("handleSaveNote", noteBody);

        if (noteBody && noteBody.length > 0) {
            saveNote(noteBody, noteToEdit?.id).then(result => {
                console.log("--- saveNote new Note Id ---");
                console.log(result);

                handleMyNotesPress();
            });
        }
    }

    const handleTextChange = function (value) {
        setNote(value);
    }

    const handleMyNotesPress = () => {
        setShowInput(false);
        route.params = undefined;
        
        /* navigation.reset({
            index: 0,
            routes: [{ name: 'MyNotes' }],
        }); */

        navigation.navigate("MyNotes");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="file-tray-stacked-outline" style={styles.buttonIcon} onPress={handleMyNotesPress} />
                <CustomText style={styles.headerText}>MyNotes</CustomText>
            </View>
            <SafeAreaView style={styles.body}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <GestureDetector gesture={longPress}>
                        <TouchableOpacity style={styles.inputBox}>
                            {
                                showInput &&
                                <TextInput
                                    ref={textInputRef}
                                    autoFocus={noteToEdit == null}
                                    style={styles.textInput}
                                    multiline={true}
                                    onChangeText={handleTextChange}
                                    onFocus={() => { console.log('FOCUSED!') }}
                                    onBlur={() => { console.log('BLURRED!') }}
                                    value={note}
                                />
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
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 50
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
        paddingTop: 5
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