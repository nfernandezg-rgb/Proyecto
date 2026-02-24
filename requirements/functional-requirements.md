# Requerimientos Funcionales

### RF-01: Registro de eventos

El sistema deberá permitir a un usuario autenticado crear un evento ingresando:

* Nombre
* Descripción
* Fecha
* Hora
* Ubicación
* Tipo de evento
* Modalidad (presencial/virtual)

### RF-02: Listado de eventos

El sistema deberá mostrar todos los eventos disponibles ordenados por fecha ascendente. 
Criterio verificable:
Al consultar la base de datos, la lista debe coincidir con los registros almacenados.

### RF-03: Edición de eventos

El sistema deberá permitir modificar los datos de un evento existente.
Criterio verificable:
Después de editar, los cambios deben persistir en MongoDB Atlas (Base de datos elegida para el proyecto)

### RF-04: Eliminación de eventos

El sistema deberá permitir eliminar un evento existente.
Criterio verificable:
El registro eliminado no debe existir en la base de datos después de la operación DELETE (eliminacion).

### RF-05: Filtro por tipo

El sistema deberá permitir filtrar eventos por tipo (ej. taller, conferencia, actividad cultural, ETC).

### RF-06: Visualización de detalles

El sistema deberá permitir visualizar el detalle completo de un evento al seleccionarlo.

### RF-07: Validación de fechas

El sistema no deberá permitir registrar eventos con fecha anterior a la actual.

### RF-08: Confirmación de asistencia

El sistema deberá permitir que un usuario confirme asistencia a un evento.