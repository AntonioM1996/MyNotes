import React from "react";
import { Text, StyleSheet } from "react-native";
import { STYLES } from "../services/Utils";

const CustomText = (props) => {
    return (
        <Text style={[styles.defaultStyle, props.style]} onPress={props.onPress}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontFamily: STYLES.FONT_FAMILY,
        color: STYLES.BACKGROUND_COLOR == "black" ? "white" : "black"
    }
});

export default CustomText;