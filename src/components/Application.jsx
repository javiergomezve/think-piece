import React, { Component } from 'react';

import {firestore, auth, createUserProfileDocument} from '../firebase';
import {collectIdsAndDocs} from "../utils";
import Posts from './Posts';
import Authentication from "./Authentication";

class Application extends Component {
    render() {
        return (
            <main className="Application">
                <h1>Think Piece</h1>
                <Authentication />
                <Posts />
            </main>
        );
    }
}

export default Application;
