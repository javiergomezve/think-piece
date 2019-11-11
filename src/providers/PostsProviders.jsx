import React, { Component, createContext } from 'react';

import { firestore } from '../firebase';
import { collectIdsAndDocs } from "../utils";

export const PostsContext = createContext();

class PostsProviders extends Component {

    state = { posts: [] };

    unsubscribeForFirestore = null;

    componentDidMount() {
        this.unsubscribeForFirestore = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ posts });
        });
    }

    componentWillUnmount() {
        this.unsubscribeForFirestore();
    }

    render() {
        const { posts } = this.state;
        const { children } = this.props;

        return (
            <PostsContext.Provider value={posts}>
                {children}
            </PostsContext.Provider>
        );

    }
}

export default PostsProviders;
