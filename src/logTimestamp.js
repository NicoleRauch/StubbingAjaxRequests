import ajax from "nanoajax";

export default function (callback) {
    ajax.ajax({url: "/api/log", method: "POST", body: "timestamp=" + Date.now()}, () => { callback() });
}
