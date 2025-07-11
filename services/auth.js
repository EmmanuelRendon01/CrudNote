export function auth(path) {
    const protectedRoutes = ['/dashboard', '/note'];

    if (protectedRoutes.includes(path)) {
        const session = sessionStorage.getItem('logged');
        if (session !== "true") {
            window.location.href = '#/login';
        }
    }
}


