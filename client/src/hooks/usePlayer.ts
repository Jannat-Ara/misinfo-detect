import { useContext } from "react";
import { PlayerContext } from "../context/playerContext";
import type { PlayerContextValue } from "../context/playerContext"


export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}