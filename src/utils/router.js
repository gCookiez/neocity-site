export function route (path) {
    window.history.pushState({}, "", path);
}

const handleLocation = async () => {
    const path = window.location.pathname;
} 

