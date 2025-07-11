export function loadCss(filename) {
    const existing = document.getElementById('page-style');

    if (existing) {
        existing.remove();
    }

    const link = document.createElement('link');
    link.id = 'page-style';
    link.rel = 'stylesheet';
    link.href = `./assets/${filename}`;
    document.head.appendChild(link);
}