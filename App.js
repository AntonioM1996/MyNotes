import React from "react";
import AppNavigator from './src/navigators/AppNavigator';
import { AuthProvider } from './src/hooks/useAuth';
import { decode } from "base-64";

export default function App() {
    if (typeof atob === "undefined") {
        global.atob = decode;
    }

    return (
        <AuthProvider>
            <AppNavigator />
        </AuthProvider>
    );
}