# Proyecto Backend - Pre-entrega 7

API REST construida con arquitectura en capas (Router, Controller, Service, DAO), motor de plantillas Handlebars y WebSockets para actualización en tiempo real.

## Repositorio
URL: https://github.com/giaco747-hue/pre-entrega-7-

## Instalación y Arranque
1. Clonar el repositorio.
2. Instalar las dependencias del proyecto ejecutando: `npm install`
3. Crear un archivo `.env` en la raíz tomando como referencia `.env.example`, y configurar las variables de entorno (MongoDB local).
4. Para levantar el servidor en modo desarrollo ejecutar: `npm run dev`
5. Para correr el test de validación de entorno ejecutar: `npm run test`

## Pruebas de Vistas y Eventos (Socket.io)
* **Vista de Servicios:** Ingresar a `http://localhost:8080/views/services`. Al ejecutar peticiones PUT o DELETE hacia la API, la lista de servicios se actualizará automáticamente en el navegador sin recargar la página.
* **Vista de Reservas:** Ingresar a `http://localhost:8080/views/availability`. Al crear, actualizar o cancelar una reserva a través de la API, la vista de disponibilidad reaccionará en tiempo real.