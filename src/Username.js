import React, { Component } from "react";
import validateInBackend from "./validateInBackend.js";

export default class Username extends Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.validateInBackend = props.validateInBackend || validateInBackend;
    }

    render() {
        return (
            <input ref="username" onChange={this._onChange}/>
        );
    }

    _onChange(event) {
        this.validateInBackend(event.target.value);
    }
}
