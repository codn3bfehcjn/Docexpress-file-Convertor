import { create } from "zustand";

export const loader = create((set) => ({
  load: false,
  setloader: (state) => set({ load: state }),
}));
