import React, { Component } from 'react';

import {firestore, auth, createUserProfileDocument} from '../firebase';
import {collectIdsAndDocs} from "../utils";
import Posts from './Posts';
import Authentication from "./Authentication";

class Application extends Component {
    state = {
        posts: [],
        user: null,
    };

    unsubscribeForFirestore = null;
    unsubscribeForAuth = null;

    async componentDidMount() {
        this.unsubscribeForFirestore = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ posts });
        });

        this.unsubscribeForAuth = auth.onAuthStateChanged(async userAuth => {
            const user = await createUserProfileDocument(userAuth);
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        this.unsubscribeForFirestore();
        this.unsubscribeForAuth();
    }

    render() {
        const { posts, user } = this.state;

        return (
            <main className="Application">
                <h1>Think Piece</h1>
                <Authentication user={user} />
                <Posts posts={posts} />
            </main>
        );
    }
}

export default Application;
