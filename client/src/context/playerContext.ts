import { createContext } from "react";


export interface PlayerContextValue {
playerName: string;
  setPlayerName: (name: string) => void;
  clearPlayer: () => void;
}


export const PlayerContext = createContext<PlayerContextValue | null>(null);