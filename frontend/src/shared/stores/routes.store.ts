import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoutesStore {
  sessionId: number | null;
  setSessionId: (id: number) => void;
  clearSession: () => void;
}

export const useRoutesStore = create<RoutesStore>()(
  persist(
    (set) => ({
      sessionId: null,
      setSessionId: (id) => set({ sessionId: id }),
      clearSession: () => set({ sessionId: null }),
    }),
    {
      name: "route-session",
      partialize: (state) => ({ sessionId: state.sessionId }),
    },
  ),
);
