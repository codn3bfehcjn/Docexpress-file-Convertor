import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usefilepathstore = create(
  persist(
    (set) => ({
      filepaths: [],
      setfilepath: (paths) =>
        set((state) => ({
          filepaths: typeof paths === "function" ? paths(state.filepaths) : paths,
        })),
      clearfilepath: () => set({ filepaths: [] }),
    }),
    {
      name: "pdf-filepaths",
    }
  )
);
