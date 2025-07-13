export function auth(path) {
    const protectedRoutes = ['/dashboard', '/note', '/noteInfo'];

    if (protectedRoutes.includes(path)) {
        const session = sessionStorage.getItem('logged');
        if (session !== "true") {
            window.location.href = '#/login';
        }
    }
}


