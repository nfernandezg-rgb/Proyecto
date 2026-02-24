# Requerimientos no Funcionales

### RNF-01: Tiempo de procesamiento de registro de eventos

El sistema deberá responder a cualquier petición HTTP en menos de 5 segundos bajo una carga de hasta 50 usuarios concurrentes.

### RNF-02: Disponibilidad para el cliente

El tiempo de carga inicial de la página principal no deberá superar los 5 segundos en una conexión estándar de 10 Mbps.

### RNF-03: Tiempo de procesamiento de registro de eventos

Una vez enviado el formulario de registro de un nuevo evento, el evento deberá almacenarse en la base de datos y mostrarse en la lista general en un plazo máximo de 2 segundos.

### RNF-04: Flujo principal

Un usuario deberá poder registrar un nuevo evento en un tiempo máximo de 3 minutos, desde que accede al formulario hasta que confirma el envío.

### Prevención de duplicados

No se permitirá registrar eventos con el mismo nombre, fecha y hora.
El sistema deberá responder con HTTP 409.

### RNF-05: Eliminación inmediata

El evento eliminado deberá desaparecer de la interfaz en maximo 5 segundos.

