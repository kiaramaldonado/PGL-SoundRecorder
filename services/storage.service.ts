import AsyncStorage from "@react-native-async-storage/async-storage";
import { Track } from "../types/track.types";

const TRACKS_KEY = "@my_app_tracks";

/** * MÉTODOS GENÉRICOS
 */
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(`Error guardando datos para la clave ${key}:`, e);
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(`Error leyendo datos para la clave ${key}:`, e);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error eliminando datos para la clave ${key}:`, e);
  }
};

/**
 * MÉTODOS ESPECÍFICOS PARA AUDIOS (TRACKS)
 */
export const getTracks = async (): Promise<Track[]> => {
  const tracks = await getData<Track[]>(TRACKS_KEY);
  return tracks || [];
};

export const saveTracks = async (tracks: Track[]): Promise<void> => {
  await storeData(TRACKS_KEY, tracks);
};

export const addTrack = async (newTrack: Track): Promise<void> => {
  const currentTracks = await getTracks();
  await saveTracks([newTrack, ...currentTracks]);
};

export const deleteTrack = async (id: string): Promise<void> => {
  const currentTracks = await getTracks();
  const filteredTracks = currentTracks.filter((track) => track.id !== id);
  await saveTracks(filteredTracks);
};

export const clearAllTracks = async (): Promise<void> => {
  await removeData(TRACKS_KEY);
};
