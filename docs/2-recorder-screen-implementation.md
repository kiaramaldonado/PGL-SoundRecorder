[<- Volver al README.md](../README.md)
# 2. Implementación de la Pantalla de Grabación

En esta fase de la práctica se ha llevado a cabo el desarrollo de la interfaz de usuario (UI) en React Native, traduciendo el diseño propuesto a componentes funcionales. Se ha optado por una arquitectura modular, separando los elementos visuales en componentes reutilizables y manteniendo un código limpio y fuertemente tipado con TypeScript.

## Estructura de Componentes

La interfaz se ha dividido en diferentes componentes según su responsabilidad:

### Componentes UI (Elementos atómicos)

- **`TrackCard`**: Tarjeta individual que representa un audio grabado. Muestra el título, la fecha relativa de creación y la duración. Incorpora un gesto de arrastre (swipe) para revelar un botón de eliminación oculto en la capa inferior.

- **`TitleInput`**: Campo de texto minimalista (`TextInput`) que permite al usuario establecer un título personalizado para el nuevo audio antes de grabarlo.

- **`RecordButton`**: Botón principal de la aplicación. Muestra un icono de micrófono y reacciona al estado de grabación (`isRecording`), activando animaciones complejas.

- **`ConfirmModal`**: Cuadro de diálogo modal reutilizable con un diseño semitransparente. Se utiliza para pedir confirmación al usuario antes de ejecutar acciones destructivas (como eliminar todos los audios), previniendo borrados accidentales.

### Componentes de Layout (Estructura)

- **`TrackList`**: Contenedor principal para el historial de grabaciones. Incluye una cabecera con el título de la sección y un botón de "papelera" global. Utiliza un `ScrollView` para renderizar de forma dinámica la lista de componentes `TrackCard` a partir del array de datos.

- **`NewAudioForm`**: Componente agrupador que organiza el `TitleInput` y el `RecordButton` manteniendo un espaciado coherente en la parte superior de la pantalla.

## Tecnologías y Librerías Destacadas

Para lograr una experiencia de usuario fluida y un diseño interactivo, se han integrado las siguientes tecnologías clave:

- **`react-native-reanimated`**: Fundamental para el rendimiento de las animaciones, ejecutándolas en el hilo de la interfaz de usuario (UI thread). Se ha utilizado para:
  - La animación de "latido" y las ondas expansivas del `RecordButton` (usando `withRepeat`, `withSequence` y `withDelay`).
  - La física de rebote suave (`withSpring`) al deslizar las tarjetas de audio.
- **`react-native-gesture-handler`**: Utilizado en el componente `TrackCard` (`Gesture.Pan`) para detectar de forma precisa los movimientos táctiles horizontales del usuario y permitir el borrado individual.
- **`@expo/vector-icons`**: Proveedor de la iconografía vectorial de la aplicación (iconos de _FontAwesome6_ como `microphone`, `play`, `trash` y `triangle-exclamation`).

---

[<- Volver al README.md](../README.md)
