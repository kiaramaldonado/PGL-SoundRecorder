# PGL-SoundRecorder

En este repositorio se completará la práctica de implementar una aplicación que permita grabar audios y su reproducción.

## Resultado Final

La aplicación permite a los usuarios grabar audios con facilidad, reproducirlos y gestionar su biblioteca de grabaciones.

| Grabación                                      | Reproducción                                | Eliminación                                       |
|------------------------------------------------|---------------------------------------------|---------------------------------------------------|
| ![Grabando](./assets/gifs/final-product-1.GIF) | ![Reproducción](./assets/gifs/final-product-2.GIF) | ![Eliminación](./assets/gifs/final-product-3.GIF) |



## Documentación de la Práctica

A continuación se detalla el desarrollo de cada uno de los puntos requeridos. Puedes hacer clic en cada apartado para acceder a su documentación específica:

1. **[Diseño de la pantalla de grabación](./docs/1-recorder-screen-design.md)** Diseño de una nueva pantalla que dispone de: botón para grabar/parar, indicador de grabación en curso, listado de audios, elemento para reproducir individualmente y botón para eliminar audios (todos o individualmente).

2. **[Implementación de la pantalla](./docs/2-recorder-screen-implementation.md)** Creación de la aplicación mostrando por pantalla el diseño especificado en el punto anterior.

3. **[Gestión de permisos](./docs/3-permissions.md)** Lógica implementada para solicitar los permisos de grabación al usuario siempre que se vaya a grabar un nuevo audio. Si no se ha concedido el permiso, la app lo solicita antes de empezar.

4. **[Persistencia de datos (Sesiones guardadas)](./docs/4-saved-session.md)** Sistema de guardado de los audios en la memoria del dispositivo para poder recuperar las grabaciones en sesiones posteriores de uso de la aplicación.

5. **[Componente de carga (Loading Spinner)](./docs/5-loading-spinner.md)** Creación de un componente propio (spinner/animación) para mostrar durante los procesos de carga importantes: al cargar las grabaciones iniciales y durante el proceso de grabación.

6. **[Animación personalizada](./docs/6-animation.md)** Implementación de una animación propia añadida a un elemento interactivo de la pantalla de grabación.


## Estructura del Proyecto

```
PGL-SoundRecorder/
├── assets/                          # Recursos multimedia
│   ├── gifs/                        # Demostraciones visuales
│   └── screenshots/                 # Capturas de pantalla
├── components/                      # Componentes React Native
│   ├── layout/
│   │   ├── NewAudioForm.tsx        # Formulario para grabar audio
│   │   └── TrackList.tsx           # Listado de grabaciones
│   └── ui/
│       ├── BouncingNoteLoader.tsx  # Animación personalizada de carga
│       ├── RecordButton.tsx        # Botón de grabación
│       ├── TrackCard.tsx           # Tarjeta individual de audio
│       ├── TitleInput.tsx          # Input para título del audio
│       └── ConfirmModal.tsx        # Modal de confirmación
├── docs/                            # Documentación detallada
│   ├── 1-recorder-screen-design.md
│   ├── 2-recorder-screen-implementation.md
│   ├── 3-permissions.md
│   ├── 4-saved-session.md
│   ├── 5-loading-spinner.md
│   └── 6-animation.md
├── services/                        # Servicios (lógica de negocio)
│   └── storage.service.ts          # Gestión de AsyncStorage
├── theme/                           # Temas y estilos globales
│   └── palette.ts                  # Paleta de colores
├── types/                           # Tipos TypeScript
│   └── track.types.d.ts            # Interfaz Track
├── utils/                           # Utilidades
│   └── formatter.ts                # Funciones auxiliares
├── App.tsx                          # Componente raíz
├── app.json                         # Configuración de Expo
├── package.json                     # Dependencias del proyecto
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Este archivo
```

### Dependencias Principales

| Paquete | Versión | Descripción |
|---------|---------|-------------|
| **expo-audio** | ~1.1.1 | Captura y reproducción de audio |
| **react-native-reanimated** | ~4.1.1 | Animaciones de alto rendimiento |
| **react-native-gesture-handler** | ~2.28.0 | Gestos táctiles avanzados |
| **@react-native-async-storage/async-storage** | 2.2.0 | Almacenamiento persistente |
| **react-native-svg** | 15.12.1 | Gráficos vectoriales (SVG) |
| **@expo/vector-icons** | ^15.1.1 | Iconografía (FontAwesome6) |

---

## Cómo Arrancar el Proyecto

### Prerequisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Expo CLI** (instalado globalmente)

```bash
npm install -g expo-cli
```

### Instalación

1. **Clonar el repositorio:**
```bash
git clone https://github.com/tu-usuario/PGL-SoundRecorder.git
cd PGL-SoundRecorder
```

2. **Instalar dependencias:**
```bash
npm install
```


### Ejecutar la Aplicación

#### En dispositivo físico (Recomendado)

1. Descargar la app **Expo Go** desde tu tienda de aplicaciones (App Store o Google Play)

2. Ejecutar el servidor de desarrollo:
```bash
npm start
```

3. Escanear el código QR con tu dispositivo usando la cámara o la app Expo Go

#### En emulador

**Para iOS (solo en macOS):**
```bash
npm run ios
```

**Para Android:**
```bash
npm run android
```

**Para Web:**
```bash
npm run web
```

---

Hecho por Kiara Maldonado.