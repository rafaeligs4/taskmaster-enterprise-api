# Taskmaster Enterprise API

Este proyecto es una API RESTful diseñada para la gestión de tareas ("todo list") y usuarios, implementada utilizando **Node.js** y **TypeScript**. El proyecto sigue los principios de **Clean Architecture** (Arquitectura Limpia) para asegurar la escalabilidad, mantenibilidad y separación de responsabilidades.

## 🚀 Tecnologías

El proyecto utiliza un stack tecnológico moderno:

-   **Runtime**: Node.js
-   **Lenguaje**: TypeScript
-   **Framework Web**: Express.js
-   **Base de Datos**: MongoDB (con Mongoose ODM)
-   **Seguridad**:
    -   `bcrypt`: Para el hasheo de contraseñas.
    -   `jsonwebtoken` (JWT): Para la autenticación (si aplica).
    -   `dotenv`: Para gestión de variables de entorno.
-   **Testing**: Jest y ts-jest.

## 🏛️ Arquitectura

El proyecto está estructurado siguiendo **Clean Architecture**, dividiendo el código en capas:

-   **`src/domain`**: Contiene las Entidades y reglas de negocio agnósticas a la tecnología.
-   **`src/application`**: Contiene los Casos de Uso (servicios) que orquestan la lógica de negocio.
-   **`src/infrastructure`**: Contiene implementaciones concretas (Base de datos, Servidor HTTP, Routers, Controladores).

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio**

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno**
    Crea un archivo `.env` en la raíz del proyecto. Debería contener variables como:
    ```env
    PORT=3000
    # URI de conexión a tu base de datos MongoDB
    MONGO_URI=mongodb://localhost:27017/taskmaster
    ```

## 📜 Scripts Disponibles

En el archivo `package.json` se definen los siguientes scripts:

-   **Desarrollo**: Ejecuta el servidor con recarga en caliente (usando `ts-node`).
    ```bash
    npm run dev
    ```

-   **Build**: Compila el código TypeScript a JavaScript en la carpeta `dist`.
    ```bash
    npm run build
    ```

-   **Producción**: Ejecuta el código compilado desde `dist`.
    ```bash
    npm start
    ```

-   **Test**: Ejecuta las pruebas (actualmente no configuradas).
    ```bash
    npm test
    ```

## 🔌 Endpoints

La API expone los siguientes endpoints principales (asumiendo el puerto 3000):

| Método | Endpoint          | Descripción                                      |
| :----- | :---------------- | :----------------------------------------------- |
| `POST` | `/createTask`     | Crea una nueva tarea.                            |
| `GET`  | `/getAll/`        | Obtiene todas las tareas registradas.            |
| `GET`  | `/findById/:id`   | Busca una tarea específica por su ID.            |
| `PUT`  | `/update/:id`     | Actualiza una tarea existente por su ID.         |

## 🗂️ Estructura del Proyecto

```text
src/
├── application/       # Lógica de aplicación y casos de uso
├── domain/            # Entidades y modelos del dominio
├── infrastructure/    # Implementación técnica (DB, API Rest)
│   ├── database/      # Modelos y repositorios de Mongoose
│   ├── http/          # Controladores y Rutas de Express
│   └── dependencies.ts # Inyección de dependencias
└── index.ts           # Punto de entrada de la aplicación
```
