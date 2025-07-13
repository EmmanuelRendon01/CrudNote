# CrudNote

CrudNote es una aplicación web tipo SPA (Single Page Application) para la gestión de notas personales, con funcionalidades de autenticación, registro de usuarios y compartición de notas con diferentes permisos. El proyecto está desarrollado en JavaScript puro y utiliza un archivo JSON como base de datos simulada.

## Características principales

- **Registro y autenticación de usuarios**: Permite a los usuarios crear una cuenta y acceder mediante login.
- **Gestión de notas**: Los usuarios pueden crear, editar, eliminar y visualizar sus notas personales.
- **Compartir notas**: Es posible compartir notas con otros usuarios, asignando permisos de lectura o edición.
- **SPA (Single Page Application)**: Navegación fluida entre páginas sin recargar el navegador, gracias al enrutador implementado.
- **Interfaz moderna**: Utiliza Bootstrap para una apariencia atractiva y responsiva.

## Estructura del proyecto

```
db.json                # Base de datos simulada (usuarios y notas)
index.html             # Página principal de la aplicación
router.js              # Enrutador SPA
assets/styles/         # Hojas de estilo CSS para cada página
scripts/               # Scripts JS para cada funcionalidad/página
services/auth.js       # Lógica de autenticación
utils/loadCss.js       # Utilidad para cargar CSS dinámicamente
```

### Carpetas adicionales
- **viejo/**: Contiene versiones anteriores y código comentado para referencia o pruebas.

## Instalación y ejecución


1. **Clona el repositorio**
   ```
   git clone https://github.com/EmmanuelRendon01/CrudNote.git
   ```
2. **Abre el proyecto en VS Code o tu editor favorito.**
3. **Simula la API REST con JSON Server (opcional pero recomendado)**:
   - Instala JSON Server globalmente si no lo tienes:
     ```
     npm install -g json-server
     ```
   - Inicia el servidor con el archivo `db.json`:
     ```
     json-server --watch db.json --port 3000
     ```
   - Esto te permitirá realizar peticiones HTTP (GET, POST, PUT, DELETE) a `http://localhost:3000` como si tuvieras una API real.
4. **No requiere instalación de dependencias adicionales**: Todo el código es JavaScript puro y HTML/CSS. Solo necesitas abrir `index.html` en tu navegador.

## Uso

- Al abrir la aplicación, puedes registrarte o iniciar sesión.
- Una vez autenticado, accedes al dashboard donde puedes gestionar tus notas.
- Puedes compartir notas con otros usuarios y asignarles permisos.
- La navegación entre páginas es instantánea gracias al enrutador SPA.

## Base de datos


El archivo `db.json` simula la base de datos, almacenando usuarios y notas. Cada nota puede ser compartida con otros usuarios, especificando el tipo de permiso (`read` o `edit`).
Además, usando [JSON Server](https://github.com/typicode/json-server) puedes convertir este archivo en una API RESTful local, facilitando el desarrollo y pruebas de las funcionalidades CRUD de la aplicación.

## Tecnologías utilizadas

- **JavaScript** (ES6 Modules)
- **HTML5**
- **CSS3** (Bootstrap)

## Estructura de archivos clave

- `index.html`: Entrada principal de la aplicación.
- `router.js`: Controla la navegación SPA.
- `db.json`: Simula la base de datos.
- `scripts/`: Lógica de cada página y funcionalidad.
- `assets/styles/`: Estilos CSS personalizados.
- `services/auth.js`: Autenticación y control de acceso.

## Contribución

Si deseas contribuir, puedes crear un fork del repositorio, realizar tus cambios y enviar un pull request. Se recomienda mantener la estructura modular y el uso de JavaScript puro.

## Autor

- Emmanuel Rendon Goez

## Licencia

Este proyecto es de uso libre para fines educativos y personales.
