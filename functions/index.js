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


exports.sanitizeContent = functions.firestore.document('post/{postId')
    .onWrite(async change => {
        if (!change.after.exists) return;

        const { content, sanitized } = change.after.data();

        if (content && !sanitized) {
            return change.after.ref.update({
                content: content.replace(/CoffeScript/g, '****************'),
                sanitized: true,
            })
        }

        return null;
    });
