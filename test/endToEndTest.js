import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react/lib/ReactTestUtils";
import jsdom from "jsdom";
import expect from "must";
import sinon from "sinon";

import Username from "../src/Username.js";

describe("Username end2end test", function () {

    beforeEach(function () {
        global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
        global.window = global.document.defaultView;

        sinon.xhr.supportsCORS = true; // evil hack to make the fake server handle xhr
        this.server = sinon.fakeServer.create({ respondImmediately: true });
        global.XMLHttpRequest = this.server.xhr;

        this.component = TestUtils.renderIntoDocument(<Username/>);
    });

    afterEach(function () {
        this.server.restore();
        delete global.XMLHttpRequest;
        delete global.document;
        delete global.window;
    });

    it("does not show warning when nickname is valid", function () {
        this.server.respondWith("GET", "/api/validate?username=goodname",
            [200, {"Content-Type": "application/json"}, `{ "available": true }`]
        );
        this.server.respondWith("POST", "/api/log",
            [200, {"Content-Type": "application/json"}, ""]
        );
        //this.server.respondWith(response => { console.log(response.url); });


        var input = ReactDOM.findDOMNode(this.component.refs.username);
        input.value = "goodname";
        TestUtils.Simulate.change(input);

        expect(ReactDOM.findDOMNode(this.component.refs.warning).innerHTML).to.be("");
    });

    it("shows warning when nickname is invalid", function () {
        this.server.respondWith("GET", "/api/validate?username=alreadyTaken",
            [200, {"Content-Type": "application/json"}, `{ "available": false }`]
        );
        this.server.respondWith("POST", "/api/log",
            [200, {"Content-Type": "application/json"}, ""]
        );
        //this.server.respondWith(response => { console.log(response.url); });


        var input = ReactDOM.findDOMNode(this.component.refs.username);
        input.value = "alreadyTaken";
        TestUtils.Simulate.change(input);

        expect(ReactDOM.findDOMNode(this.component.refs.warning).innerHTML).to.be("Nickname not available!");
    });
});

