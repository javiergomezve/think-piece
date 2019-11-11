import React, { Component, createContext } from 'react';

import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {

    state = { user: null };

    unsubscribeForAuth = null;

    componentDidMount() {
        this.unsubscribeForAuth = auth.onAuthStateChanged(async userAuth => {
            const user = await createUserProfileDocument(userAuth);
            this.setState({ user });
        });
    }

    componentWillUnmount() {
        this.unsubscribeForAuth();
    }

    render() {
        const { user } = this.state;
        const { children } = this.props;

        return (
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        );

    }
}

export default UserProvider;
