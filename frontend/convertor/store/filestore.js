import { create } from 'zustand';

export const usefilestore = create((set) => ({
  file: [],
  setfile: (updater) =>
  set((state) => ({
    file: typeof updater === "function" ? updater(state.file) : updater,
  })),

}));
