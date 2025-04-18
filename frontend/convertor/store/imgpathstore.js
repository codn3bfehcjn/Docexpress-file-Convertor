// /store/imgpathstore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useimagepathstore = create(
  persist(
    (set) => ({
      paths: [],
      setimagepath: (paths) =>
        set((state) => ({
          paths: typeof paths === "function" ? paths(state.paths) : paths,
        })),
      clearimagepath: () => set({ paths: [] }),
    }),
    {
      name: "image-paths-storage", // LocalStorage key
    }
  )
);
