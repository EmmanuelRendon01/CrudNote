export function guardian() {
    const isLogged = sessionStorage.getItem('logged') === "true";

    if (!isLogged) {
        window.location.href = '#/';
    }
}
