import { create } from "zustand";

interface NavState {
  navRect: DOMRect | null;
  setNavRect: (react: DOMRect) => void;
}

export const useNavStore = create<NavState>((set) => ({
  navRect: null,
  setNavRect: (rect) => set({ navRect: rect }),
}));
