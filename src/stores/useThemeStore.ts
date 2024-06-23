import { create } from "zustand";

type ThemeStore = {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
    theme: "light",

    setTheme: (theme) => set({ theme }),

    toggleTheme: () => {
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" }));
    }

}));
