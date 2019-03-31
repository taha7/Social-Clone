import React from "react";

const ExpectedPost = props => {
    return (
        <div className="card" style={{ marginBottom: "5px" }}>
            <div className="card-header">
                {props.post.user.name} Said: {props.post.created_at}
            </div>
            <div className="card-body">{props.post.body}</div>
        </div>
    );
};

export default ExpectedPost;
