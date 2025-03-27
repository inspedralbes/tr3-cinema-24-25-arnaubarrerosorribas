# Documentación de la API

## Autenticación

### Login

**Endpoint:** `POST /api/autentificacio/login`

**Descripción:** Permite a un usuario iniciar sesión.

**Parámetros:**

- `email` (string, requerido)
- `password` (string, requerido)

**Respuesta:**

```json
{
  "token": "string",
  "user": "object"
}
```

---

### Registro

**Endpoint:** `POST /api/autentificacio/register`

**Descripción:** Permite registrar un nuevo usuario.

**Parámetros:**

- `name` (string, requerido)
- `email` (string, requerido)
- `password` (string, requerido)

**Respuesta:**

```json
{
  "message": "Usuario registrado con éxito",
  "user": "object"
}
```

---

### Logout

**Endpoint:** `POST /api/autentificacio/logout`

**Descripción:** Cierra la sesión del usuario.

**Requiere autenticación:** Sí (Token Bearer)

**Respuesta:**

```json
{
  "message": "Logout exitoso"
}
```

---

### Cambiar Contraseña

**Endpoint:** `POST /api/autentificacio/change-password`

**Descripción:** Permite a un usuario cambiar su contraseña.

**Requiere autenticación:** Sí (Token Bearer)

**Parámetros:**

- `old_password` (string, requerido)
- `new_password` (string, requerido)

**Respuesta:**

```json
{
  "message": "Contraseña actualizada"
}
```

---

### Verificar si es Administrador

**Endpoint:** `GET /api/autentificacio/esAdmin`

**Requiere autenticación:** Sí (Token Bearer)

**Respuesta:**

```json
{
  "is_admin": true
}
```

---

## Películas

### Catálogo de Películas

**Endpoint:** `GET /api/pelicules/cataleg`

**Descripción:** Devuelve el listado de todas las películas.

**Respuesta:**

```json
[
  {
    "id": 1,
    "nombre_pelicula": "Película 1",
    "categoria": "Acción",
    "disponible": true
  }
]
```

---

### Obtener Película por ID

**Endpoint:** `GET /api/pelicules/seleccionada/{id}`

**Descripción:** Devuelve los detalles de una película específica.

**Respuesta:**

```json
{
  "id": 1,
  "nombre_pelicula": "Película 1",
  "categoria": "Acción",
  "imagen": "url",
  "descripcion": "Descripción de la película",
  "data": "2024-06-01",
  "preu_entrada": 10
}
```

---

### Publicar una Nueva Película

**Endpoint:** `POST /api/pelicules/publicar-pelicula`

**Descripción:** Agrega una nueva película al catálogo.

**Parámetros:**

- `nombre_pelicula` (string, requerido)
- `categoria_id` (int, requerido)
- `imagen` (file, requerido)
- `descripcion` (string, requerido)
- `data` (date, requerido)
- `preu_entrada` (float, requerido)

**Respuesta:**

```json
{
  "message": "Película creada correctamente"
}
```

---

### Eliminar una Película

**Endpoint:** `POST /api/pelicules/eliminar/{id}`

**Descripción:** Elimina una película del sistema.

**Respuesta:**

```json
{
  "message": "Película eliminada correctamente"
}
```

---

## Entradas

### Comprar Entrada

**Endpoint:** `POST /api/entradas/fer-compra`

**Descripción:** Permite comprar entradas para una película.

**Parámetros:**

- `idUser` (int, requerido)
- `pelicula` (int, requerido)
- `butacas` (array, requerido)
- `preuTotal` (float, requerido)

**Respuesta:**

```json
{
  "message": "Compra realizada exitosamente"
}
```

---

### Consultar Butacas Ocupadas

**Endpoint:** `GET /api/entradas/getButacasPelicula/{id}`

**Descripción:** Devuelve las butacas ocupadas de una película.

**Respuesta:**

```json
[
  { "fila": 1, "columna": 2 },
  { "fila": 3, "columna": 4 }
]
```

---

## Categorías

### Obtener Categorías

**Endpoint:** `GET /api/categorias`

**Descripción:** Devuelve todas las categorías disponibles.

**Respuesta:**

```json
[
  { "id": 1, "categoria": "Acción" },
  { "id": 2, "categoria": "Comedia" }
]
```

---

## Usuario

### Obtener Información del Usuario

**Endpoint:** `GET /api/user/info`

**Requiere autenticación:** Sí (Token Bearer)

**Respuesta:**

```json
{
  "id": 1,
  "name": "Usuario Ejemplo",
  "email": "usuario@example.com"
}
```