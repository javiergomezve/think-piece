import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProviders from "./providers/PostsProviders";
import UserProvider from "./providers/UserProvider";

render(
    <UserProvider>
        <PostsProviders>
            <Application />
        </PostsProviders>
    </UserProvider>
    , document.getElementById('root'));
