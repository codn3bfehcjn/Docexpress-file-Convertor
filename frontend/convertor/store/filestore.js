import { create } from 'zustand';

export const usefilestore = create((set) => ({
  file: [],
  setfile: (files) => set({ file: files }),
}));
