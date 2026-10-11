import { useState } from "react";
import type { ReactNode } from "react";
import { PlayerContext } from "./playerContext";


const STORAGE_KEY = "spot-the-fake:player";


function readStoredName(): string {
  try {
    return sessionStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}


export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerName, setName] = useState<string>(readStoredName);

  const setPlayerName = (name: string) => {
    const trimmed = name.trim().slice(0, 30); 
    setName(trimmed);
    try {
      sessionStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // ignore: the name still works until the page is closed
    }
  };

  const clearPlayer = () => {
    setName("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <PlayerContext.Provider value={{ playerName, setPlayerName, clearPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}