import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NoteRow from "./NoteRow";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const NoteList = ({ notes, onDeleteNote, onNotePress }) => {
    const [sortedNotes, setSortedNotes] = useState();

    useEffect(() => {
        console.log('NoteList notes:');
        console.log(notes);

        setSortedNotes(notes.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdDate) - new Date(a.createdDate);
        }));
    }, [notes]);

    return (
        <GestureHandlerRootView style={styles.container}>
            <FlatList
                data={sortedNotes}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({item}) => (
                    <NoteRow note={item} onDelete={onDeleteNote} onNotePress={onNotePress} />
                )}
                keyExtractor={item => item.id}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    separator: {
        backgroundColor: 'rgb(200, 199, 204)',
        height: StyleSheet.hairlineWidth
    }
});

export default NoteList;