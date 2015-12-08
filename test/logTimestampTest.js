import logTimestamp from "../src/logTimestamp.js";
import sinon from "sinon";
import expect from "must";

describe("logTimestamp", function () {
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
        logTimestamp(() => {});

        expect(this.requests[0].url).to.be("/api/log");
        expect(this.requests[0].method).to.be("POST");
        expect(this.requests[0].requestBody).to.match(/timestamp=/);
    });

    it("invokes the callback without passing data to it", function(done) {
        logTimestamp(data => {
            expect(data).to.be(undefined);
            done();
        });

        this.requests[0].respond(200);
    });
});
