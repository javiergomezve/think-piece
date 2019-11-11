import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

if (process.env.NODE_ENV !== 'production') {
    window.firebase = firebase;
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const sigOut = () => auth.signOut();
export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = firestore.doc(`users/${user.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            });
        } catch (e) {
            console.error('Error creating user', e.message);
        }
    }

    return getUserDocument(user.uid);
};
export const getUserDocument = (uid) => {
    if (!uid) return null;

    try {
        return firestore.collection('users').doc(uid);
    } catch (e) {
        console.error('Error fetching user', e.message);
    }
};
export default firebase;
