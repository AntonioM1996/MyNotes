import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import CustomText from './CustomText';
import { STYLES } from '../services/Utils';

const NoteRow = ({ note, onDelete, onNotePress }) => {
    const [thisNote, setThisNote] = useState(note);

    useEffect(() => {
        console.log('NoteRow note', note);

        let localDate = new Date(note.createdDate);
        note.createdDateLocale = localDate.toLocaleString("it"); // en-US?

        setThisNote(note);
    }, [note]);

    const renderRightActions = (progress, dragX) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => {onDelete(thisNote.id)}}>
                <Animated.View
                    style={[
                        styles.deleteText
                    ]}
                >
                    <CustomText style={{color: "white", fontWeight: "bold"}}>Delete</CustomText>
                </Animated.View>
            </RectButton>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions} childrenContainerStyle={styles.row}>
            <TouchableOpacity onPress={() => {onNotePress(thisNote.id)}}>
                <CustomText style={styles.noteBody}>{thisNote.body}</CustomText>
                <CustomText style={styles.noteDate}>{thisNote.createdDateLocale}</CustomText>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: STYLES.BACKGROUND_COLOR
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    deleteText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noteBody: {
        flex: 1,
        marginRight: 10
    },
    noteDate: {
        color: "grey"
    }
});

export default NoteRow;