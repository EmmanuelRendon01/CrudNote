// Creamos un conjunto para llevar control de los scripts ya cargados.
// Así evitamos volver a cargarlos si ya están presentes.
const loadedScripts = new Set();

// Esta función carga un archivo JavaScript cuando se necesita
export function loadScript(filename) {
    // Retornamos una promesa: es una forma de manejar procesos que tardan (como cargar un archivo).
    // `resolve` se llama si todo salió bien.
    // `reject` se llama si hubo un error.
    return new Promise((resolve, reject) => {

        // Creamos un ID único para este script (quitamos caracteres raros del nombre del archivo)
        const scriptId = `script-${filename.replace(/[^a-zA-Z0-9]/g, '-')}`;
        
        // Si el archivo ya fue cargado antes, no lo cargamos otra vez.
        if (loadedScripts.has(filename)) {
            resolve(); // Ya estaba cargado, simplemente continuamos
            return;
        }

        // Creamos una etiqueta <script> para insertar el archivo JS en la página
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = "module"; // Indicamos que es un módulo (soporta import/export)
        script.src = `./scripts/${filename}`; // Ruta del archivo a cargar

        // Cuando se carga bien, lo marcamos como cargado y avisamos que todo salió bien
        script.onload = () => {
            loadedScripts.add(filename); // Lo guardamos como "ya cargado"
            resolve(); // Todo salió bien, se puede seguir
        };

        // Si ocurre un error al cargar el script, lo avisamos
        script.onerror = () => reject(new Error(`Error al cargar ${filename}`));

        // Finalmente insertamos el script en el documento
        document.body.appendChild(script);
    });
}
