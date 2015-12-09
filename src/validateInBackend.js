import ajax from "nanoajax";
import logTimestamp from "./logTimestamp.js";

export default function (callback) {

    var start = Date.now();

    ajax.ajax("/api/validate", (code, text) => {
        logTimestamp(Date.now() - start, () => { callback(JSON.parse(text)) });
    });
}
