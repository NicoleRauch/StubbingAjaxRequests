import validateInBackend from "../src/validateInBackend.js";
import sinon from "sinon";
import expect from "must";

describe("validateInBackend", function () {
    beforeEach(function() {
        this.requests = [];
        global.XMLHttpRequest = sinon.FakeXMLHttpRequest;
        global.XMLHttpRequest.onCreate = (request) => {
            this.requests.push(request);
        };
    });

    afterEach(function () {
        delete global.XMLHttpRequest;
    });

    it("makes request to the backend", function () {
        validateInBackend(() => {});

        expect(this.requests[0].url).to.be("/api/validate");
        expect(this.requests[0].method).to.be("GET");
    });

    it("passes the retrieved data to the callback", function(done) {
        validateInBackend(data => {
            expect(data).to.eql({available: true});
            done();
        });

        this.requests[0].respond(200, {"Content-Type": "application/json" }, `{ "available": true }`);
    });
});
