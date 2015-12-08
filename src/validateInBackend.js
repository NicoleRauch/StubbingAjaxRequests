import ajax from "nanoajax";

export default function (callback) {
    ajax.ajax("/api/validate", (code, text) => { callback(JSON.parse(text)) });
}
