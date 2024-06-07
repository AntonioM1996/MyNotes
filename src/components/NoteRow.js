import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import CustomText from './CustomText';
import { STYLES } from '../services/Utils';

const NoteRow = ({ note, onDelete }) => {
    const [thisNote, setThisNote] = useState(note);

    useEffect(() => {
        console.log('NoteRow note', note);

        let localDate = new Date(note.localCreatedDate);
        note.createdDateLocale = localDate.toLocaleString("en-US");

        setThisNote(note);
    }, []);

    const renderRightActions = (progress, dragX) => {
        return (
            <RectButton style={styles.deleteButton} onPress={() => {onDelete(thisNote.localId)}}>
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
            <CustomText style={styles.noteBody}>{thisNote.body}</CustomText>
            <CustomText style={styles.noteDate}>{thisNote.createdDateLocale}</CustomText>
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