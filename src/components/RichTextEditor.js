import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { RichText, Toolbar, useEditorBridge } from '@10play/tentap-editor';

const RichTextEditor = () => {
    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true
    });

    return (
        <SafeAreaView style={exampleStyles.fullScreen}>
            <RichText editor={editor} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={exampleStyles.keyboardAvoidingView}
            >
                <Toolbar editor={editor} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const exampleStyles = StyleSheet.create({
    fullScreen: {
        flex: 1,
    },
    keyboardAvoidingView: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
    },
});

export default RichTextEditor;