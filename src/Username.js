import React, { Component } from "react";
import validateInBackend from "./validateInBackend.js";

export default class Username extends Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {isAvailable: true};
        this.validateInBackend = props.validateInBackend || validateInBackend;
    }

    render() {
        const warning = this.state.isAvailable ? "" : <span ref="warning" style={{color: "red"}}>Nickname not available!</span>;
        return (
            <div>
                <label>Username</label>
                <input ref="username" onChange={this._onChange}/>
                {warning}
            </div>
        );
    }

    _onChange(event) {
        this.validateInBackend(event.target.value, availability => {
            this.setState({isAvailable: availability.isAvailable});
        });
    }
}
