import { Appearance } from "react-native";

const colorScheme = Appearance.getColorScheme();

export const STYLES = {
    BACKGROUND_COLOR: colorScheme == "dark" ? "black" : "white",
    FONT_FAMILY: "Avenir Next"
}

export const saveNote = function() {
    // TODO
}

export const deleteNote = function() {
    // TODO
}