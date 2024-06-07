import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Button, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import { STYLES, deleteNote } from "../services/Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import NoteList from "../components/NoteList";

const MyNotesScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem("notes").then(result => {
                if(result) {
                    setNotes(JSON.parse(result));
                }
                else {
                    setNotes([]);
                }
            });
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const handleHomePress = () => {
        navigation.navigate("Home");
    }

    const eraseAllNotes = function () {
        /* deleteNote(null, true).then(result => {
            console.log('eraseAllNotes result', result.data);

            if(result.data) {
                setNotes([]);
            }
        }); */

        // TODO
    }

    const deleteThisNote = function(noteLocalId) {
        /* console.log("deleteNote", noteLocalId);

        if(noteLocalId) {
            const thisNote = notes.filter(note => note.localId == noteLocalId)[0];

            deleteNote(thisNote, false).then(result => {
                console.log('deleteThisNote result', result);
                setNotes(result);
            }).catch(error => {
                console.error(error);
            });
        } */

        // TODO
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.headerText}>My SIUMs.</CustomText>
                <Icon name="home-outline" style={styles.myNotesButtonIcon} onPress={handleHomePress} />
            </View>
            <SafeAreaView style={styles.body}>
                {
                    notes.length > 0 ?
                        <NoteList notes={notes} onDeleteNote={deleteThisNote} /> :
                        <View style={styles.noNotesMessageContainer}>
                            <CustomText>You have no SIUMs yet.</CustomText>
                        </View>
                }
                {
                    notes.length > 0 &&
                    <View style={{ marginTop: "auto" }}>
                        <Button title="Delete all notes" onPress={eraseAllNotes} color={"red"} />
                    </View>
                }
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
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingTop: 60
    },
    headerText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    myNotesButtonIcon: {
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
        fontFamily: STYLES.FONT_FAMILY
    },
    noNotesMessageContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default MyNotesScreen;