# Proyecto Final
Proyecto integrador 1| Proyecto Final

## Convenciones de nomenclatura y formato de codigo

### Backend 

- Variable: camelCase -> horaDia

### Frontend

- Clases CSS: kebab-case -> .evento-encabezado
- Archivos JS: kebab-case -> editar-evento.js
- Bootstrap 5 como framework

## Estrategia de branches y commits

### Branches

Se utiliza Git Flow simplificado; 

- main -> version estable
- develop -> integracion de funcionalidades 

### Commits 

Se utilizara la siguiente convencion: 

tipo: descipcion corta

#### Tipos de commit

- feat → nueva funcionalidad
- fix → corrección de bug
- docs → cambios en documentación
- style → cambios de formato
- refactor → mejora interna sin cambiar comportamiento
- test → pruebas
- chore → tareas menores

Ejemplo:

``docs: Actualizacion de requerimientos``


# Plataforma de eventos

Aplicación web fullstack desarrollada con Node.js, Express y MongoDB para la gestión y consulta de eventos, incluyendo inscripción de usuarios y administración de eventos.

## Descripción breve del proyecto

El sistema permite:

* Crear eventos desde editor (estado pendiente)
* Aprobar o rechazar eventos, y visualizar los aprobados (admin)
* Visualizar eventos aprobados (admin y editor)
* Inscribirse a eventos (consultores)
* Consultar personas inscritas (editor)
* Gestionar consultas de usuarios (editor)

Se implementa una arquitectura frontend-backend conectada mediante API REST.


## Tecnologías utilizadas

### Backend
Node.js
Express
MongoDB Atlas
Mongoose
dotenv
cors
body-parser

### Frontend
HTML5
CSS3
JavaScript
Bootstrap 5


## Dependencias

Se debe instalar todas las dependencias ejecutando esto en terminal:

npm install

## Dependencias principales utilizadas:

- express
- mongoose
- cors
- dotenv
- body-parser

## Instalación y configuración

1. Clonar el repositorio
2. Backend: 
           - En terminal: "npm install"
           - Archivo .env: El proyecto ya incluye un archivo .env funcional, pero en caso de ser necesario se puede configurar manualmente: 
           
3. Frontend:
- Abrir con Live Server 


## Comandos para ejecutar el proyecto

1. Backend:
   - Ejecutar desde la carpeta backend: "node index.js"
   - El servidor correra en: http://localhost:3000

2. Frontend:
   - Abrir cualquiera de los siguientes archivos en el navegador con Live server:
   * frontend/index.html
   * frontend/editor-dashboard.html
   * frontend/admin-dashboard.html

3. Flujo del sistema (uso sugerido)
   - Editor crea un evento
   - Editor revisa eventos en estado pendiente
   - Admin revisa el evento
   - Admin aprueba o rechaza el evento
   - Editor revisa eventos rechazados o aprobados
   - Usuario navega eventos disponibles
   - Usuario consulta detalles del evento
   - Usuario realiza consultas sobre eventos
   - Usuario se inscribe a un evento
   - Editor revisa consultas en el dashboard
   - Editor revisa personas inscritas en eventos

## Autor

Proyecto academico -Universidad CENFOTEC- Alumno: Nelson Fernandez Gonzalez.

                      