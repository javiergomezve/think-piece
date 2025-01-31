import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utils";
import Post from './Post';
import Comments from './Comments';
import withUser from "./withUser";

class PostPage extends Component {

    state = { post: null, comments: [] };

    get postId() {
        return this.props.match.params.id;
    }

    get postRef() {
        return firestore.doc(`posts/${this.postId}`);
    }

    get commentsRef() {
        return this.postRef.collection('comments');
    }

    unsubscribeFromPost = null;
    unsubscribeFromComments = null;

    async componentDidMount() {
        this.unsubscribeFromPost = this.postRef.onSnapshot(snapshot => {
            const post = collectIdsAndDocs(snapshot);
            this.setState({ post });
        });

        this.unsubscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ comments });
        });
    }

    createComment = comment => {
        const { user } = this.props;
        this.commentsRef.add({
            ...comment,
            user,
        });
    };

    componentWillUnmount() {
        this.unsubscribeFromPost();
        this.unsubscribeFromComments();
    }

    render() {
        const { post, comments } = this.state;

        return (
            <section>
                {post && <Post {...post} />}
                <Comments
                    comments={comments}
                    postId={this.postId}
                    onCreate={this.createComment}
                />
            </section>
        );
    }
}

export default withUser(withRouter(PostPage));
