import ajax from "nanoajax";

export default function (milliseconds, callback) {
    ajax.ajax({url: "/api/log", method: "POST", body: "duration=" + milliseconds}, () => { callback() });
}
