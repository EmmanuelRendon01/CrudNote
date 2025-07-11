export function guardian() {
    const isLogged = sessionStorage.getItem('logged');

    if (!isLogged) {
        window.location.href = '#/';
        return false;
    }else{
        return true;
    }
}
