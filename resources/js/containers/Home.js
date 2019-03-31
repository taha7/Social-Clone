import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/Home";

import Friends from "../components/Home/Friends/Friends";
import ExpectedPosts from "../components/Home/ExpectedPosts/ExpectedPosts";
import FriendRequests from "../components/Home/FriendRequests";
import UserSideMenu from "../components/Home/UserSideMenu";

// Redux Store
const store = createStore(rootReducer);

export default class UserHome extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Friends />
                    <ExpectedPosts />
                    <FriendRequests />
                    <UserSideMenu />
                </div>
            </div>
        );
    }
}

if (document.getElementById("user-home")) {
    ReactDOM.render(
        <Provider store={store}>
            <UserHome />
        </Provider>,
        document.getElementById("user-home")
    );
}
