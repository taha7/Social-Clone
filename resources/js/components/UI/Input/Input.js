import React from "react";

const input = props => {
    let inputElement = null;

    switch (props.inputtype) {
        case "input":
            inputElement = <input {...props} />;
            break;
        case "textarea":
            inputElement = <textarea {...props} />;
            break;
        default:
            inputElement = <input {...props} />;
            break;
    }
    return { inputElement };
};

export default input;
