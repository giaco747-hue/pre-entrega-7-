# Sistema Backend de Turnos y Reservas - Pre-entrega 5

Este repositorio contiene la quinta pre-entrega del proyecto, enfocada en la implementación de una **Arquitectura en Capas estricta, incorporando DAO (Data Access Object) y Repository**. 

El objetivo principal de esta refactorización es desacoplar la lógica de negocio de la persistencia de datos, preparando el sistema para su inminente migración desde archivos locales JSON hacia MongoDB Atlas en la siguiente etapa del curso.

## 🏗️ Arquitectura y Flujo de Datos

El proyecto ha sido rediseñado estableciendo un flujo de datos unidireccional: 
`Router -> Controller -> Service -> Repository -> DAO -> File System (JSON)`

Cada capa tiene una única responsabilidad y se comunica estrictamente con la capa adyacente inferior:

1. **Rutas (`/routes`)**: Definen los endpoints de la API REST y delegan la petición al controlador correspondiente. No contienen lógica.
2. **Controladores (`/controllers`)**: Única capa autorizada para interactuar con los objetos HTTP (`req` y `res`). Extraen los parámetros, el cuerpo de la petición, invocan a la capa de servicios y formatean las respuestas.
3. **Servicios (`/services`)**: El corazón de la aplicación. Contienen todas las **reglas de negocio**. Esta capa es completamente agnóstica al protocolo HTTP y a la tecnología de base de datos.
4. **Repositorios (`/repositories`)**: Actúan como una fachada de persistencia. Ofrecen métodos genéricos de acceso a datos aislando a los servicios de la implementación técnica de la base de datos (actualmente el DAO de archivos).
5. **DAO (`/dao`)**: Única capa encargada de interactuar físicamente con los datos. Utiliza el módulo nativo `fs/promises` de Node.js para leer y escribir directamente en los archivos `.json`. No posee ninguna regla de negocio.

## 📂 Estructura del Proyecto

```text
src/
  ├── config/
  │   └── env.config.js
  ├── controllers/
  │   ├── bookings.controller.js
  │   └── services.controller.js
  ├── dao/
  │   ├── bookings.dao.js
  │   └── services.dao.js
  ├── data/
  │   ├── bookings.json
  │   └── services.json
  ├── repositories/
  │   ├── bookings.repository.js
  │   └── services.repository.js
  ├── routes/
  │   ├── bookings.router.js
  │   └── services.router.js
  ├── services/
  │   ├── bookings.service.js
  │   └── services.service.js
  ├── app.js
  └── server.js

  🧠 Reglas de Negocio Destacadas
Gestión de Reservas (bookings.service.js): Al ejecutar el endpoint para agregar un servicio a una reserva existente, el sistema verifica si el servicio ya fue añadido previamente. De ser así, en lugar de duplicar el registro, incrementa automáticamente la propiedad quantity. Esta lógica fue aislada exitosamente en la capa de Servicios, manteniendo el DAO limpio.

🚀 Endpoints Disponibles
La API mantiene su contrato de interfaz intacto. Todos los endpoints responden en formato JSON.

Módulo de Servicios (Services)
GET /api/services - Obtiene todos los servicios disponibles (soporta filtros por query).

GET /api/services/:sid - Obtiene el detalle de un servicio específico.

POST /api/services - Crea un nuevo servicio.

PUT /api/services/:sid - Modifica un servicio existente.

DELETE /api/services/:sid - Elimina un servicio del sistema.

Módulo de Reservas (Bookings)
POST /api/bookings - Registra una nueva reserva (cliente y fecha).

GET /api/bookings/:bid - Obtiene el detalle de una reserva específica.

POST /api/bookings/:bid/services/:sid - Añade un servicio a una reserva o incrementa su cantidad.

🛠️ Instalación y Ejecución
Clonar el repositorio.

Instalar las dependencias del proyecto:

