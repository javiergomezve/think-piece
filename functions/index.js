const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.getAllPosts = functions.https.onRequest(async (request, response) => {
    const snapshot = await firestore.collection('posts').get();
    const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    response.json({ posts });
});
