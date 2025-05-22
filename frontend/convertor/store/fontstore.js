import { create } from 'zustand';

export const usefontstore = create((set) => ({
    font: "Roboto",
    setfont: (newfont) =>
        set({ font: newfont }),
}));
