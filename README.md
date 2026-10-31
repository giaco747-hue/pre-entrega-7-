# Proyecto Backend - API RESTful (Pre-entrega 6)

Este repositorio contiene la arquitectura backend para una plataforma de servicios, desarrollada con **Node.js, Express y MongoDB**. En esta sexta entrega, la capa de persistencia ha sido migrada completamente de almacenamiento local basado en archivos (`fs`) a una base de datos NoSQL.

## 🚀 Novedades en esta versión (Migración a MongoDB)

*   **Eliminación del módulo `fs`:** Se abandonó el uso de los archivos `services.json` y `bookings.json` como sistema de almacenamiento.
*   **Implementación de Mongoose:** Se crearon los esquemas y modelos (`service.model.js` y `booking.model.js`) para gestionar las colecciones directamente en la base de datos.
*   **Refactorización de la capa DAO:** Los archivos `services.dao.js` y `bookings.dao.js` fueron reescritos para ejecutar consultas a MongoDB mediante métodos nativos de Mongoose (`find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete`).
*   **Gestión de `ObjectId`:** Se eliminaron las conversiones numéricas (`parseInt()`) en la capa de controladores para permitir la validación y lectura correcta de los IDs alfanuméricos generados automáticamente por MongoDB.
*   **Conexión Local (MongoDB Compass):** La arquitectura está configurada de manera segura para conectarse a una instancia local de MongoDB, garantizando un entorno de desarrollo aislado y evitando bloqueos de red o problemas de DNS.

## 🛠️ Tecnologías Utilizadas

*   **Node.js** y **Express** (Entorno y Framework del servidor)
*   **MongoDB** y **Mongoose** (Motor de base de datos y Object Data Modeling)
*   **JavaScript (ES6+)** (Uso de ES Modules `import/export`)

## 📁 Arquitectura del Proyecto

El código sigue un patrón de diseño estructurado en capas para asegurar la escalabilidad y separar responsabilidades:

*   `/src/models`: Definición de los esquemas y reglas de datos de Mongoose.
*   `/src/dao`: Data Access Object. Administra exclusivamente las consultas de lectura y escritura a MongoDB.
*   `/src/services`: Contiene la lógica de negocio y validaciones.
*   `/src/controllers`: Encargada de procesar las peticiones (req/res) y orquestar las respuestas del servidor.
*   `/src/routes`: Definición de los endpoints de la API.

## ⚙️ Requisitos Previos

*   [Node.js](https://nodejs.org/) instalado.
*   [MongoDB Compass](https://www.mongodb.com/products/compass) o un servicio de MongoDB Community Server ejecutándose localmente en el puerto `27017`.

## 🚀 Instalación y Ejecución

1. Clonar este repositorio en tu máquina local:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DE_LA_CARPETA>
Instalar todas las dependencias de Node:

Bash
npm install
Configurar las variables de entorno. Crea un archivo .env en la raíz del proyecto y agrega lo siguiente:

Fragmento de código
PORT=8080
MONGO_URI=mongodb://localhost:27017/coderhouse
Ejecutar el servidor en modo desarrollo:

Bash
npm run dev
📡 Endpoints Principales
Servicios (/api/services)
GET /api/services - Obtiene la lista de todos los servicios disponibles.

GET /api/services/:sid - Obtiene los detalles de un servicio específico por su ID.

POST /api/services - Crea un nuevo servicio en la base de datos.

PUT /api/services/:sid - Actualiza los datos de un servicio existente.

DELETE /api/services/:sid - Elimina un servicio del sistema.

Reservas (/api/bookings)
GET /api/bookings/:bid - Obtiene una reserva por su ID (incluye la población de los datos del servicio a través de Mongoose .populate()).

POST /api/bookings - Crea una nueva reserva.

POST /api/bookings/:bid/services/:sid - Agrega un servicio específico a una reserva existente.

 ****** Desarrollado por Rodrigo para el curso de Backend de Coderhouse. *********