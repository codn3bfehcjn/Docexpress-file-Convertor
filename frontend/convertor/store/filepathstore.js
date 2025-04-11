import { create } from 'zustand';

export const usefilepathstore = create((set) => ({
  filepaths: [],
  setfilepath: (filepaths) => set({filepaths}),
}));
