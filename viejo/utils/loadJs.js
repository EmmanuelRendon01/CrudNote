const loadedScripts = new Set();

export function loadScript(filename) {
    return new Promise((resolve, reject) => {
        const scriptId = `script-${filename.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        // Si el script ya existe, solo re-inicializar
        if (loadedScripts.has(filename)) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.type = "module";
        script.src = `./scripts/${filename}`;
        script.onload = () => {
            loadedScripts.add(filename);
            resolve();
        };
        script.onerror = () => reject(new Error(`Error al cargar ${filename}`));

        document.body.appendChild(script);
    });
}