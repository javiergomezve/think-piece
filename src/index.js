import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';

import Application from './components/Application';
import PostsProviders from "./providers/PostsProviders";
import UserProvider from "./providers/UserProvider";

render(
    <Router>
        <UserProvider>
            <PostsProviders>
                <Application />
            </PostsProviders>
        </UserProvider>
    </Router>
    , document.getElementById('root'));
