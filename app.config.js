import "dotenv/config";

export default {
    "expo": {
        "name": "MyNotes",
        "slug": "MyNotes",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./src/assets/clipart3001994.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./src/assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#000000"
        },
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "com.antoniom96.MyNotes",
            "googleServicesFile": "./GoogleService-Info.plist"
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./src/assets/adaptive-icon.png",
                "backgroundColor": "#000000"
            },
            "package": "com.antoniom96.MyNotes"
        },
        "web": {
            "favicon": "./src/assets/clipart3001994.png"
        },
        "extra": {
            /* "eas": {
                "projectId": "7e01ef3b-7e65-43b9-bc9b-171f3b028c89"
            }, */ // don't remember if this is the correct one
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            eas: {
                projectId: "57cd6e70-d40c-454d-8d18-b2502daf8806"
            }
        },
        "plugins": ["@react-native-google-signin/google-signin"]
    }
}
