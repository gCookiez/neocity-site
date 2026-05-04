function sendParamsForLost() {
    const path = window.location.pathname.replace("/not_found.html", "");
    window.location.replace(`${window.location.origin}/?redirLink=${encodeURIComponent(path)}`);
}

sendParamsForLost();