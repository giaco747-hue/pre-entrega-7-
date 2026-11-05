Markdown
# Sistema Backend de Turnos y Reservas

Este proyecto es el backend para un sistema de gestión de turnos y reservas, desarrollado con Node.js, Express y MongoDB. Está estructurado bajo una estricta arquitectura en capas para separar la lógica de enrutamiento, controladores, servicios y persistencia de datos.

## 🚀 Tecnologías Utilizadas

* **Backend:** Node.js, Express
* **Base de Datos:** MongoDB (Mongoose)
* **Motor de Vistas:** Handlebars (`express-handlebars`)
* **Tiempo Real:** Socket.io
* **Arquitectura:** Capas (Routes ➔ Controllers ➔ Services ➔ DAOs ➔ Models)

## 🎯 Novedades en esta Pre-entrega (Vistas y WebSockets)

En esta fase se incorporó una capa visual del lado del servidor y comunicación bidireccional en tiempo real, manteniendo intacta la API REST existente:

1. **Vistas Renderizadas (Handlebars):**
   * **`GET /views/services`**: Renderiza el listado completo de servicios extraídos directamente de MongoDB, mostrando nombre, descripción, duración, precio, categoría y disponibilidad.
   * **`GET /views/availability`**: Renderiza la vista de reservas/disponibilidad con datos reales de la base de datos.
   * *Regla de negocio cumplida: Ningún dato está hardcodeado. Toda la información servida al motor de plantillas atraviesa los mismos servicios de la arquitectura de la API.*

2. **Comunicación en Tiempo Real (Socket.io):**
   * El servidor cuenta con un canal de WebSockets activo.
   * Al ejecutar una acción de creación de servicio vía API (`POST /api/services`), el controlador persiste el dato e inmediatamente emite un evento `updateServices` por medio de Socket.io.
   * El script del cliente (`public/js/socket.js`) escucha este evento y actualiza el DOM dinámicamente. El resultado es que **la vista `/views/services` se actualiza instantáneamente en el navegador sin recargar la página**.

## 💻 Instalación y Ejecución

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install
Configurar las variables de entorno creando un archivo .env en la raíz (asegurar conexión a MongoDB y configuración del PORT).

Iniciar el servidor en modo desarrollo:

Bash
npm run dev
🗂️ Endpoints Principales
Vistas HTML
*GET /views/services - Listado interactivo de servicios.

*GET /views/availability - Listado de reservas.

*API REST
*GET /api/services - Obtiene los servicios (soporta query params).

*POST /api/services - Crea un servicio y emite actualización por WebSockets.

*GET /api/services/:sid - Obtiene un servicio por ID.

*PUT /api/services/:sid - Actualiza un servicio.

*DELETE /api/services/:sid - Elimina un servicio.


3. Guarda el archivo con `Ctrl + S`.
4. Ahora sí, abre la terminal y ejecuta la secuencia para subir todo:

```bash
git add .
git commit -m "Agrega vistas Handlebars, Socket.io y actualiza README"
git push origin main

        
        
         **** Proyecto creado por Rodrigo Navas Giacometto para Coderhouse *********