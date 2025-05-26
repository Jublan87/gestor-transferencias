# Cómo levantar la aplicación

Sigue estos pasos para ejecutar la aplicación localmente:

1. **Clona el repositorio**

```bash
git clone https://github.com/Jublan87/gestor-transferencias.git
```

2. **Instala las dependencias**

Dentro de su editor de codigo de preferencia ejecutar en consola:

```bash
npm install
```

> Asegurate de tener Node.js instalado.

3. **Inicia la aplicación**

```bash
npm start
```

4. **Accede a la aplicación**

- Abre tu navegador y visita: http://localhost:3000/api

5. **Para correr los test unitarios**

```bash
npm run test
```

6. **Obtener el coverage**

```bash
npm run test:cov
```

---

**Notas adicionales:**

- Las transferencias las cree manualmente directamente en la base mongo
- Deje el .env dentro del repositorio intencionalmente para que no tengan que configurar nada
- Deje una url de conexion a una bd mongo publica, para que puedan acceder (incluso desde MongoDB Compass), para que puedan validar que las respuestas de los endpoints son correctas.

- Cadena de conexion bd Mongo: 'mongodb+srv://juan:mockpass123@gestor-transferencias.dg9hkbo.mongodb.net/gestor-transferencias'

## Endpoints de la API

### 1. `GET /companies/with-transfers-last-month`

- **Descripción:** Devuelve las empresas que realizaron transferencias en el último mes.
- **Respuesta:** Lista de objetos `Company`.

### 2. `GET /companies/new-last-month`

- **Descripción:** Devuelve las empresas que se adhirieron en el último mes.
- **Respuesta:** Lista de objetos `Company`.

### 3. `POST /companies/adhere`

- **Descripción:** Adhiere una nueva empresa al sistema.
- **Body:**
  - `cuit` (string, requerido)
  - `businessName` (string, requerido)
  - `adhesionDate` (string, formato ISO, requerido)
- **Respuesta:** Objeto `Company` creado.

## Medidas de seguridad

- **Validación de datos:** Todos los parámetros de entrada del request son validados usando `class-validator` y DTOs. Por ejemplo, el endpoint de adhesión requiere que el CUIT y el nombre sean strings no vacíos y la fecha de adhesión sea una fecha válida en formato ISO.
- **Control de errores:** Se utiliza manejo centralizado de errores con `HttpException` de NestJS. Si ocurre un error inesperado, se retorna un error 500 con un mensaje genérico, y los errores esperados retornan el código y mensaje correspondiente.
- **Logging:** Todos los errores inesperados son registrados usando el logger de NestJS para facilitar el monitoreo y debugging.

## Validación de parámetros de entrada

- Se emplean DTOs decorados con validadores (`@IsString`, `@IsNotEmpty`, `@IsDateString`, etc.) para asegurar que los datos recibidos cumplen con el formato y requisitos esperados antes de ser procesados por la lógica de negocio.
- Si la validación falla, el framework retorna automáticamente un error 400 con detalles del problema.

## Control de errores

- Los endpoints capturan excepciones y diferencian entre errores esperados (por ejemplo, validaciones) y errores inesperados.
- Los errores esperados retornan el código HTTP adecuado y un mensaje descriptivo.
- Los errores inesperados son registrados y devuelven un error 500 (Internal Server Error) para evitar exponer detalles internos.
