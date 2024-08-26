import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
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