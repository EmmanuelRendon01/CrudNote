export function loadScript(filename) {
    const existing = document.getElementById('page-script');
    if (existing) {
        existing.remove();
    }


    setTimeout(() => {
        const script = document.createElement('script');
        script.id = "page-script";
        script.type = "module";
        script.src = `./scripts/${filename}`;
        document.body.appendChild(script);
    }, 1000);

}