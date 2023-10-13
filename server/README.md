# Backend

Backend de la Prueba Técnica para la UCC

Primeros Pasos a realizar:

Paso 1:

Recordar hacer npm install, ya que el gitignore esta ignorando los paquetes(node_modules)

Paso 2:

Crear el archivo .env

dentro de ella escribir las variables de entorno:

```
DB_USER=postgres
DB_PASSWORD= ******
DB_HOST=localhost
```

Recordar usar su propia contraseña de Postgres

Paso 3:

Conexion Base de Datos:

Crear una base de datos llamada -> prueba_react

Paso 4:

Verificar que en el archivo db.js esté comentada la opción de "deploy" y descomendata la opción "local"

Paso 5:

Inicializar el backend escribiendo en la terminal...

```
npm start
```
