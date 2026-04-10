# PGL-SoundRecorder

En este repositorio se completará la práctica de implementar una aplicación que permita grabar audios y su reproducción.

## Documentación de la Práctica

A continuación se detalla el desarrollo de cada uno de los puntos requeridos. Puedes hacer clic en cada apartado para acceder a su documentación específica:

1. **[Diseño de la pantalla de grabación](./docs/1-recorder-screen-design.md)** Diseño de una nueva pantalla que dispone de: botón para grabar/parar, indicador de grabación en curso, listado de audios, elemento para reproducir individualmente y botón para eliminar audios (todos o individualmente).

2. **[Implementación de la pantalla](./docs/2-recorder-screen-implementation.md)** Creación de la aplicación mostrando por pantalla el diseño especificado en el punto anterior.

3. **[Gestión de permisos](./docs/3-permissions.md)** Lógica implementada para solicitar los permisos de grabación al usuario siempre que se vaya a grabar un nuevo audio. Si no se ha concedido el permiso, la app lo solicita antes de empezar.

4. **[Persistencia de datos (Sesiones guardadas)](./docs/4-saved-session.md)** Sistema de guardado de los audios en la memoria del dispositivo para poder recuperar las grabaciones en sesiones posteriores de uso de la aplicación.

5. **[Componente de carga (Loading Spinner)](./docs/5-loading-spinner.md)** Creación de un componente propio (spinner/animación) para mostrar durante los procesos de carga importantes: al cargar las grabaciones iniciales y durante el proceso de grabación.

6. **[Animación personalizada](./docs/6-animation.md)** Implementación de una animación propia añadida a un elemento interactivo de la pantalla de grabación.
