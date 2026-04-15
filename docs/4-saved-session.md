[<- Volver al README.md](../README.md)

# 4. Documentación de Resolución: Persistencia y Recuperación de Audios

En este documento se detalla la estrategia y las herramientas utilizadas para resolver persistencia de grabaciones de audio entre sesiones de la aplicación, cumpliendo con los requisitos de almacenamiento en memoria, recuperación al inicio y creación de servicios modulares.

## Persistencia de Archivos Físicos (Justificación de `expo-file-system/legacy`)

Por defecto, las herramientas de grabación de audio suelen almacenar los ficheros resultantes en el directorio de caché del dispositivo. Como se advierte en los consejos de la tarea, la caché es volátil y el sistema operativo puede borrarla para liberar espacio, lo que resultaría en la pérdida de los audios.

Para evitar esto, se ha implementado una lógica de movimiento de archivos en el componente `NewAudioForm`:

```typescript
const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

await FileSystem.moveAsync({
  from: uri,
  to: permanentUri,
});
```

**Justificación del uso de `expo-file-system/legacy`:**
Se ha optado por importar `* as FileSystem from "expo-file-system/legacy"` para garantizar el acceso a la API clásica, robusta y completamente estable de Expo para el manejo del sistema de archivos. Esta versión asegura un comportamiento predecible y una compatibilidad total con métodos asíncronos críticos como `moveAsync` y constantes como `documentDirectory`. Gracias a esto, el archivo temporal capturado por la grabadora se traslada de forma segura al almacenamiento persistente de la aplicación, garantizando que no sea eliminado por los procesos de limpieza del sistema operativo.

## Gestión de Datos Estructurados (Servicio AsyncStorage)

Tal y como solicitaba el enunciado, no se guarda el audio pesado en el `AsyncStorage`, sino únicamente sus metadatos (título, fecha, duración y, lo más importante, la **URI de localización** del archivo persistente).

Para ello, se ha creado el archivo `services/storage.service.ts`, el cual aporta un gran valor al proyecto al estar dividido en dos capas:

* **Métodos Completamente Genéricos:** Se aprovecha la potencia de TypeScript (`<T>`) para crear funciones base (`storeData`, `getData`, `removeData`) que pueden guardar o recuperar cualquier tipo de objeto en formato JSON. Esto hace que el servicio sea escalable para futuras funcionalidades de la app.
* **Métodos Específicos:** Funciones como `getTracks`, `addTrack` o `clearAllTracks` que consumen los métodos genéricos pero están tipadas y preparadas específicamente para manejar la interfaz `Track`.

## Recuperación de Audios al Iniciar la Aplicación

Para asegurar que los audios de sesiones anteriores estén disponibles nada más abrir la aplicación, se ha utilizado el hook `useEffect` en el componente raíz (`App.tsx`).

```typescript
// App.tsx
const loadTracks = async () => {
  const storedTracks = await getTracks();
  setTracks(storedTracks);
};

useEffect(() => {
  loadTracks();
}, []);
```

Esta implementación cumple exactamente con el requisito de la tarea: al montarse el componente principal por primera vez, se invoca al servicio de almacenamiento para leer las referencias URI guardadas en la memoria del dispositivo e hidratar el estado `tracks`, lo que a su vez renderiza la lista de audios (`TrackList`).

## Flujo Completo de la Solución

1.  **Grabación:** El usuario graba un audio usando `RecordButton`. Se genera una URI temporal.
2.  **Persistencia Física:** `NewAudioForm` intercepta esta URI temporal y usa `expo-file-system/legacy` para mover el archivo al `documentDirectory`.
3.  **Persistencia de Referencia:** Se crea un objeto `Track` con la nueva URI permanente y se guarda en el `AsyncStorage` mediante el servicio genérico.
4.  **Recuperación:** Al reiniciar la app, el `useEffect` en `App` recupera los objetos `Track` del `AsyncStorage`.
5.  **Reproducción:** El componente `TrackCard` recibe la URI permanente y utiliza `expo-audio` para reproducir el archivo directamente desde el almacenamiento del dispositivo.

## Referencias Oficiales

- **Expo File System:** https://docs.expo.dev/versions/latest/sdk/filesystem/
- **Expo File System - Legacy API:** https://docs.expo.dev/versions/latest/sdk/filesystem/#using-legacy-filesystem-api
- **AsyncStorage (React Native Community):** https://docs.expo.dev/versions/latest/sdk/async-storage/

[<- Volver al README.md](../README.md)
