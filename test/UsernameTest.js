import jsdom from "jsdom";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react/lib/ReactTestUtils";

import expect from "must";
import sinon from "sinon";

import Username from "../src/Username.js";

describe("UsernameTest", function () {

    beforeEach(function () {
        global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
        global.window = global.document.defaultView;

        this.validateInBackend = sinon.spy();
        this.component = TestUtils.renderIntoDocument(<Username validateInBackend={this.validateInBackend}/>);
    });

    afterEach(function () {
        delete global.document;
        delete global.window;
    });


    it("onChange handler is called when input changes", function () {
        var input = ReactDOM.findDOMNode(this.component.refs.username);
        input.value = "myname";
        TestUtils.Simulate.change(input);

        expect(this.validateInBackend.firstCall.args).to.eql(["myname"]);
    });
});
