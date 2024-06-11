import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Button, StyleSheet } from "react-native";
import CustomText from "../components/CustomText";
import { STYLES, deleteAllNotes, deleteNote, getNotes } from "../services/Utils";
import Icon from 'react-native-vector-icons/Ionicons';
import NoteList from "../components/NoteList";

const MyNotesScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getNotes().then(result => {
                console.log("notes: " + result.length);
                setNotes(result);
            });
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const handleHomePress = () => {
        navigation.navigate("Home");
    }

    /* const eraseAllNotes = function () {
        deleteAllNotes().then(() => {
            getNotes().then(result => {
                setNotes(result);
            });
        });
    } */

    const deleteThisNote = function(noteId) {
        console.log("deleteNote", noteId);

        if(noteId) {
            deleteNote(noteId).then(() => {
                getNotes().then(result => {
                    setNotes(result);
                });
            });
        }
    }

    const editNote = function(noteId) {
        console.log("editNote " + noteId);

        navigation.navigate("HomeNavigator", {
            screen: "Home",
            params: {
                noteToEdit: notes.find(note => note.id == noteId)
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <CustomText style={styles.headerText}>MyNotes</CustomText>
                <Icon name="create-outline" style={styles.myNotesButtonIcon} onPress={handleHomePress} />
            </View>
            <SafeAreaView style={styles.body}>
                {
                    notes.length > 0 ?
                        <NoteList notes={notes} onDeleteNote={deleteThisNote} onNotePress={editNote} /> :
                        <View style={styles.noNotesMessageContainer}>
                            <CustomText style={styles.placeholder}>You have no notes yet.</CustomText>
                        </View>
                }
                {/* {
                    notes.length > 0 &&
                    <View style={{ marginTop: "auto" }}>
                        <Button title="Delete all notes" onPress={eraseAllNotes} color={"red"} />
                    </View>
                } */}
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
        paddingHorizontal: 20,
        justifyContent: "space-between",
        paddingTop: 50
    },
    headerText: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    myNotesButtonIcon: {
        fontSize: 30,
        paddingTop: 5,
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