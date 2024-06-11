import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COLOR_SCHEME = Appearance.getColorScheme();
const NOTES_KEY = "notes";

export const STYLES = {
    BACKGROUND_COLOR: COLOR_SCHEME == "dark" ? "black" : "white",
    FONT_FAMILY: "Avenir Next"
}

export const saveNote = async function(noteBody, noteId) {
    console.log("saveNote...");
    let newNote;

    try {
        let notes = await getNotes();

        if(noteId) {
            let foundNote = notes.find(note => note.id == noteId);

            if(foundNote) {
                let updatedNote = foundNote;
                updatedNote.body = noteBody;
                updatedNote.createdDate = (new Date()).toUTCString(); // TODO add a lastModifiedDate

                let index = notes.indexOf(foundNote);

                if(index !== -1) {
                    notes[index] = updatedNote;
                }
            }
        }
        else {
            newNote = {
                createdDate: (new Date()).toUTCString(),
                body: noteBody,
                id: Date.now(),
                title: Date.now() // TODO handle title
            };
        
            console.log("saving Note...");
            console.log(newNote);

            notes.push(newNote);
        }

        await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));

        return newNote?.id ? newNote?.id : noteId;
    }
    catch(error) {
        console.error("saveNote error");
        console.error(JSON.stringify(error));

        return error;
    }
}

export const getNotes = async function() {
    try {
        const notes = await AsyncStorage.getItem(NOTES_KEY);

        return notes != null ? JSON.parse(notes) : [];
    }
    catch(error) {
        console.error("getNotes error");
        console.error(JSON.stringify(error));
    }

    return [];
}

export const deleteNote = async function(noteId) {
    try {
        const notesString = await AsyncStorage.getItem(NOTES_KEY);

        if(noteId) {
            let notes = JSON.parse(notesString);
            notes = notes.filter(note => note.id != noteId);

            await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
        }
    }
    catch(error) {
        console.error("deleteNote error");
        console.error(JSON.stringify(error));
    }
}

export const deleteAllNotes = async function() {
    let emptyNotes = [];
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(emptyNotes));
}