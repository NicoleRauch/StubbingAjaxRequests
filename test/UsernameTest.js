import jsdom from "jsdom";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react/lib/ReactTestUtils";

import expect from "must";
import sinon from "sinon";

describe("UsernameTest", function () {

    describe("onChange handler called when", function () {

        let Username;

        beforeEach(function () {
            global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
            global.window = global.document.defaultView;
            Username = require("../src/Username.js");

            this.validateInBackend = sinon.spy();
            this.component = TestUtils.renderIntoDocument(<Username validateInBackend={this.validateInBackend}/>);
        });

        afterEach(function () {
            delete global.document;
            delete global.window;
        });


        it("input changes", function () {
            var node = ReactDOM.findDOMNode(this.component.refs.username);
            node.value = "myname";
            TestUtils.Simulate.change(node);

            expect(this.validateInBackend.firstCall.args).to.eql(["myname"]);
        });
    });

});
