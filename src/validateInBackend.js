import ajax from "nanoajax";
import logTimestamp from "./logTimestamp.js";

export default function (username, callback) {

    var start = Date.now();

    ajax.ajax("/api/validate?username=" + username, (code, text) => {
        logTimestamp(Date.now() - start, () => {
            if (code === 200) {
                callback({isAvailable: JSON.parse(text).available});
            } else {
                callback({isAvailable: false});
            }
        });
    });
}
