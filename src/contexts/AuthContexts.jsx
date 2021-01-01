import React, { useState, useContext, useEffect } from 'react'
import { auth } from '../firebase/firebase';
import firebase from 'firebase';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [uid, setUid] = useState();
    const [loading, setLoading] = useState(true);
    var provider = new firebase.auth.GoogleAuthProvider();

    function signup(email, password) {
        auth.createUserWithEmailAndPassword(email, password);
    }

    function signinGoogle() {
        return auth.signInWithRedirect(provider)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            if (user) {
                setUid(user.uid);
            }
            setLoading(false)
        })

        return unsubscribe
    }, [])


    const value = {
        uid,
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        signinGoogle,

    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
