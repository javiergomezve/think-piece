import React, {Component} from 'react';

import {UserContext} from "../providers/UserProvider";

const getDisplayName = WrappedComponent => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

const withUser = Component => {
    const WrappedComponent = props => {
        return <UserContext.Consumer>
            {user => <Component user={user} {...props} />}
        </UserContext.Consumer>;
    };

    // for debugging: component name that display on react tools
    WrappedComponent.displayName = `WithUser(${getDisplayName(WrappedComponent)})`;

    return WrappedComponent;
};

export default withUser;
