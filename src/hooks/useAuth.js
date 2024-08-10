import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { onAuthStateChanged, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, query, where, getDocs, limit, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { app, auth, db } from "../config/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const authValue = useProvideAuth();

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

function useProvideAuth() {
    const [user, setUser] = useState();
    const [userRecord, setUserRecord] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("--- useProvideAuth useEffect ---");

        const unsubscribe = onAuthStateChanged(
            auth,
            async authenticatedUser => {
                console.log("useProvideAuth onAuthStateChanged - authenticatedUser", authenticatedUser);

                if (authenticatedUser && authenticatedUser.emailVerified) {
                    setUser(authenticatedUser);

                    const q = query(collection(db, "users"), where("userId", "==", authenticatedUser.uid), limit(1));

                    const unsubscribe = onSnapshot(q, (userQuerySnapshot) => {
                        console.log("useAuth - getDocs on users");
                        console.log(userQuerySnapshot.docs[0].data());

                        let thisUserRecord = userQuerySnapshot.docs[0].data();
                        thisUserRecord.id = userQuerySnapshot.docs[0].id;

                        console.log(thisUserRecord);
                        setUserRecord(thisUserRecord);
                    });

                    return () => unsubscribe();
                }
                else {
                    auth.signOut();
                    setUser(null);
                    setUserRecord(null);
                }

                setLoading(false);
            }
        );

        return () => {
            unsubscribe();
        }
    }, []);

    const googleSignIn = async function () {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        // TODO CHANGE!!! signInWithPopup/redirect DOES NOT WORK WITH REACT NATIVE. Instead,
        // separately login with Google (react-native-google-signin?), then use the id token from the IdP to sign in to
        // Firebase with signInWithCredential()
    };

    return {
        user,
        userRecord,
        loading,
        googleSignIn
    };
}

export const useAuth = () => {
    return useContext(AuthContext);
};