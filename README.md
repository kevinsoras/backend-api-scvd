# Sistema de Carga y Validación de Datos (SCVD)

Este proyecto presenta una API RESTful , permitiendo a los usuarios con el rol de admin poder importar masivamente usuarios mediante la subida de archivos .csv . La API maneja JWT para la autenticación del usuario.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Endpoints](#endpoints)
4. [Ejemplos de Solicitudes](#ejemplos-de-solicitudes)
5. [Contribuciones](#contribuciones)
6. [Licencia](#licencia)a

## Requisitos

Es necesario tener Node.js, npm, y PostgreSQL instalados en tu entorno de desarrollo.

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/kevinsoras/backend-api-scvd
cd backend-api-scvd
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura la conexión a la base de datos en el archivo .env, se muestra un ejemplo en el archivo .env.example .
4. Ejecuta un reset de las migraciones con umzug:

```bash
npm run db:create
npm run db:migrate up
```

5. Inicia el servidor:

```bash
npm run dev
```

Asegúrate de proporcionar valores específicos para cada variable según los requisitos de tu aplicación.

## Estructura del proyecto

La aplicación sigue una arquitectura de tres capas:

- **Routers:** Define las rutas y maneja las solicitudes HTTP.
- **Servicios:** Contiene la lógica de negocio y se comunica con la capa de acceso a datos.
- **Acceso a Datos:** Gestiona las interacciones con la base de datos PostgreSQL utilizando pg.

## Endpoints

### Login

#### POST /login (Iniciar Sesión)

- **Descripción**: Permite a un usuario existente iniciar sesión.
- **Body**: `email`, `password` - Credenciales requeridas para el inicio de sesión.
- **Respuesta**: Inicia sesión y devuelve un token JWT.

### Gestión de usuarios

#### POST /upload (Registro de usuarios)

- **Descripción**: Permite subir un archivo .csv ,se tiene un ejemplo en la raiz del proyecto dentro de /examples.
- **Respuesta**: Devuelve la información de los usuarios creados correctamente y los usuarios que no se pudieron insertar con sus respectivos detalles.

## Ejemplos de solicitudes

#### Login

##### POST /login (Iniciar Sesión)

- **Descripción**: Permite a un usuario existente iniciar sesión.
- **Body**:
  - `email`, `password`: Credenciales requeridas para el inicio de sesión.
- **Respuesta**:
  - `200 OK`: Sesión iniciada, retorna token JWT.
  - `401 Unauthorized`: Credenciales incorrectas.
  - `400 Bad Request`: Error de datos de entrada.
  - **Ejemplo de Respuesta**:
    ```json
    {
      "ok": true,
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5..."
      }
    }
    ```

#### Gestión de usuarios

##### POST /upload (Registro de usuarios)

- **Descripción**: Permite subir un archivo .csv ,se tiene un ejemplo en la raiz del proyecto dentro de /examples.
- **Multipart Form**:
  - `file`: Archivo .csv .
- **Respuesta**:
  - `200 OK`: Usuarios registrados correctamente.
  - `401 Unauthorized`: Credenciales incorrectas.
  - `400 Bad Request`: No se ha adjuntado ningun archivo ,csv.
  - **Ejemplo de Respuesta**:
    ```json
    {
      "ok": true,
      "data": {
        "success": [
          {
            "id": 2,
            "name": "kevin",
            "email": "kevinsoras@gmail.com",
            "age": 12
          }
        ],
        "errors": [
          {
            "row": 3,
            "details": {
              "insertion": "Hay un valor unico que se esta  duplicando."
            }
          },
          {
            "row": 4,
            "details": {
              "email": "El formato del campo 'email' es   inválido.",
              "age": "El campo 'age' debe ser un numero."
            }
          }
        ]
      }
    }
    ```

## Contribuciones

Si deseas contribuir al desarrollo de esta API, simplemente realiza un Pull Request con tus cambios y para que sean revisados.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para obtener más detalles.
