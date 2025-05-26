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
